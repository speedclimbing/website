import type { Load } from '@sveltejs/kit';
import type { Competition } from 'src/types/Competition';
import type { Nation } from 'src/types/Nation';
import type { League } from 'src/types/League';

export const load: Load = async ({ fetch }) => {
	const competitonResponse = await fetch('https://api.speedclimbing.org/v1/competition');
	const competitions: Competition[] = await competitonResponse.json();

	competitions.forEach((competition: Competition) => {
		competition.from = new Date(competition.from);
		competition.to = new Date(competition.to);
	});

	const nationResponse = await fetch('https://api.speedclimbing.org/v1/nation');
	const nations: Nation[] = await nationResponse.json();

	let year: number = new Date().getFullYear();
	const leagueResonse = await fetch(`https://api.speedclimbing.org/v1/league?year=${year - 1}`);
	const leagues: League[] = await leagueResonse.json();

	return { competitions, fetch, nations, leagues };
};
