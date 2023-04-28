import type { ServerLoad } from '@sveltejs/kit';
import type { HomePageData } from 'types/Api';
import type { Ranking } from 'types/Ranking';
import type { SeasonSummaryResponse } from 'types/SeasonSummary';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint } from 'utils/api';
import { API_URL } from 'utils/constants';

export const load: ServerLoad = async ({ fetch, platform }) => {
	const data: SeasonSummaryResponse = await fetchEndpoint(
		fetch,
		platform,
		'/stats/summary/season/2022'
	);

	return data;
};
