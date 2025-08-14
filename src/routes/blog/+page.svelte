<script lang="ts">
	import Blogs from '$components/Blogs.svelte';
	let { data } = $props();
</script>

<h1 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">All blog posts</h1>
<section>
	<div class="list-none">
		<Blogs blogs={data.allBlogs} />
	</div>
</section>
