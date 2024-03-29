import type { ServerLoad } from '@sveltejs/kit';
import type { Filter, FilterOption } from 'components/shared/inputs/SelectFilter.svelte';
import initializeDates from 'utils/InitializeDates';
import {
	fetchEndpoint,
	filterByOptgroup,
	getApplicableFiltersAndParams,
	getAvailableFilters
} from 'utils/api';

const competetionRankingFilters = {
	gender: true,
	league_group: true,
	year: false
};

const athleteRankingFilters = {
	gender: true,
	continent: false,
	nation_code_ioc: false,
	year: false
};

const subjectsAndFilters: Record<string, Record<string, Record<string, boolean>>> = {
	athlete: {
		avg_rank: competetionRankingFilters,
		points: competetionRankingFilters,
		time: athleteRankingFilters
	},
	competition: {
		fet: competetionRankingFilters
	},
	nation: {
		points_and_medals: competetionRankingFilters
	}
};

export const load: ServerLoad = async ({ fetch, platform, url }) => {
	const availableFilters: Filter[] = await getAvailableFilters(fetch, platform, [
		'entity',
		'subject',
		'gender',
		'league_group',
		'year',
		'continent',
		'nation_code_ioc'
	]);
	const { applicableFilters, params } = getApplicableFiltersAndParams(
		availableFilters,
		url,
		getApplicableFilterOptions
	);

	let data = await fetchEndpoint<Record<string, string>[]>(
		fetch,
		platform,
		`/stats/ranking/${params.entity}/${params.subject}/${params.gender}`,
		params
	)
		.then((d) => ('error' in d ? [] : d))
		.then((d) => {
			initializeDates(d);
			return d;
		});

	return {
		filters: applicableFilters,
		params,
		data
	};
};

const getApplicableFilterOptions = (filter: Filter, params: Record<string, string>) => {
	let required = false;
	let applicableOptions: FilterOption[] = filter.options;

	switch (filter.name) {
		case 'entity':
			required = true;
			break;
		case 'subject':
			applicableOptions = filter.options.filter((o) =>
				Object.keys(subjectsAndFilters[params.entity]).includes(o.value)
			);
			required = true;
			break;
		case 'nation_code_ioc':
			applicableOptions = filterByOptgroup(filter.options, params.continent);
		default:
			if (!Object.keys(subjectsAndFilters[params.entity][params.subject]).includes(filter.name)) {
				applicableOptions = [];
				break;
			}

			required = subjectsAndFilters[params.entity][params.subject][filter.name];
			break;
	}

	return { required, applicableOptions };
};
