export type Competition = {
	name: string;
	location: string | null;
	from: Date;
	to: Date;
	nation_code: string | null;
	league_id: string;
};

export type CompetitionFinalEntryTime = {
	id: string;
	name: string;
	location?: string;
	from: Date;
	to: Date;
	nation_code_ioc: string;
	nation_code_alpha2: string;
	league_id: string;
	final_entry_time: number;
};
