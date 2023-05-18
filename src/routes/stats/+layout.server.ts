import type { ServerLoad } from '@sveltejs/kit';
import type { Season } from 'types/Season';
import { fetchEndpoint } from 'utils/api';

export const load: ServerLoad = async ({ fetch, platform }) => {
	const seasons = fetchEndpoint<Season[]>(fetch, platform, '/season');

	return {
		seasons
	};
};
