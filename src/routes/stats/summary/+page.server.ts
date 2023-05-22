import type { ServerLoad } from '@sveltejs/kit';
import type { Filter, FilterOption } from 'components/shared/inputs/SelectFilter.svelte';
import type { Competition } from 'types/Competition';
import type { Fetch } from 'types/Fetch';
import type { Gender } from 'types/Gender';
import type { LeagueGroup } from 'types/LeagueGroup';
import type { Nation } from 'types/Nation';
import type { Season } from 'types/Season';
import type { SeasonSummary, AllTimeSummary } from 'types/StatsSummary';
import initializeDates from 'utils/InitializeDates';
import {
	fetchEndpoint,
	filterByOptgroup,
	getApplicableFiltersAndParams,
	getAvailableFilters
} from 'utils/api';
import promiseAllProperties from 'utils/promiseAllProperties';

export const load: ServerLoad = async ({ fetch, platform, url }) => {
	if (url.searchParams.has('year')) {
		return loadSeasonData({ fetch, platform, url });
	} else {
		return loadAllTimeData({ fetch, platform, url });
	}
};

interface LoadParams {
	fetch: Fetch;
	platform: Readonly<App.Platform> | undefined;
	url: URL;
}

const loadSeasonData = async ({ fetch, platform, url }: LoadParams) => {
	const availableFilters: Filter[] = await getAvailableFilters(fetch, platform, ['year', 'gender']);
	const { applicableFilters: filters, params } = getApplicableFiltersAndParams(
		availableFilters,
		url,
		(filter: Filter) => {
			return {
				required: true,
				applicableOptions: filter.options
			};
		}
	);

	const seasonSummary = fetchEndpoint<SeasonSummary>(
		fetch,
		platform,
		`/stats/summary/season/${params.gender}/${params.year}`
	);

	const upcomingCompetitions = fetchEndpoint<Competition[]>(fetch, platform, '/competition', {
		from: new Date().toISOString()
	}).then((c) => {
		c = c.splice(0, 2);
		initializeDates(c);
		return c;
	});

	return {
		filters,
		params,
		seasonData: promiseAllProperties({
			seasonSummary,
			upcomingCompetitions
		})
	};
};

const loadAllTimeData = async ({ fetch, platform, url }: LoadParams) => {
	const availableFilters: Filter[] = await getAvailableFilters(fetch, platform, [
		'gender',
		'continent',
		'nation_code_ioc',
		'league_group'
	]);
	const { applicableFilters: filters, params } = getApplicableFiltersAndParams(
		availableFilters,
		url,
		(filter: Filter, params: Record<string, string>) => {
			let required = false;
			let applicableOptions: FilterOption[] = filter.options;

			if (filter.name === 'gender') {
				required = true;
			} else if (filter.name === 'nation_code_ioc') {
				applicableOptions = filterByOptgroup(filter.options, params.continent);
			}

			return {
				required,
				applicableOptions
			};
		}
	);

	const allTimeSummary = fetchEndpoint<AllTimeSummary>(
		fetch,
		platform,
		`/stats/summary/all_time/${params.gender}`,
		{
			nation_code_ioc: params.nation_code_ioc,
			continent: params.continent,
			league_group_id: params.league_group
		}
	).then((summary) => {
		initializeDates(summary.ranking_competition_fet);
		initializeDates(summary.ranking_athlete_time);
		initializeDates(summary.history_world_record);
		return summary;
	});

	return {
		filters,
		params,
		allTimeData: promiseAllProperties({
			allTimeSummary
		})
	};
};
