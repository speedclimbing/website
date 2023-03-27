import type { Gender } from './Gender';

export type Athlete = {
	id: string;
	first_name: string;
	last_name: string;
	gender: Gender;
	nation_code: string;
	personal_best?: number;
};
