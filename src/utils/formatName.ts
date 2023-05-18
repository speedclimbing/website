import type { AthleteResult } from 'types/Athlete';

export const formatName = (athlete: AthleteResult) => {
	return `${athlete.first_name.charAt(0).toUpperCase()}${athlete.first_name.slice(
		1
	)} ${athlete.last_name.toUpperCase()}`;
};
