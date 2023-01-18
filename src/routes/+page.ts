import type { Load } from '@sveltejs/kit';
import type { HomePageData } from 'src/types/Api';
import type { Competition } from 'src/types/Competition';
import type { Ranking } from 'src/types/Ranking';

export const load: Load = async ({ fetch }) => {
	const response = await fetch('https://api.speedclimbing.org/v1/home');
	const data: HomePageData = await response.json();

	data.male_worldranking.forEach((ranking: Ranking) => {
		ranking.date = new Date(ranking.date);
	});

	data.female_worldranking.forEach((ranking: Ranking) => {
		ranking.date = new Date(ranking.date);
	});

	data.latest_competitions.forEach((competition: Competition) => {
		competition.from = new Date(competition.from);
		competition.to = new Date(competition.to);
	});

	return data;
};
