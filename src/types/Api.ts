import type { Competition } from './Competition';
import type { Ranking } from './Ranking';

export type HomePageData = {
	male_worldranking: Ranking[];
	female_worldranking: Ranking[];
	latest_competitions: Competition[];
};
