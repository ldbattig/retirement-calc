import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown, you can change these if necessary
			pages: 'build',
			assets: 'build',
			fallback: null,
			strict: false
		}),
		// Additional settings to handle paths correctly on GitHub Pages
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/retirement-calc' : ''
		}
	}
};

export default config;
