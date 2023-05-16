<script lang="ts">
	import { getFlagEmoji } from '../../utils/getFlagEmoji';
	import Table from '../shared/Table.svelte';

	type Nation = {
		rank: number;
		code: string;
		name: string;
		gold: number;
		silver: number;
		bronze: number;
	};

	type TableCellComponent = {
		type: string;
		classes: string;
		value: string | number;
	};

	const nations = new Array(5);
	nations.fill({
		rank: 1,
		code: 'de',
		name: 'Germany',
		gold: 10,
		silver: 12,
		bronze: 7
	});

	const getValues = (n: Nation) => {
		let medalClasses =
			'rounded-[50%] aspect-square h-9 flex items-center justify-center text-white';
		const flag = {
			type: 'div',
			classes: 'text-[25px]',
			value: getFlagEmoji(n.code)
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

		const total: TableCellComponent = {
			type: 'div',
			classes: 'text-[18px]',
			value: n.gold + n.silver + n.bronze
		};

		return [n.rank, flag, n.name, gold, silver, bronze, total];
	};
</script>

<Table
	tableObjects={nations.map((n) => getValues(n))}
	divider={false}
	tableCellClasses="px-4 py-2 whitespace-nowrap font-medium"
	tableClasses="mt-5"
/>
