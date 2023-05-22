import type { Fetch } from 'types/Fetch';
import { API_URL } from './constants';
import type { Filter, FilterOption } from 'components/shared/inputs/SelectFilter.svelte';
import type { LeagueGroup } from 'types/LeagueGroup';
import type { Season } from 'types/Season';
import type { Nation } from 'types/Nation';

const paramsToUrlSearchParams = (
	params: URLSearchParams | Record<string, string | undefined>
): URLSearchParams => {
	if (params instanceof URLSearchParams) {
		return params;
	}

	Object.keys(params).forEach((key) => {
		if (params[key] === undefined || params[key] === '') delete params[key];
	});
	return new URLSearchParams(params as Record<string, string>);
};

export const fetchEndpoint = async <T>(
	fetch: Fetch,
	platform: Readonly<App.Platform> | undefined,
	path: string,
	params?: URLSearchParams | Record<string, string | undefined>
): Promise<T> => {
	if (params) {
		path += `?${paramsToUrlSearchParams(params).toString()}`;
	}

	let headers: Record<string, string> = {
		Accept: 'application/json'
	};

	if (platform?.env?.API_TOKEN) {
		headers['Authorization'] = `Bearer ${platform.env.API_TOKEN}`;
	} else if (process.env.API_TOKEN) {
		headers['Authorization'] = `Bearer ${process.env.API_TOKEN}`;
	}

	const response = await fetch(`${API_URL}/${path}`, {
		headers: headers
	});

	return response.json();
};

const getFilter = async (
	fetch: Fetch,
	platform: Readonly<App.Platform> | undefined,
	name: string
): Promise<Filter> => {
	switch (name) {
		case 'entity':
			return {
				name: 'entity',
				options: [
					{ name: 'Athletes', value: 'athlete' },
					{ name: 'Competitions', value: 'competition' },
					{ name: 'Naions', value: 'nation' }
				]
			};
		case 'subject':
			return {
				name: 'subject',
				options: [
					{ name: 'Average rank', value: 'avg_rank' },
					{ name: 'Points', value: 'points' },
					{ name: 'Time', value: 'time' },
					{ name: 'Final entry time', value: 'fet' },
					{ name: 'Points and medals', value: 'points_and_medals' }
				]
			};
		case 'gender':
			return {
				name: 'gender',
				defaultText: 'Male and Female',
				options: ['Male', 'Female'].map((v) => ({ name: v, value: v }))
			};
		case 'league_group':
			return {
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
			};
		case 'year':
			return {
				name: 'year',
				defaultText: 'All years',
				options: (await fetchEndpoint<Season[]>(fetch, platform, `/season`)).map((s) => ({
					name: s.year.toString(),
					value: s.year.toString()
				}))
			};
		case 'continent':
			return {
				name: 'continent',
				defaultText: 'All continents',
				options: ['Africa', 'Asia', 'Europe', 'Oceania', 'PanAmerica'].map((v) => ({
					name: v,
					value: v
				}))
			};
		case 'nation_code_ioc':
			return {
				name: 'nation_code_ioc',
				defaultText: 'All nations',
				optgroup: {},
				options: (await fetchEndpoint<Nation[]>(fetch, platform, '/nation')).map((nation) => ({
					name: nation.name,
					value: nation.code_ioc,
					optgroup: nation.continent
				}))
			};
		default:
			throw new Error(`Unknown filter ${name}`);
	}
};

export const getAvailableFilters = async (
	fetch: Fetch,
	platform: Readonly<App.Platform> | undefined,
	filters: string[]
): Promise<Filter[]> => {
	return await Promise.all(
		filters.map((f) => getFilter(fetch, platform, f)).filter((f) => f !== undefined)
	);
};

type OptionsFilterCallback = (
	filter: Filter,
	params: Record<string, string>
) => { required: boolean; applicableOptions: FilterOption[] };

export const getApplicableFiltersAndParams = (
	filters: Filter[],
	url: URL,
	filterOptions: OptionsFilterCallback
): { applicableFilters: Filter[]; params: Record<string, string> } => {
	let params: Record<string, string> = {};
	let applicableFilters: Filter[] = [];

	for (const availableFilter of filters) {
		const { applicableFilter, value } = processFilter(availableFilter, params, url, filterOptions);

		if (!applicableFilter) {
			continue;
		}

		applicableFilters.push(applicableFilter);

		if (value) {
			params[applicableFilter.name] = value;
		}
	}

	return { applicableFilters, params };
};

const processFilter = (
	availableFilter: Filter,
	params: Record<string, string>,
	url: URL,
	filterOptions: OptionsFilterCallback
): {
	applicableFilter?: Filter;
	value?: string;
} => {
	const { required, applicableOptions } = filterOptions(availableFilter, params);

	if (applicableOptions.length === 0) {
		return {};
	}

	const applicableFilter = {
		options: applicableOptions,
		defaultText: required ? undefined : availableFilter.defaultText,
		name: availableFilter.name,
		optgroup: availableFilter.optgroup
	};

	const value = parameterFromList(
		url.searchParams.get(availableFilter.name),
		applicableOptions.map((o) => o.value),
		required
	);

	return { applicableFilter, value };
};

const parameterFromList = (
	value: string | null,
	list: string[],
	required: boolean
): string | undefined => {
	if (!value) {
		return required ? list[0] : undefined;
	}

	if (!list.includes(value)) {
		return required ? list[0] : undefined;
	}

	return encodeURIComponent(value);
};
