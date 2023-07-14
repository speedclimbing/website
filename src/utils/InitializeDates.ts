import type { AthleteAvgRankResult, AthleteTimeResult } from 'types/Athlete';
import type { Competition, CompetitionFinalEntryTime } from 'types/Competition';

export default function initializeDates(
	entities:
		| Competition[]
		| AthleteAvgRankResult[]
		| CompetitionFinalEntryTime[]
		| AthleteTimeResult[]
		| Record<string, string>[]
) {
	entities.forEach(
		(
			entity:
				| Competition
				| AthleteAvgRankResult
				| CompetitionFinalEntryTime
				| AthleteTimeResult
				| Record<string, string>
		) => {
			if ('from' in entity && 'to' in entity) {
				entity.from = new Date(entity.from);
				entity.to = new Date(entity.to);
			} else if ('competition_date' in entity) {
				entity.competition_date = new Date(entity.competition_date);
			}
		}
	);
}
