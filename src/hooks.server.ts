import type { HandleFetch } from '@sveltejs/kit';
import { API_URL } from './api';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	let authorization_token = event.cookies.get('session');
	if (request.url.startsWith(API_URL) && authorization_token) {
		request.headers.append('authorization', `Bearer ${authorization_token}`);
	}
	return fetch(request);
};
