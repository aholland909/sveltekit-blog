---
title: 'How to upload files to Zendesk tickets'
date: '2025-12-01'
author: 'Andy Holland'
description: A guide to uploading files to zendesk ticket
tags: ['zendesk', 'file-upload', 'tutorial']
featured: true
image: 'images/zendesk-logo.png'
---

# How to upload files to Zendesk tickets

At work we use a Zendesk integration allowing us to create tickets. I was asked to figure out how to upload files and attach them to tickets. The process involves two main steps: first, uploading the file to Zendesk, and then attaching the uploaded file to the relevant ticket.

## Upload a file to Zendesk.

The Zendesk API allows you to upload any file type you want as long as they have the correct mineType on the content type. I had a read through the [docs](https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-attachments/#upload-files) and found an upload endpoint with some useful parameters.

In these examples we will look into how we can upload base64 images and images with a download link from GCP buckets. Both methods use Zendesk's /api/v2/uploads.json endpoint to upload files, which returns an upload token that can be attached to tickets.

This first example is how a base64 image can be uploaded. A file buffer is used here to convert the base64 to a binary buffer so that it can be uploaded.

### How it works:

1. Clean base64 data by removing data URI prefix (data:image/png;base64,)

2. Convert base64 string to binary buffer

3. Create FormData with the buffer

4. POST to Zendesk uploads API

```javascript
async function uploadFileFromBase64(base64Data, filename, mimeType = 'application/pdf') {
	try {
		// Remove data: prefix if present
		const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');
		// Convert base64 to buffer
		const fileBuffer = Buffer.from(cleanBase64, 'base64');
		// Create form data
		const form = new FormData();
		form.append('file', fileBuffer, {
			filename: filename,
			contentType: mimeType
		});
		// Upload the file
		const uploadUrl = `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/uploads.json`;
		const response = await axios.post(uploadUrl, form, {
			headers: {
				...form.getHeaders(),
				Authorization: `Basic ${auth}`
			},
			params: {
				filename: filename
			}
		});
		console.log('File uploaded successfully!');
		console.log('Upload token:', response.data.upload.token);
		return response.data.upload;
	} catch (error) {
		console.error('Upload failed:', error.response?.data || error.message);
		throw error;
	}
}
```

The second example allows us upload a file when we are given a GCP bucket url. An additional request is needed to be done so that we can get the binary data for a file.

```javascript
async function uploadFileFromGCP(gcpUrl, filename = null, mimeType = null) {
	try {
		console.log(`Fetching file from GCP: ${gcpUrl}`);

		// Fetch the file from GCP bucket
		const response = await axios.get(gcpUrl, {
			responseType: 'arraybuffer', // Important: get as binary data
			timeout: 60000 // 60 second timeout for large files
		});

		// Extract filename from URL if not provided
		if (!filename) {
			const urlParts = gcpUrl.split('/');
			filename = urlParts[urlParts.length - 1] || 'downloaded-file';
			// Remove query parameters if present
			filename = filename.split('?')[0];
		}

		// Try to detect MIME type from response headers or filename
		if (!mimeType) {
			mimeType = response.headers['content-type'] || getMimeTypeFromFilename(filename);
		}

		console.log(`File fetched successfully. Size: ${response.data.length} bytes`);

		// Create form data with the fetched file buffer
		const form = new FormData();
		form.append('file', response.data, {
			filename: filename,
			contentType: mimeType
		});

		// Upload the file to Zendesk
		const uploadUrl = `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/uploads.json`;

		const uploadResponse = await axios.post(uploadUrl, form, {
			headers: {
				...form.getHeaders(),
				Authorization: `Basic ${auth}`
			},
			params: {
				filename: filename
			}
		});

		console.log('File uploaded to Zendesk successfully!');
		console.log('Upload token:', uploadResponse.data.upload.token);

		return uploadResponse.data.upload;
	} catch (error) {
		console.error(error);
	}
}
```

The return for the file upload will look something like this. The most important part is the token. This token is unique and will allow this upload to be attached to a ticket.

```json
{
    "upload": {
        "token": "UPLOAD_TOKEN",
        "expires_at": "2025-08-14T15:00:53Z",
        "attachments": [
            {
                "url": "https://ZENDESK_SUBDOMAIN.zendesk.com/api/v2/attachments/19283109283.json",
                "id": 19283109283,
                "file_name": "example.pdf",
                "content_url": "https://ZENDESK_SUBDOMAIN.zendesk.com/attachments/token/lX....../?name=example.pdf",
                "mapped_content_url": "https://help.ZENDESK_SUBDOMAIN.co.uk/attachments/token/lX...../?name=example.pdf",
                "content_type": "multipart/form-data",
                "size": 1152,
                "width": null,
                "height": null,
                "inline": false,
                "deleted": false,
                "malware_access_override": false,
                "malware_scan_result": "not_scanned",
                "thumbnails": []
            }
        ],
    }

```

## Attach file to zendesk ticket

To attach a file to a zendesk ticket a comment should be added to the ticket. The Zendesk API for [creating and updating tickets](https://developer.zendesk.com/documentation/ticketing/managing-tickets/creating-and-updating-tickets/#attaching-files) has an example body for attaching uploads to a ticket, which can be added to a PUT request.

```curl
curl --location --request PUT 'https://ZENDESK_SUBDOMAIN.zendesk.com/api/v2/tickets/:ticketID' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Basic .........' \
--data '{"ticket": {"comment": { "body": "Example PDF upload", "author_id": AUTHOR_ID, "uploads":  ["UPLOAD_TOKEN"] }}}'
```

Note this is a PUT request to update a ticket, but when a ticket is created it could be added then.

Hopefully this guide was useful to anyone wanting to attach files to tickets using the Zendesk API.
