import type { Competition } from 'types/Competition';
import type { Ranking } from 'types/Ranking';

export default function initializeDates(entities: Competition[] | Ranking[]) {
	entities.forEach((entity: Competition | Ranking) => {
		if ('from' in entity && 'to' in entity) {
			entity.from = new Date(entity.from);
			entity.to = new Date(entity.to);
		} else if ('competition_date' in entity) {
			entity.competition_date = new Date(entity.competition_date);
		}
	});
}
