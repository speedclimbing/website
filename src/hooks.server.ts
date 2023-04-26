import type { HandleFetch } from '@sveltejs/kit';
import { API_URL } from 'utils/constants';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	if (process.env.API_TOKEN && request.url.startsWith(API_URL)) {
		request.headers.append('Authorization', `Bearer ${process.env.API_TOKEN}`);
	}
	return fetch(request);
};
