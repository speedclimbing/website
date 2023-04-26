import type { ServerLoad } from '@sveltejs/kit';
import type { Competition } from 'types/Competition';
import type { League } from 'types/League';
import type { Nation } from 'types/Nation';
import type { Season } from 'types/Season';
import initializeDates from 'utils/InitializeDates';
import { fetchEntities } from 'utils/api';

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

	const competitions = await fetchEntities<Competition>(
		fetch,
		'/competition',
		_paramsToUrlSearchParams(params)
	);
	initializeDates(competitions);
	const nations = await fetchEntities<Nation>(fetch, '/nation');
	const leagues = await fetchEntities<League>(fetch, '/league', {
		year: year.toString()
	});
	const seasons = await fetchEntities<Season>(fetch, '/season');

	return {
		competitions,
		nations,
		leagues,
		seasons,
		params
	};
};

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
