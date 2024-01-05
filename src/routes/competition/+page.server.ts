import type { ServerLoad } from '@sveltejs/kit';
import type { Filter } from 'components/shared/inputs/SelectFilter.svelte';
import type { Competition } from 'types/Competition';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint, getApplicableFiltersAndParams, getAvailableFilters } from 'utils/api';

export const load: ServerLoad = async ({ fetch, platform, url }) => {
	const name = url.searchParams.get('name') ?? '';

	const availableFilters: Filter[] = await getAvailableFilters(fetch, platform, [
		'year',
		'nation_code_ioc',
		'league_group'
	]);
	let { applicableFilters: filters, params } = getApplicableFiltersAndParams(
		availableFilters,
		url,
		(filter: Filter) => {
			return {
				required: filter.name === 'year',
				applicableOptions: filter.options
			};
		}
	);

	params = {
		name,
		...params
	};

	const competitions = await fetchEndpoint<Competition[]>(
		fetch,
		platform,
		'/competition',
		_paramsToUrlSearchParams(params)
	).then((c) => {
		initializeDates(c);
		return c;
	});

	return {
		filters,
		params,
		competitions
	};
};

function _paramsToUrlSearchParams(params: Record<string, string>) {
	return {
		from: new Date(parseInt(params.year), 0, 1).toISOString(),
		to: new Date(parseInt(params.year), 11, 31).toISOString(),
		name: params.name,
		nation_code_ioc: params.nation_code_ioc,
		league_group: params.league_group
	};
}
