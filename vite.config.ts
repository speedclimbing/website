import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		include: ['tailwind-config'],
		force: true // force to refresh the config file on change in DEV mode
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'tailwind-config': path.resolve(__dirname, './tailwind.config.ts')
		}
	}
});
