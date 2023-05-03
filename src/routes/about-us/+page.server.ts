import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ platform }) => {
	return {
		turnstileSiteKey: platform?.env?.TURNSTILE_SITE_KEY
	};
};
