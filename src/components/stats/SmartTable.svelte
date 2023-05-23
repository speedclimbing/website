<script lang="ts">
	import type { TableCellComponent } from 'components/shared/Table.svelte';
	import PaginatedTable from 'components/shared/pagination/PaginatedTable.svelte';
	import type { AthleteResult } from 'types/Athlete';
	import { formatName } from 'utils/formatName';
	import { getFlagEmoji } from 'utils/getFlagEmoji';

	export let data: Record<string, string | number | Date>[];
	export let header: boolean = true;
	export let tableCellClasses: string = 'px-2 py-4 whitespace-nowrap font-medium';
	export let columns: string[] | undefined = undefined;
	export let paginationUi: boolean = true;
	export let pageSize: number = 10;
	export let page: number = 0;

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

	const availableColumnNames: Record<string, string> = {
		first_name: 'full name',
		nation_code_ioc: 'nation',
		alpha2_code: 'flag',
		time: 'time',
		competition_date: 'date',
		competition_name: 'competition',
		name: 'name',
		final_entry_time: 'time',
		from: 'date',
		points: 'points',
		avg_rank: 'average rank',
		gold: 'gold',
		silver: 'silver',
		bronze: 'bronze'
	};

	const propertyToString = (entity: Record<string, string | number | Date>, property: string) => {
		switch (property) {
			case 'first_name': {
				const athlete = entity as AthleteResult;
				return formatName(athlete);
			}
			case 'nation_code_ioc': {
				return entity[property] as string;
			}
			case 'alpha2_code': {
				return getFlagEmoji(entity[property] as string);
			}
			case 'time': {
				return (parseInt(entity[property] as string) / 1000).toFixed(3);
			}
			case 'competition_date': {
				return new Date(entity[property]).toLocaleDateString();
			}
			case 'competition_name': {
				return entity[property] as string;
			}
			case 'name': {
				return entity[property] as string;
			}
			case 'final_entry_time': {
				return (parseInt(entity[property] as string) / 1000).toFixed(3);
			}
			case 'from': {
				return new Date(entity[property]).toLocaleDateString();
			}
			case 'points': {
				return entity[property].toString();
			}
			case 'avg_rank': {
				return Number(entity[property]).toFixed(2);
			}
			case 'gold':
			case 'silver':
			case 'bronze': {
				return getMedalComponent(property, entity[property] as string);
			}
			default: {
				return undefined;
			}
		}
	};

	let normalizedData: (string | TableCellComponent)[][] = [];
	let columnNames: string[] = [];

	$: if (data.length > 0 && header) {
		columnNames = [
			'rank',
			...Object.keys(data[0])
				.map((e) => {
					return availableColumnNames[e];
				})
				.filter((e) => e)
		];
	} else {
		columnNames = [];
	}

	$: normalizedData = data.map((e, i) => {
		let res: (string | TableCellComponent)[] = [(i + 1).toString()];
		for (const key of Object.keys(e)) {
			if (columns && !columns.includes(key)) continue;
			const val = propertyToString(e, key);
			if (val) res.push(val);
		}

		return res;
	});
</script>

<PaginatedTable
	bind:page
	tableObjects={normalizedData}
	{paginationUi}
	{pageSize}
	{tableCellClasses}
	{columnNames}
/>
