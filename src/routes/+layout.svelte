<script lang="ts">
	import '../app.css';
	import Navbar from '$components/Navbar.svelte';
	let { children } = $props();
</script>

<Navbar />
<div class="mx-auto pb-16 antialiased lg:pt-4 lg:pb-24">
	<div class="mx-auto flex w-full max-w-4xl flex-col justify-between px-4">
		{@render children()}
	</div>
</div>
