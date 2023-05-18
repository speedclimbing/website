import type { ServerLoad } from '@sveltejs/kit';
import type { Competition } from 'types/Competition';
import type { Fetch } from 'types/Fetch';
import type { Gender } from 'types/Gender';
import type { LeagueGroup } from 'types/LeagueGroup';
import type { Nation } from 'types/Nation';
import type { Season } from 'types/Season';
import type { SeasonSummary, AllTimeSummary } from 'types/StatsSummary';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint } from 'utils/api';
import promiseAllProperties from 'utils/promiseAllProperties';

export const load: ServerLoad = async ({ fetch, platform, url }) => {
	const year = url.searchParams.get('year') ? Number(url.searchParams.get('year')) : undefined;
	const gender = (url.searchParams.get('gender') ?? 'Male') as Gender;
	const nation = url.searchParams.get('nation') ?? undefined;
	const continent = url.searchParams.get('continent') ?? undefined;
	const leagueGroup = url.searchParams.get('leagueGroup') ?? undefined;
	const params = {
		year,
		gender,
		nation,
		continent,
		leagueGroup
	};

	let allTimeData;
	let seasonData;

	if (year) {
		seasonData = loadSeasonData({ fetch, platform, year, gender });
	} else {
		allTimeData = loadAllTimeData({ fetch, platform, gender, nation, continent, leagueGroup });
	}

	return {
		seasonData,
		allTimeData,
		params
	};
};

interface LoadParams {
	fetch: Fetch;
	platform: Readonly<App.Platform> | undefined;
	year?: number;
	gender: Gender;
	nation?: string;
	continent?: string;
	leagueGroup?: string;
}

const loadSeasonData = async ({ fetch, platform, gender, year }: LoadParams) => {
	const seasons = fetchEndpoint<Season[]>(fetch, platform, '/season');

	const seasonSummary = fetchEndpoint<SeasonSummary>(
		fetch,
		platform,
		`/stats/summary/season/${gender}/${year}`
	);

	const upcomingCompetitions = fetchEndpoint<Competition[]>(fetch, platform, '/competition', {
		from: new Date().toISOString().substring(0, 10)
	}).then((c) => {
		c = c.splice(0, 2);
		initializeDates(c);
		return c;
	});

	return promiseAllProperties({
		seasons,
		seasonSummary,
		upcomingCompetitions
	});
};

const loadAllTimeData = async ({
	fetch,
	platform,
	gender,
	nation,
	continent,
	leagueGroup
}: LoadParams) => {
	const allTimeSummary = fetchEndpoint<AllTimeSummary>(
		fetch,
		platform,
		`/stats/summary/all_time/${gender}`,
		{
			nation_code_ioc: nation,
			continent,
			league_group_id: leagueGroup
		}
	).then((summary) => {
		initializeDates(summary.ranking_competition_fet);
		initializeDates(summary.ranking_athlete_time);
		initializeDates(summary.history_world_record);
		return summary;
	});

	const leagueGroups = fetchEndpoint<LeagueGroup[]>(fetch, platform, '/league_group');
	const nations = fetchEndpoint<Nation[]>(fetch, platform, '/nation');

	return promiseAllProperties({
		allTimeSummary,
		leagueGroups,
		nations
	});
};
