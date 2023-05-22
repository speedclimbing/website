import type { ServerLoad } from '@sveltejs/kit';
import type { Filter, FilterOption } from 'components/shared/inputs/SelectFilter.svelte';
import type { Fetch } from 'types/Fetch';
import type { LeagueGroup } from 'types/LeagueGroup';
import type { Nation } from 'types/Nation';
import type { Season } from 'types/Season';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint } from 'utils/api';

const competetionRankingFilters = {
	gender: true,
	league_group: false,
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
	const availableFilters: Filter[] = await getAvailableFilters(fetch, platform);
	const { applicableFilters, params } = getApplicableFiltersAndParams(availableFilters, url);

	let data = fetchEndpoint<Record<string, string>[]>(
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

const getAvailableFilters = async (fetch: Fetch, platform: Readonly<App.Platform> | undefined) => {
	let availableFilters: Filter[] = [
		{
			name: 'entity',
			options: [
				{ name: 'Athletes', value: 'athlete' },
				{ name: 'Competitions', value: 'competition' },
				{ name: 'Naions', value: 'nation' }
			]
		},
		{
			name: 'subject',
			options: [
				{ name: 'Average rank', value: 'avg_rank' },
				{ name: 'Points', value: 'points' },
				{ name: 'Time', value: 'time' },
				{ name: 'Final entry time', value: 'fet' },
				{ name: 'Points and medals', value: 'points_and_medals' }
			]
		},
		{
			name: 'gender',
			defaultText: 'Male and Female',
			options: ['Male', 'Female'].map((v) => ({ name: v, value: v }))
		},
		{
			name: 'league_group',
			defaultText: 'All leagues',
			optgroup: {
				defaultText: 'World wide'
			},
			options: (await fetchEndpoint<LeagueGroup[]>(fetch, platform, `/league_group`)).map(
				(league_grouop) => ({
					name: league_grouop.name,
					value: league_grouop.id,
					optgroup: league_grouop.continent
				})
			)
		},
		{
			name: 'year',
			defaultText: 'All years',
			options: (await fetchEndpoint<Season[]>(fetch, platform, `/season`)).map((s) => ({
				name: s.year.toString(),
				value: s.year.toString()
			}))
		},
		{
			name: 'continent',
			defaultText: 'All continents',
			options: ['Africa', 'Asia', 'Europe', 'Oceania', 'PanAmerica'].map((v) => ({
				name: v,
				value: v
			}))
		},
		{
			name: 'nation_code_ioc',
			defaultText: 'All nations',
			optgroup: {},
			options: (await fetchEndpoint<Nation[]>(fetch, platform, '/nation')).map((nation) => ({
				name: nation.name,
				value: nation.code_ioc,
				optgroup: nation.continent
			}))
		}
	];
	return availableFilters;
};

const getApplicableFiltersAndParams = (filters: Filter[], url: URL) => {
	let params: Record<string, string> = {};
	let applicableFilters: Filter[] = [];

	for (const filter of filters) {
		let required = false;
		let applicableOptions: FilterOption[] = filter.options;

		console.log('loading', filter.name, params);

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
				applicableOptions = filter.options.filter(
					(o) => !params.continent || o.optgroup === params.continent
				);
			default:
				if (!Object.keys(subjectsAndFilters[params.entity][params.subject]).includes(filter.name)) {
					applicableOptions = [];
					break;
				}

				required = subjectsAndFilters[params.entity][params.subject][filter.name];
				break;
		}

		if (applicableOptions.length === 0) {
			continue;
		}

		applicableFilters.push({
			options: applicableOptions,
			defaultText: required ? undefined : filter.defaultText,
			name: filter.name,
			optgroup: filter.optgroup
		});

		const value = parameterFromList(
			url.searchParams.get(filter.name),
			applicableOptions.map((o) => o.value),
			required
		);

		if (value) {
			params[filter.name] = value;
		}
	}

	return { applicableFilters, params };
};

const parameterFromList = (value: string | null, list: string[], required: boolean) => {
	if (!value) {
		return required ? list[0] : undefined;
	}

	if (!list.includes(value)) {
		return required ? list[0] : undefined;
	}

	return encodeURIComponent(value);
};
