<script lang="ts">
	import { darkMode } from '$lib/store';
	import { Button } from 'flowbite-svelte';
	import { SunSolid, MoonSolid } from 'flowbite-svelte-icons';

	function toggleTheme() {
		$darkMode = !$darkMode;
		document.documentElement.className = $darkMode ? 'dark': 'light';
	}
</script>

<div class="flex flex-wrap items-center">
	<Button id="darkModeToggle" class="!p-2 bg-blue-500 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-500 focus:ring-blue-300 dark:focus:ring-blue-800" on:click={toggleTheme}>
		{#if $darkMode}
			<SunSolid/>
		{:else}
			<MoonSolid/>
		{/if}
	</Button>
</div>
