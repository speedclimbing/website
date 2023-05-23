import type { ServerLoad } from '@sveltejs/kit';
import type { HomePageData } from 'types/Api';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint } from 'utils/api';
import { MEDIA_URL } from 'utils/constants';

export const load: ServerLoad = async ({ fetch, platform }) => {
	const data = fetchEndpoint<HomePageData>(fetch, platform, '/home').then((data) => {
		data.latest_competitions = data.latest_competitions.splice(0, 4);
		initializeDates(data.male_worldranking);
		initializeDates(data.female_worldranking);
		initializeDates(data.latest_competitions);
		return data;
	});
	const heroImages = fetch(`${MEDIA_URL}/image/hero/metadata.json`)
		.then((r) => r.json() as Promise<string[][]>)
		.then((array) => {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			return array;
		});

	return { data, heroImages };
};
