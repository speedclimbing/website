import type { Load } from '@sveltejs/kit';
import type { Competition } from 'src/types/Competition';
import type { Nation } from 'src/types/Nation';
import type { League } from 'src/types/League';
import initializeDates from 'src/utils/InitializeDates';

export const load: Load = async ({ fetch, url }) => {
	const year = new Date().getFullYear() - 1;
	const competitions = await _loadCompetitions(year, '', '', '');
	const nations = await _loadNations();
	const leagues = await _loadLeagues(year);

	return { competitions, fetch, nations, leagues, url };
};

export async function _loadCompetitions(
	year: number,
	name: string,
	nation: string,
	leagueId: string
): Promise<Competition[]> {
	const response = await fetch(
		'https://api.speedclimbing.org/v1/competition?' +
			new URLSearchParams({
				from: new Date(year, 0, 1).toISOString().substring(0, 10),
				to: new Date(year, 11, 31).toISOString().substring(0, 10),
				name: name,
				nation: nation,
				league: leagueId
			})
	);
	const competitions: Competition[] = await response.json();
	initializeDates(competitions);
	return competitions;
}

export async function _loadLeagues(year: number): Promise<League[]> {
	const response = await fetch(
		'https://api.speedclimbing.org/v1/league?' +
			new URLSearchParams({
				year: year.toString()
			})
	);
	const leagues: League[] = await response.json();

	return leagues;
}

export async function _loadNations(): Promise<Nation[]> {
	const response = await fetch('https://api.speedclimbing.org/v1/nation');
	const nations: Nation[] = await response.json();

	nations.sort((a, b) => {
		return a.name < b.name ? 1 : -1;
	});

	return nations;
}
