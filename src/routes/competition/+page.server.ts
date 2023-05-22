import type { ServerLoad } from '@sveltejs/kit';
import type { Competition } from 'types/Competition';
import type { LeagueGroup } from 'types/LeagueGroup';
import type { Nation } from 'types/Nation';
import type { Season } from 'types/Season';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint } from 'utils/api';

export const load: ServerLoad = async ({ fetch, platform, url }) => {
	const year = Number(url.searchParams.get('year') ?? new Date().getFullYear()).toString();
	const name = url.searchParams.get('name') ?? undefined;
	const nation = url.searchParams.get('nation') ?? undefined;
	const league_group = url.searchParams.get('league_group') ?? undefined;
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
	year: string;
	name?: string;
	nation?: string;
	league_group?: string;
}) {
	return {
		from: new Date(parseInt(params.year), 0, 1).toISOString(),
		to: new Date(parseInt(params.year), 11, 31).toISOString(),
		name: params.name,
		nation: params.nation,
		league_group: params.league_group
	};
}
