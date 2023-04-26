import type { ServerLoad } from '@sveltejs/kit';
import type { HomePageData } from 'types/Api';
import type { Ranking } from 'types/Ranking';
import initializeDates from 'utils/InitializeDates';
import { API_URL } from 'utils/constants';

export const load: ServerLoad = async ({ fetch }) => {
	const response = await fetch(`${API_URL}/home`);
	const data: HomePageData = await response.json();

	initializeDates(data.male_worldranking);
	initializeDates(data.female_worldranking);
	initializeDates(data.latest_competitions);

	return data;
};
