---
title: 'The SvelteKit Blog'
date: '2024-05-20'
author: 'Andy Holland'
description: How I built this SvelteKit Blog?
tags: ['sveltekit', 'blog']
featured: true
image: 'images/helloworld.png'
---

# SvelteKit Blog

This is a mini tutorial on how I built this blog. How we can go from markdown to pages!

## 1. The markdown pages

Firstly I need a way to add content. I opted for markdown as they are simple, lightweight and easy to work with. I wanted to make all the standard markdown elements work to make it easy and faster to write content.

Each markdown file I've added a metadata header to. This header can then have attributes associated with it and allow for additional things like html elements and better filtering.

```m
---
title: 'The SvelteKit Blog'
date: '2024-05-20'
author: 'Andy Holland'
description: How I built this SvelteKit Blog?
tags: ['sveltekit', 'blog']
featured: true
image: 'src/images/helloworld.png'
---
```

## 2. The Data fetching

Next we can fetch the markdown pages and build an API around it. In order to process the markdown files, I used [`mdsvex`](https://github.com/pngwn/MDsveX/tree/main/packages/mdsvex) to allow the markdown content to be shown inside svelte components and pages!

I created this useful function, to process all markdown files, it goes to the content folder and returns all blog posts so that we can use this inside API.

```typescript
export const fetchMarkdownPosts = async () => {
	const allPostFiles = import.meta.glob('/src/content/pages/**/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as { metadata: any };
			const postPath = path.slice(19, -3);

			return {
				meta: metadata,
				path: `${postPath}`
			};
		})
	);

	return allPosts;
};
```

## 3. APIs

SvelteKit allows you to create API routes by adding +server.ts files in the routes folder. Endpoint paths can be built up using folders. For example with the structure /routes/api/blog/featured/+server.ts will give you
api/blog/featured as an endpoint.

I created two APIs, one to get all blogs and one to only return blogs with meta data of featured.

```typescript
import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();
	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
	});

	return json(sortedPosts);
};
```

To get featured blogs all I added was one filter.

```typescript
const featuredPosts = allPosts.filter((post) => post.meta.featured === true);
```

The APIs will then return a JSON array of blog pages, with a path and metadata for each one. Here is a snippet for this blog.

```json
[
	{
		"meta": {
			"title": "The SvelteKit Blog",
			"date": "2024-05-20",
			"author": "Andy Holland",
			"description": "How I built this SvelteKit Blog",
			"tags": ["sveltekit", "blog"],
			"featured": true,
			"image": "src/images/helloworld.png"
		},
		"path": "blog/svelte-kit-blog"
	},
    ...
]
```

## 4. Page fetching

In svelte +page.ts files can export a load function, the return value is available to the page via the data prop. Here we can make a call to our blog or featured API and then return that data to the page via props.

```typescript
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	try {
		const response = await fetch('api/blog.json');
		const allBlogs = await response.json();
		return { allBlogs };
	} catch (e) {
		error(404, `Could not find blog posts`);
	}
}
```

## 5. Rendering

Now that we have the data coming into our +page.svelte file from the props, we can then render this blog data on the page using Svelte elements. Here is the /blog/ page rendering blogs coming from the blogs API.

```svelte
<script lang="ts">
	let { data } = $props();
</script>

<h1 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">All blog posts</h1>
<section>
	<div class="list-none">
		{#each data.allBlogs as blog}
			<a href={blog.path}>
				<div
					class="hover:scale-102 mb-4 transform rounded-lg bg-white px-6 py-4 shadow-lg ring ring-gray-900/5 transition-transform dark:bg-gray-800"
				>
					<h3 class="mt-5 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
						{blog.meta.title}
					</h3>

					<p class="text-m mt-2 text-gray-500 dark:text-gray-400">
						{blog.meta.description}
					</p>
					<p class="text-sm">{blog.meta.date}</p>
				</div>
			</a>
		{/each}
	</div>
</section>
```

## 6. Dynamic Routing

Each blog needs its own page. SvelteKit has routing built in which is handy. Under the routes folder we can add a folder called /blog/[slug] with a +page.svelte file inside. This will represent all blogs and allow them to have their own page, for example blog/getting-started, blog/abc, and any future blogs that will be written.

In the +page.svelte file, we can access the slug from the page parameters. Then use this slug to search for a corresponding file with that slug as the filename.

```typescript
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`$src/content/pages/blog/${params.slug}.md`);
		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
```

Like step 4, the data can be returned to the page via the props and then rendered. Here is my +page.svelte file in the blog/[slug] folder. Because I am using [`mdsvex`](https://github.com/pngwn/MDsveX/tree/main/packages/mdsvex) I can simply render the content directly onto the page!

```svelte
<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="blog">
	<div>
		<data.content />
	</div>
	<div class="flex flex-row">
		{#each data.meta.tags as tag}
			<p class="pr-2">&num;{tag}</p>
		{/each}
	</div>
</article>
```

## 7. Final thoughts

Hopefully this quick walk through explains how I made this svelte kit blog! Stay tuned for future blogs on how I build out other features like components and static site generation!

Andrew Holland
