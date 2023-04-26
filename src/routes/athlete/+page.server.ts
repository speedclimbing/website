import type { ServerLoad } from '@sveltejs/kit';
import type { Athlete } from 'types/Athlete';
import type { Gender } from 'types/Gender';
import type { Fetch } from 'types/Fetch';
import { API_URL } from 'utils/constants';
import { fetchEndpoint } from 'utils/api';

export const load: ServerLoad = async ({ fetch, platform, url }) => {
	let name: string | '' = url.searchParams.get('name') ?? '';
	let nation: string | '' = url.searchParams.get('nation') ?? '';
	let gender: Gender | '' = (url.searchParams.get('gender') as Gender) ?? '';
	let pb = url.searchParams.get('personalBest');
	let personalBest: number | '' = pb ? parseInt(pb) : '';
	const params = {
		name,
		nation,
		gender,
		personalBest
	};

	let athletes: Athlete[] = await fetchEndpoint(
		fetch,
		platform,
		'athlete',
		new URLSearchParams({
			name: name.toLocaleLowerCase(),
			nation: nation,
			gender: gender,
			personal_best: personalBest.toString()
		})
	);

	return {
		athletes,
		params
	};
};