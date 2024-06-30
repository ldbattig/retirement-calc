<script lang="ts">
	import { theme } from '$lib/store';
	import { Label, Select } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let selectedTheme = 'light';
	const themes = [
		'light',
		'dark',
	];
	let themesList = themes.map(theme => {
		return {
			value: theme,
			name: theme.charAt(0).toUpperCase() + theme.slice(1).toLowerCase()
		};
	});

	onMount(() => {
    theme.subscribe(value => {
      selectedTheme = value;
      document.documentElement.className = value;
    });
  });
</script>

<div class="text-center max-w-32">
	<Label class="mb-2" for="theme">Theme</Label>
	<Select class="focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" bind:value={$theme} id="theme" items={themesList} />
</div>
