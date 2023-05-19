import type { AthleteTimeResult } from './Athlete';
import type { Competition } from './Competition';

export type HomePageData = {
	male_worldranking: AthleteTimeResult[];
	female_worldranking: AthleteTimeResult[];
	latest_competitions: Competition[];
};
