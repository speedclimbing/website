import type { Fetch } from 'types/Fetch';
import { API_URL } from './constants';

export const fetchEndpoint = async <T>(
	fetch: Fetch,
	platform: Readonly<App.Platform> | undefined,
	path: string,
	params?: URLSearchParams | Record<string, string | undefined>
): Promise<T> => {
	if (params instanceof URLSearchParams) {
		path += `?${params.toString()}`;
	} else if (params) {
		Object.keys(params).forEach(
			(key) => (params[key] === undefined || params[key] === '') && delete params[key]
		);
		path += `?${new URLSearchParams(params as Record<string, string>).toString()}`;
	}

	let headers: Record<string, string> = {
		Accept: 'application/json'
	};

	if (platform?.env?.API_TOKEN) {
		headers['Authorization'] = `Bearer ${platform.env.API_TOKEN}`;
	} else if (process.env.API_TOKEN) {
		headers['Authorization'] = `Bearer ${process.env.API_TOKEN}`;
	}

	console.log(`${API_URL}/${path}`);

	const response = await fetch(`${API_URL}/${path}`, {
		headers: headers
	});

	return response.json();
};
