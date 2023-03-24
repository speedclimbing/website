import type { Load } from '@sveltejs/kit';
import type { HomePageData } from 'src/types/Api';
import type { Ranking } from 'src/types/Ranking';
import initializeDates from 'src/utils/InitializeDates';

export const load: Load = async ({ fetch }) => {
	const response = await fetch('https://api.speedclimbing.org/v1/home');
	const data: HomePageData = await response.json();

	data.male_worldranking.forEach((ranking: Ranking) => {
		ranking.date = new Date(ranking.date);
	});

	data.female_worldranking.forEach((ranking: Ranking) => {
		ranking.date = new Date(ranking.date);
	});

	initializeDates(data.latest_competitions);

	return data;
};
