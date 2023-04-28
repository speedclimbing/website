import type { Fetch } from 'types/Fetch';
import { API_URL } from './constants';

export const fetchEndpoint = async <T>(
	fetch: Fetch,
	platform: Readonly<App.Platform> | undefined,
	path: string,
	params?: URLSearchParams | Record<string, string>
): Promise<T> => {
	if (params instanceof URLSearchParams) {
		path += `?${params.toString()}`;
	} else if (params) {
		path += `?${new URLSearchParams(params).toString()}`;
	}

	let headers: Record<string, string> = {};
	if (platform?.env?.API_TOKEN) {
		headers['Authorization'] = `Bearer ${platform.env.API_TOKEN}`;
	}

	const response = await fetch(`${API_URL}/${path}`, {
		headers: headers
	});

	return response.json();
};
