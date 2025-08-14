<script>
	let name = '';
	let email = '';
	let message = '';
	let result = '';
	let botcheck = false;

	async function handleSubmit(event) {
		event.preventDefault();

		const formData = {
			access_key: '8a5aabc3-6fc5-47d2-b5d3-9d93ce54e7a5',
			name,
			email,
			message,
			botcheck
		};

		result = 'Please wait...';

		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const data = await response.json();

			if (response.status === 200) {
				result = 'Form submitted successfully';
			} else {
				result = data.message;
			}
		} catch (error) {
			console.error(error);
			result = 'Something went wrong!';
		}

		// Reset form
		name = '';
		email = '';
		message = '';
		botcheck = false;

		setTimeout(() => {
			result = '';
		}, 3000);
	}
</script>

<form
	class="w-full rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
	method="POST"
	id="form"
	on:submit={handleSubmit}
>
	<div class="mb-6">
		<label class="mb-4 block text-sm font-semibold text-gray-700 dark:text-gray-300" for="name">
			Name
		</label>
		<input
			class="w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 leading-tight text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
			id="name"
			type="text"
			bind:value={name}
			required
			placeholder="Your name"
		/>
	</div>
	<div class="mb-6">
		<label class="mb-4 block text-sm font-semibold text-gray-700 dark:text-gray-300" for="email">
			Email
		</label>
		<input
			class="w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 leading-tight text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
			id="email"
			type="email"
			bind:value={email}
			required
			placeholder="Your email"
		/>
	</div>
	<div class="mb-6">
		<label class="mb-4 block text-sm font-semibold text-gray-700 dark:text-gray-300" for="message">
			Message
		</label>
		<textarea
			class="w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 leading-tight text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
			id="message"
			bind:value={message}
			required
			placeholder="Your message"
			rows="4"
		></textarea>
	</div>
	<input type="checkbox" name="botcheck" class="hidden" style="display: none;" />

	<div class="flex items-center justify-between">
		<button
			class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			type="submit"
		>
			Send
		</button>
	</div>
	<div class="mt-4 flex items-center justify-between">
		<div class="text-gray-700 dark:text-gray-300" id="result">{result}</div>
	</div>
</form>
