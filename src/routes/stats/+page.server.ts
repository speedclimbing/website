import type { ServerLoad } from '@sveltejs/kit';
import type { Competition } from 'types/Competition';
import type { SeasonSummaryResponse } from 'types/SeasonSummary';
import initializeDates from 'utils/InitializeDates';
import { fetchEndpoint } from 'utils/api';

export const load: ServerLoad = async ({ fetch, platform }) => {
	const [SeasonSummary, upcomingCompetitions] = await Promise.all([
		fetchEndpoint<SeasonSummaryResponse>(
			fetch,
			platform,
			`/stats/summary/season/${new Date().getFullYear()}`
		),
		fetchEndpoint<Competition[]>(fetch, platform, '/competition', {
			from: new Date().toISOString().substring(0, 10)
		})
	]);

	initializeDates(upcomingCompetitions);

	return {
		SeasonSummary,
		upcomingCompetitions
	};
};
