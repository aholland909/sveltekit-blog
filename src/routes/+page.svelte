<script lang="ts">
	import ContactForm from '$components/ContactForm.svelte';
	import Blogs from '$src/components/Blogs.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Andy's SvelteKit Blog</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Andy's SvelteKit Blog" />
</svelte:head>

<h1 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Hi! I'm Andy!</h1>
<h2 class="mt-2 text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
	Welcome to my SvelteKit Blog!
</h2>

<div aria-label="Related articles" class=" ">
	<div class="mx-auto max-w-screen-xl">
		<h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Features blogs</h2>
		<div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-2">
			{#each data.featured as blog}
				<article>
					<a href={blog.path}>
						<img
							src={blog.meta.image || 'images/fallback.png'}
							class="mb-5 w-full rounded-lg object-cover"
							alt={blog.meta.title}
							style="height: 200px; width: 100%;"
						/>
						<h2 class="mb-2 text-xl leading-tight font-bold text-gray-900 dark:text-white">
							{blog.meta.title}
						</h2>
						<p class="mb-4 text-gray-500 dark:text-gray-400">
							{blog.meta.description}
						</p>
					</a>
				</article>
			{/each}
		</div>
		<h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Recent Blogs</h2>
		<Blogs blogs={data.recentBlogs} />
	</div>
</div>

<h2 id="#contact" class="mt-8 mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">
	Contact Me!
</h2>
<ContactForm />
