<script lang="ts">
	import type { NationPointsAndMedalsCount } from 'types/Nation';
	import { getFlagEmoji } from '../../utils/getFlagEmoji';
	import type { TableCellComponent } from '../shared/Table.svelte';
	import PaginatedTable from 'compnonents/shared/pagination/PaginatedTable.svelte';
	import Pagination from 'compnonents/shared/pagination/Pagination.svelte';

	export let data: NationPointsAndMedalsCount[];

	let page = 0;

	const getMedalComponent = (
		medal: 'gold' | 'silver' | 'bronze',
		nation: NationPointsAndMedalsCount
	) => {
		const medalClasses =
			'rounded-[50%] aspect-square h-9 flex items-center justify-center text-white';
		const medalCount = nation[medal];
		const medalColor =
			medal === 'gold' ? 'bg-yellow' : medal === 'silver' ? 'bg-light-grey' : 'bg-[#C47A49]';
		const opacity = medalCount === 0 ? 'opacity-20' : '';
		const compnonent: TableCellComponent = {
			type: 'div',
			classes: `${medalClasses} ${medalColor} ${opacity}`,
			value: medalCount
		};

		return compnonent;
	};

	const getValues = (i: number, n: NationPointsAndMedalsCount) => {
		let medalClasses =
			'rounded-[50%] aspect-square h-9 flex items-center justify-center text-white';
		const flag = {
			type: 'div',
			classes: 'text-[25px]',
			value: getFlagEmoji(n.alpha2_code)
		};

		const gold = getMedalComponent('gold', n);
		const silver = getMedalComponent('silver', n);
		const bronze = getMedalComponent('bronze', n);

		const points: TableCellComponent = {
			type: 'div',
			classes: 'text-[18px]',
			value: n.points
		};

		return [i + 1, flag, n.name, gold, silver, bronze, points];
	};
</script>

<div class="flex justify-between flex-wrap gap-5">
	<h2 class="text-3xl">Nation Medals</h2>
	<Pagination bind:page totalPages={Math.ceil(data.length / 5)} />
</div>
<hr class="border-grey/10 border-[1px] dark:border-light-grey mt-2" />

<PaginatedTable
	tableObjects={data.map((n, i) => getValues(i, n))}
	divider={false}
	tableCellClasses="px-4 py-2 whitespace-nowrap font-medium"
	tableClasses="mt-5"
	paginationUi={false}
	{page}
	pageSize={5}
/>
