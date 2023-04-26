import type { Fetch } from 'types/Fetch';
import { API_URL } from './constants';

export const fetchEndpoint = async <T>(
	fetch: Fetch,
	path: string,
	params?: URLSearchParams | Record<string, string>
): Promise<T> => {
	if (params instanceof URLSearchParams) {
		path += `?${params.toString()}`;
	} else if (params) {
		path += `?${new URLSearchParams(params).toString()}`;
	}

	let headers = {};
	if (process.env.API_TOKEN) {
		headers = { Authorization: `Bearer ${process.env.API_TOKEN}` };
	}

	const response = await fetch(`${API_URL}/${path}`);
	const nations: T = await response.json();
	return nations;
};
