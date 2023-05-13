<script lang="ts">
	import Table from '../shared/Table.svelte';

	type Athlete = {
		rank: number;
		name: string;
		nation: string;
		competition: string;
		date: string;
		time: string;
	};
	const fastestAthletes = new Array(10);
	fastestAthletes.fill({
		rank: 1,
		name: 'Veddriq LEONARDO',
		nation: 'INA',
		competition: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
		date: '25.07.2023',
		time: 5.68
	});

	const getValues = (a: Athlete) => {
		return [a.rank, a.name, a.nation, a.competition, a.date, a.time];
	};
</script>

<Table
	tableObjects={fastestAthletes}
	{getValues}
	tableHeadings={['Rank', 'Full name', 'Nation', 'Competition', 'Date', 'Time']}
/>
