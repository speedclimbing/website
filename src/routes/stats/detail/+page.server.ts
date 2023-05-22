import type { ServerLoad } from '@sveltejs/kit';
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
	const availableEntities = Object.keys(subjectsAndFilters);
	const entity = parameterFromList(url.searchParams.get('entity'), availableEntities);

	const availableSubjects = Object.keys(subjectsAndFilters[entity]);
	const subject = parameterFromList(url.searchParams.get('subject'), availableSubjects);

	const filters = Object.keys(subjectsAndFilters[entity][subject]).reduce((acc, key) => {
		const value = url.searchParams.get(key);

		if (!value && subjectsAndFilters[entity][subject][key]) {
			throw new Error(`Missing filter ${key}`);
		}

		if (!value) {
			acc[key] = '';
			return acc;
		}

		acc[key] = value;

		return acc;
	}, {} as Record<string, string>);

	const params: Record<string, string> = {
		entity,
		subject,
		...filters
	};

	console.log(Object.keys(subjectsAndFilters[entity][subject]), filters);

	let data = fetchEndpoint<Record<string, string>[]>(
		fetch,
		platform,
		`/stats/ranking/${entity}/${subject}/${filters.gender}`,
		filters
	)
		.then((d) => ('error' in d ? [] : d))
		.then((d) => {
			initializeDates(d);
			return d;
		});
	const leagueGroups = fetchEndpoint<LeagueGroup[]>(fetch, platform, '/league_group');
	const nations = fetchEndpoint<Nation[]>(fetch, platform, '/nation');
	const seasons = fetchEndpoint<Season[]>(fetch, platform, '/season');

	return {
		leagueGroups,
		nations,
		seasons,
		filters: {
			availableEntities,
			availableSubjects,
			availableFilters: subjectsAndFilters[entity][subject]
		},
		params,
		data
	};
};

const parameterFromList = (value: string | null, list: string[]) => {
	if (!value) {
		return list[0];
	}

	if (!list.includes(value)) {
		return list[0];
	}

	return encodeURIComponent(value);
};
