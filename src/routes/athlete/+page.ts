import type { Load } from '@sveltejs/kit';
import type { Athlete } from 'src/types/Athlete';

export const load: Load = async ({ fetch }) => {
	const athleteResponse = await fetch('https://api.speedclimbing.org/v1/athlete');
	const athletes: Athlete[] = await athleteResponse.json();
	console.log(athletes);

	return { athletes, fetch: fetch };
};
