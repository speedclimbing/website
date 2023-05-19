import type { ServerLoad } from '@sveltejs/kit';
import type { Competition } from 'types/Competition';
import type { LeagueGroup } from 'types/LeagueGroup';
import type { Nation } from 'types/Nation';
import type { Season } from 'types/Season';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint } from 'utils/api';

export const load: ServerLoad = async ({ fetch, platform, url }) => {
	const year = Number(url.searchParams.get('year') ?? new Date().getFullYear());
	const name = url.searchParams.get('name') ?? '';
	const nation = url.searchParams.get('nation') ?? '';
	const league_group = url.searchParams.get('league_group') ?? '';
	const params = {
		year,
		name,
		nation,
		league_group
	};

	const competitions = fetchEndpoint<Competition[]>(
		fetch,
		platform,
		'/competition',
		_paramsToUrlSearchParams(params)
	).then((c) => {
		initializeDates(c);
		return c;
	});

	const nations = fetchEndpoint<Nation[]>(fetch, platform, '/nation');
	const league_groups = fetchEndpoint<LeagueGroup[]>(fetch, platform, '/league_group');
	const seasons = fetchEndpoint<Season[]>(fetch, platform, '/season');

	return {
		competitions,
		nations,
		league_groups,
		seasons,
		params
	};
};

function _paramsToUrlSearchParams(params: {
	year: number;
	name: string;
	nation: string;
	league_group: string;
}): URLSearchParams {
	return new URLSearchParams({
		from: new Date(params.year, 0, 1).toISOString().substring(0, 10),
		to: new Date(params.year, 11, 31).toISOString().substring(0, 10),
		name: params.name,
		nation: params.nation,
		league_group: params.league_group
	});
}
