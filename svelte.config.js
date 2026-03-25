import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			utils: './src/utils',
			types: './src/types',
			components: './src/components'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
