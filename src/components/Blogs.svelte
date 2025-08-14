<script lang="ts">
	export let blogs;
</script>

{#each blogs as blog}
	<a href={blog.path}>
		<div
			class="mb-4 transform rounded-lg bg-white px-6 py-4 shadow-lg ring ring-gray-900/5 transition-transform hover:scale-102 dark:bg-gray-800"
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
