import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const prefersDarkModeStore = () => {
	const dark = browser
		? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
		: false;

	const { subscribe, set } = writable(dark);

	if (browser) {
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (event: MediaQueryListEvent) => {
				set(event.matches);
			});
	}
	console.log('subscribe!');

	return {
		subscribe
	};
};

export const prefersDarkMode = prefersDarkModeStore();
