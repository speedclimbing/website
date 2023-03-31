import { browser } from '$app/environment';
import type { Load } from '@sveltejs/kit';
import type { Athlete } from 'src/types/Athlete';
import type { Gender } from 'src/types/Gender';
import { debounce } from '../../utils/debounce';

export const load: Load = async ({ fetch, url }) => {
	let athletes = await _handleSearch(url.searchParams.get('name') ?? undefined);

	return {
		fetch,
		url,
		athletes
	};
};

export async function _handleSearch(
	name?: string,
	nation?: string,
	gender?: Gender,
	personalBest?: number
): Promise<Athlete[]> {
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
