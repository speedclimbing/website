import type { Load } from '@sveltejs/kit';
import type { Competition } from 'src/types/Competition';

export const load: Load = async ({ fetch }) => {
	const competitonResponse = await fetch('https://api.speedclimbing.org/v1/competition');
	const competitions: Competition[] = await competitonResponse.json();

	competitions.forEach((competition: Competition) => {
		competition.from = new Date(competition.from);
		competition.to = new Date(competition.to);
	});

	return { competitions, fetch: fetch };
};
