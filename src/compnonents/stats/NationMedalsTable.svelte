<script lang="ts">
	import type { NationPointsAndMedalsCount } from 'types/Nation';
	import { getFlagEmoji } from '../../utils/getFlagEmoji';
	import Table, { type TableCellComponent } from '../shared/Table.svelte';

	export let data: NationPointsAndMedalsCount[];

	const getValues = (i: number, n: NationPointsAndMedalsCount) => {
		let medalClasses =
			'rounded-[50%] aspect-square h-9 flex items-center justify-center text-white';
		const flag = {
			type: 'div',
			classes: 'text-[25px]',
			value: getFlagEmoji(n.alpha2_code)
		};

		const gold: TableCellComponent = {
			type: 'div',
			classes: `${medalClasses} bg-yellow`,
			value: n.gold
		};

		const silver: TableCellComponent = {
			type: 'div',
			classes: `${medalClasses} bg-light-grey`,
			value: n.gold
		};

		const bronze: TableCellComponent = {
			type: 'div',
			classes: `${medalClasses} bg-[#C47A49]`,
			value: n.gold
		};

		const points: TableCellComponent = {
			type: 'div',
			classes: 'text-[18px]',
			value: n.points
		};

		return [i + 1, flag, n.name, gold, silver, bronze, points];
	};
</script>

<Table
	tableObjects={data.map((n, i) => getValues(i, n))}
	divider={false}
	tableCellClasses="px-4 py-2 whitespace-nowrap font-medium"
	tableClasses="mt-5"
/>
