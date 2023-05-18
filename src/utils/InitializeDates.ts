import type { AthleteTimeResult } from 'types/Athlete';
import type { Competition, CompetitionFinalEntryTime } from 'types/Competition';
import type { Ranking } from 'types/Ranking';

export default function initializeDates(
	entities: Competition[] | Ranking[] | CompetitionFinalEntryTime[] | AthleteTimeResult[]
) {
	entities.forEach(
		(entity: Competition | Ranking | CompetitionFinalEntryTime | AthleteTimeResult) => {
			if ('from' in entity && 'to' in entity) {
				entity.from = new Date(entity.from);
				entity.to = new Date(entity.to);
			} else if ('competition_date' in entity) {
				entity.competition_date = new Date(entity.competition_date);
			}
		}
	);
}
