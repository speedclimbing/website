import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch, url }) => {
	return {
		fetch,
		url
	};
};
