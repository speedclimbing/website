<script lang="ts">
	import type { TableCellComponent } from 'components/shared/Table.svelte';
	import PaginatedTable from 'components/shared/pagination/PaginatedTable.svelte';
	import type { AthleteResult } from 'types/Athlete';
	import type { NationPointsAndMedalsCount } from 'types/Nation';
	import { formatName } from 'utils/formatName';
	import { getFlagEmoji } from 'utils/getFlagEmoji';

	export let data: Record<string, string>[];

	const getMedalComponent = (medal: 'gold' | 'silver' | 'bronze', medalCount: string) => {
		const medalClasses =
			'rounded-[50%] aspect-square h-9 flex items-center justify-center text-white';
		const medalColor =
			medal === 'gold' ? 'bg-yellow' : medal === 'silver' ? 'bg-light-grey' : 'bg-[#C47A49]';
		const opacity = Number(medalCount) === 0 ? 'opacity-20' : '';
		const compnonent: TableCellComponent = {
			type: 'div',
			classes: `${medalClasses} ${medalColor} ${opacity}`,
			value: medalCount
		};

		return compnonent;
	};

	const propertyToString = (entity: Record<string, string>, property: string) => {
		switch (property) {
			case 'first_name': {
				const athlete = entity as AthleteResult;
				return { value: formatName(athlete), col_name: 'full name' };
			}
			case 'nation_code_ioc': {
				return { value: entity[property], col_name: 'nation' };
			}
			case 'alpha2_code': {
				return { value: getFlagEmoji(entity[property]), col_name: 'flag' };
			}
			case 'time': {
				return { value: (parseInt(entity[property]) / 1000).toFixed(3), col_name: 'time' };
			}
			case 'competition_date': {
				return { value: new Date(entity[property]).toLocaleDateString(), col_name: 'date' };
			}
			case 'competition_name': {
				return { value: entity[property], col_name: 'competition' };
			}
			case 'name': {
				return { value: entity[property], col_name: 'name' };
			}
			case 'final_entry_time': {
				return { value: (parseInt(entity[property]) / 1000).toFixed(3), col_name: 'time' };
			}
			case 'from': {
				return { value: new Date(entity[property]).toLocaleDateString(), col_name: 'date' };
			}
			case 'points': {
				return { value: entity[property], col_name: 'points' };
			}
			case 'avg_rank': {
				return { value: Number(entity[property]).toFixed(2), col_name: 'avg_rank' };
			}
			case 'gold':
			case 'silver':
			case 'bronze': {
				return { value: getMedalComponent(property, entity[property]), col_name: property };
			}
			default: {
				return undefined;
			}
		}
	};

	let normalizedData: { value: string | TableCellComponent; col_name: string }[][] = [];

	$: normalizedData = data.map((e, i) => {
		let res: { value: string | TableCellComponent; col_name: string }[] = [
			{ value: (i + 1).toString(), col_name: 'rank' }
		];
		for (const key of Object.keys(e)) {
			const val = propertyToString(e, key);
			if (val) res.push(val);
		}

		return res;
	});
</script>

<PaginatedTable
	tableObjects={normalizedData.map((e) => e.map((e) => e.value))}
	columnNames={normalizedData[0]?.map((e) => e.col_name)}
	pageSize={10}
/>
