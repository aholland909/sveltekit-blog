---
title: 'Svelte Introduction'
date: '2025-08-14'
author: 'Andy Holland'
description: Svelte vs React
tags: ['getting started', 'svelte', 'tutorial']
featured: true
---

# Getting Started with Svelte

Welcome to my new blog! This is the first post and I want to share my experiences with SvelteKit, and what a better way to do it by comparing it to the most popular framework React.

## Why Svelte?

Svelte is a modern JavaScript framework that makes building web applications a breeze. Unlike other frameworks, Svelte shifts much of the work to compile time, resulting in highly optimized and performant applications.

## Svelte and SvelteKit?

Svelte is the core UI framework. It lets you build components and single-page applications (SPAs) with a simple, reactive syntax.

SvelteKit is the official application framework for Svelte. It builds on top of Svelte and provides everything you need for production-ready web apps. It gives you great features like, SSR and SSG, API endpoints and file based routing.

It's like comparing React and NextJs.

## What does it look like?

Here is a counter example. All javascript is wrapped inside of script tags, and everything else can be added to the rest of the file.

To render any javascript variables we can just add curly brackets around a variable.

```svelte
<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicks: {count}
</button>
```

This example was taken from svelte docs playground. Click [here](https://svelte.dev/repl/f5acc8113ec14bc7946eff9687916fa1?version=3.4.1​) to play with it!

## Conditional rendering

Sometimes we want to render elements depending on some logic. We can use if statements to do so, in svelte they have a special syntax with curly brackets.

```svelte
<script>
	let user = $state({ loggedIn: false });

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

{#if user.loggedIn}
	<button onclick={toggle}> Log out </button>
{:else}
	<button onclick={toggle}> Log in </button>
{/if}
```

Compared to React I think conditional rendering is much easier! It feel more natural and logical to write, it's similar to Vue.js and Angular.

Click [here](https://svelte.dev/playground/else-blocks?version=5.38.1) to play with it!

## Reactivity

You can also use the $: label to run code whenever a value changes.

Whenever name changes, greeting is recalculated automatically.

```svelte
<script>
	let name = 'world';
	$: greeting = `Hello, ${name}!`;
</script>

<input bind:value={name} /><p>{greeting}</p>
```

What about if you wanted to double a value? Simply just use the $: to define a new value thats original \* 2.

```svelte
<script>
	let count = 1;
	$: doubled = count * 2;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Count: {count}
</button>

<p>{count} * 2 = {doubled}</p>
```

## Conclusions

In Svelte again it's simpler and more direct, while React requires more explicit state management with more setup with useState. Svelte offers a refreshing approach to building web apps. I think it's a great framework for anyone starting new in web development, or if someone wants so change it and have a break from React.

Why not give Svelte a try for your next project? The [docs](https://svelte.dev/docs/kit/introduction) and [tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte) are really helpful for new web developers!

Happy coding!

Andrew Holland
