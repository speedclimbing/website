import type { ServerLoad } from '@sveltejs/kit';
import type { Competition } from 'types/Competition';
import type { Nation } from 'types/Nation';
import type { League } from 'types/League';
import initializeDates from 'utils/InitializeDates';
import type { Season } from 'types/Season';
import { API_URL } from 'utils/constants';

export const load: ServerLoad = async ({ fetch, url }) => {
	const year = Number(url.searchParams.get('year') ?? new Date().getFullYear());
	const name = url.searchParams.get('name') ?? '';
	const nation = url.searchParams.get('natino') ?? '';
	const league = url.searchParams.get('league') ?? '';
	const params = {
		year,
		name,
		nation,
		league
	};

	const competitions = await _loadCompetitions(fetch, params);
	const nations = await _loadNations(fetch);
	const leagues = await _loadLeagues(fetch, year);
	const seasons = await _loadSeaons(fetch);

	return {
		competitions,
		nations,
		leagues,
		seasons,
		params
	};
};

export async function _loadCompetitions(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	params: { year: number; name: string; nation: string; league: string }
): Promise<Competition[]> {
	const response = await fetch(`${API_URL}/competition?` + _paramsToUrlSearchParams(params));
	const competitions: Competition[] = await response.json();
	initializeDates(competitions);
	return competitions;
}

export async function _loadLeagues(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	year: number
): Promise<League[]> {
	const response = await fetch(
		`${API_URL}/league?` +
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
	const response = await fetch(`${API_URL}/nation`);
	const nations: Nation[] = await response.json();
	return nations;
}

async function _loadSeaons(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>
) {
	const response = await fetch(`${API_URL}/season`);
	const seasons: Season[] = await response.json();
	return seasons;
}

function _paramsToUrlSearchParams(params: {
	year: number;
	name: string;
	nation: string;
	league: string;
}): URLSearchParams {
	return new URLSearchParams({
		from: new Date(params.year, 0, 1).toISOString().substring(0, 10),
		to: new Date(params.year, 11, 31).toISOString().substring(0, 10),
		name: params.name,
		nation: params.nation,
		league: params.league
	});
}
