import type { ServerLoad } from '@sveltejs/kit';
import type { Athlete } from 'types/Athlete';
import type { Gender } from 'types/Gender';
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

	let athletes: Athlete[] = await fetchEndpoint(fetch, platform, 'athlete', {
		name: name.toLocaleLowerCase(),
		nation: nation,
		gender: gender,
		personal_best: personalBest.toString()
	});

	return {
		athletes,
		params
	};
};
