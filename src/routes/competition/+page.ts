import type { Load } from '@sveltejs/kit';
import type { Competition } from 'src/types/Competition';
import type { Nation } from 'src/types/Nation';
import type { League } from 'src/types/League';
import initializeDates from '../../utils/InitializeDates';
import { debounce } from '../../utils/debounce';
import type { Season } from 'src/types/Season';

export const load: Load = async ({ fetch, url }) => {
	const year = new Date().getFullYear();
	const competitions = await _loadCompetitions(fetch, year, '', '', '');
	const nations = await _loadNations(fetch);
	const leagues = await _loadLeagues(fetch, year);
	const seasons = await _loadSeaons(fetch);

	return { competitions, nations, leagues, url, seasons, fetch };
};

export async function _loadCompetitions(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	year: number,
	name: string,
	nation: string,
	leagueId: string
): Promise<Competition[]> {
	await debounce();
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

export async function _loadLeagues(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	year: number
): Promise<League[]> {
	const response = await fetch(
		'https://api.speedclimbing.org/v1/league?' +
			new URLSearchParams({
				year: year.toString()
			})
	);
	const leagues: League[] = await response.json();

	return leagues;
}

export async function _loadNations(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>
): Promise<Nation[]> {
	const response = await fetch('https://api.speedclimbing.org/v1/nation');
	const nations: Nation[] = await response.json();
	return nations;
}

async function _loadSeaons(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>
) {
	const response = await fetch('https://api.speedclimbing.org/v1/season');
	const seasons: Season[] = await response.json();
	return seasons;
}
