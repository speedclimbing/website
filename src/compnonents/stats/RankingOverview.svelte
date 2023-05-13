<script lang="ts">
	import AlternativeButton from '../shared/buttons/AlternativeButton.svelte';
	import Table from '../shared/Table.svelte';

	type Athlete = {
		rank: number;
		name: string;
		nation: string;
		competition: string;
		date: string;
		time: string;
		points: number;
	};
	const fastestAthletes = new Array(5);
	fastestAthletes.fill({
		rank: 1,
		name: 'Veddriq LEONARDO',
		nation: 'INA',
		competition: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
		date: '25.07.2023',
		time: 5.68,
		points: 4450
	});

	const getValues = (a: Athlete) => {
		return [a.rank, a.name, a.nation, a.points];
	};
</script>

<div class="py-5 flex-grow max-w-[350px]">
	<h3 class="text-yellow text-xl font-medium">World Cup Ranking</h3>
	<hr class="border-grey/10 dark:border-light-grey border-[1px] my-2" />

	<Table
		tableObjects={fastestAthletes}
		{getValues}
		tableCellClasses="px-2 py-4 whitespace-nowrap font-medium"
		divider={false}
	/>
	<AlternativeButton style="dark:!text-yellow dark:border-yellow dark:border-2 mt-5" />
</div>
