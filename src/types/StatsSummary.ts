import type { AthleteAvgRankResult, AthletePointsResult, AthleteTimeResult } from './Athlete';
import type { CompetitionFinalEntryTime } from './Competition';
import type { NationPointsAndMedalsCount } from './Nation';

type StatsSummary = {
	ranking_athlete_time: AthleteTimeResult[];
	ranking_nation_points_and_medals: NationPointsAndMedalsCount[];
	ranking_competition_fet: CompetitionFinalEntryTime[];
};

export type SeasonSummary = StatsSummary & {
	ranking_athlete_points: AthletePointsResult[];
	ranking_athlete_avg_rank: AthleteAvgRankResult[];
};

export type AllTimeSummary = StatsSummary & {
	history_world_record: AthleteTimeResult[];
	history_competition_fet: CompetitionFinalEntryTime[];
};
