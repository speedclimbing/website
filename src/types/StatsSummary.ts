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

export type AllTimeSummary = {
	ranking_athlete_time: AthleteTimeResult[];
	ranking_nation_points_and_medals: NationPointsAndMedalsCount[];
	ranking_competition_fet: CompetitionFinalEntryTime[];
	history_world_record: AthleteTimeResult[];
	history_competition_fet: CompetitionFinalEntryTime[];
};
