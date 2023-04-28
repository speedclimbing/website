import type { AthleteAvgRankResult, AthletePointsResult, AthleteTimeResult } from './Athlete';
import type { CompetitionFinalEntryTime } from './Competition';
import type { NationPointsAndMedalsCount } from './Nation';

export type SeasonSummary = {
	ranking_athlete_time: AthleteTimeResult[];
	ranking_athlete_points: AthletePointsResult[];
	ranking_athlete_avg_rank: AthleteAvgRankResult[];
	ranking_nation_points_and_medals: NationPointsAndMedalsCount[];
	ranking_competition_fet: CompetitionFinalEntryTime[];
};

export type SeasonSummaryResponse = {
	male: SeasonSummary;
	female: SeasonSummary;
};
