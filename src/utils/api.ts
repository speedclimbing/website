import type { Fetch } from 'types/Fetch';
import { API_URL } from './constants';

export const fetchEntities = async <T>(
	fetch: Fetch,
	path: string,
	params?: URLSearchParams | Record<string, string>
): Promise<T[]> => {
	if (params instanceof URLSearchParams) {
		path += `?${params.toString()}`;
	} else if (params) {
		path += `?${new URLSearchParams(params).toString()}`;
	}

	const response = await fetch(`${API_URL}/${path}`);
	const nations: T[] = await response.json();
	return nations;
};
