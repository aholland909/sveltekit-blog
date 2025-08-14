---
title: 'Getting Started with Svelte'
date: '2024-04-17'
author: 'Andy Holland'
description: Welcome to my new blog!
tags: ['getting started', 'svelte', 'tutorial']
featured: true
---

# Getting Started with Svelte

Welcome to my new blog! This is the first post on my SvelteKit blog. I'm excited to share my journey and experiences with you.

## Why Svelte?

Svelte is a modern JavaScript framework that makes building web applications a breeze. Unlike other frameworks, Svelte shifts much of the work to compile time, resulting in highly optimized and performant applications.

## Setting Up Your Environment

To get started with Svelte, you'll need to set up your development environment. Here's a quick guide:

1. **Install Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. **Create a New Svelte Project**: Use the following command to create a new Svelte project:
   ```bash
   npx degit sveltejs/template svelte-app
   cd svelte-app
   npm install
   ```
3. **Run the Development Server**: Start the development server with:
   ```bash
   npm run dev
   ```

## Building Your First Component

Let's create a simple component to get a feel for Svelte. Create a new file called `HelloWorld.svelte` with the following content:

```svelte
<script>
	let name = 'world';
</script>

<h1>Hello {name}!</h1>

<style>
	h1 {
		color: purple;
	}
</style>
```

## What's Next?

In upcoming posts, I'll dive deeper into Svelte's features, including:

- Reactive programming
- How I built this blog
- Svelte vs React
- Advanced SvelteKit usage

Stay tuned for more tutorials and insights into Svelte development!

Happy coding!

Andy Holland
