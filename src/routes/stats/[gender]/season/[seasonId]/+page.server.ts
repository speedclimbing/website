import type { ServerLoad } from '@sveltejs/kit';
import type { Competition } from 'types/Competition';
import type { SeasonSummary } from 'types/SeasonSummary';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint } from 'utils/api';

export const load: ServerLoad = async ({ fetch, platform, params }) => {
	const [seasonSummary, upcomingCompetitions] = await Promise.all([
		fetchEndpoint<SeasonSummary>(
			fetch,
			platform,
			`/stats/summary/season/${params.gender}/${params.seasonId}`
		),
		fetchEndpoint<Competition[]>(fetch, platform, '/competition', {
			from: new Date().toISOString().substring(0, 10)
		})
	]);

	initializeDates(upcomingCompetitions);

	return {
		seasonSummary,
		upcomingCompetitions: upcomingCompetitions.splice(0, 2)
	};
};
