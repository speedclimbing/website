import type { ServerLoad } from '@sveltejs/kit';
import type { HomePageData } from 'types/Api';
import type { Ranking } from 'types/Ranking';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint } from 'utils/api';
import { API_URL } from 'utils/constants';

export const load: ServerLoad = async ({ fetch }) => {
	const data: HomePageData = await fetchEndpoint(fetch, '/home');

	initializeDates(data.male_worldranking);
	initializeDates(data.female_worldranking);
	initializeDates(data.latest_competitions);

	return data;
};
