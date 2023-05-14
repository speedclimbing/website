import type { ServerLoad } from '@sveltejs/kit';
import type { HomePageData } from 'types/Api';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint } from 'utils/api';
import { MEDIA_URL } from 'utils/constants';

export const load: ServerLoad = async ({ fetch, platform }) => {
	const dataPromise = fetchEndpoint<HomePageData>(fetch, platform, '/home');
	const heroImagesPromise = fetch(`${MEDIA_URL}/image/hero/metadata.json`).then(
		(r) => r.json() as Promise<string[][]>
	);

	const [data, heroImages] = await Promise.all([dataPromise, heroImagesPromise]);

	initializeDates(data.male_worldranking);
	initializeDates(data.female_worldranking);
	initializeDates(data.latest_competitions);

	return { data, heroImages };
};
