import type { ServerLoad } from '@sveltejs/kit';
import type { Athlete } from 'types/Athlete';
import type { Gender } from 'types/Gender';
import type { Fetch } from 'types/Fetch';
import { API_URL } from 'utils/constants';

export const load: ServerLoad = async ({ fetch, url }) => {
	let athletes = await _handleSearch(fetch, { name: url.searchParams.get('name') ?? undefined });

	return {
		athletes
	};
};

export async function _handleSearch(
	fetch: Fetch,
	params: {
		name?: string;
		nation?: string;
		gender?: Gender;
		personalBest?: number;
	}
): Promise<Athlete[]> {
	const { name, nation, gender, personalBest } = params;
	const response = await fetch(
		`${API_URL}/athlete?` +
			new URLSearchParams({
				name: (name ?? '').toLocaleLowerCase(),
				nation: nation ?? '',
				gender: gender ?? '',
				personal_best: personalBest?.toString() ?? ''
			})
	);

	const athletes: Athlete[] = await response.json();
	return athletes;
}
