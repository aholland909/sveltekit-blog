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
