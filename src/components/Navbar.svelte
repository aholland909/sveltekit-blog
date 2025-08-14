<script>
	import { darkMode } from '$src/store/darkMode';

	function toggleDarkMode() {
		darkMode.update((darkMode) => !darkMode);
		darkMode.subscribe((value) => {
			if (value) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		});
	}

	// Apply dark mode class on initial load if dark mode is enabled
	if (typeof document !== 'undefined' && darkMode) {
		document.documentElement.classList.add('dark');
	}
</script>

<nav class="px-4 pt-4 dark:text-white">
	<ul class="flex list-none justify-center space-x-8">
		<li><a href="/" class="hover:underline">Home</a></li>
		<li><a href="/blog" class="hover:underline">Blog</a></li>
		<li><a href="/contact" class="hover:underline">Contact</a></li>
		<li>
			<button on:click={toggleDarkMode}>
				{#if $darkMode}
					☀️
				{:else}
					🌙
				{/if}
			</button>
		</li>
	</ul>
</nav>
