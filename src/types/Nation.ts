export type Nation = {
	id: string;
	name: string;
	code: string;
};

export type NationPointsAndMedalsCount = {
	ioc_code: string;
	alpha2_code: string;
	name: string;
	gold: number;
	silver: number;
	bronze: number;
	points: number;
};
