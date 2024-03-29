export type Nation = {
	id: string;
	name: string;
	code_ioc: string;
	code_alpha2: string;
	continent: 'Africa' | 'Asia' | 'Europe' | 'Oceania' | 'PanAmerica';
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
