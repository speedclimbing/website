import { browser } from '$app/environment';
import { API_URL, authorize } from '../api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const request = new Request(`${API_URL}/stats/world-record-history`);
	authorize(request);

	const response = await fetch(request);
	if (response.status != 200) {
		return { data: [], ok: false };
	}
	let data = await response.json();
	return { data: data, ok: true };
};
