import type { Load } from '@sveltejs/kit';
import type { Athlete } from '../../types/Athlete';
import type { Gender } from '../../types/Gender';
import type { Fetch } from '../../types/Fetch';

export const load: Load = async ({ fetch, url }) => {
	let athletes = await _handleSearch(fetch, { name: url.searchParams.get('name') ?? undefined });

	return {
		fetch,
		url,
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
		'https://api.speedclimbing.org/v1/athlete?' +
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
