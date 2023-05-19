import type { Gender } from './Gender';

export type Athlete = {
	id: string;
	first_name: string;
	last_name: string;
	gender: Gender;
	nation_code_ioc: string;
	personal_best?: number;
};

export type AthleteResult = {
	id: string;
	first_name: string;
	last_name: string;
	nation_code_ioc: string;
	nation_code_alpha2: string;
};

export type AthleteTimeResult = AthleteResult & {
	time: number;
	competition_name: string;
	competition_date: Date;
	competition_id: string;
};

export type AthletePointsResult = AthleteResult & {
	points: number;
	competition_count: number;
};

export type AthleteAvgRankResult = AthleteResult & {
	avg_rank: number;
	max_rank: number;
	competition_count: number;
};
