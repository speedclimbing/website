<script lang="ts">
	import Table from '../shared/Table.svelte';

	type Competition = {
		rank: number;
		name: string;
		datum: string;
		fet: number;
	};

	const competitions = new Array(10);
	competitions.fill({
		rank: 1,
		name: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
		datum: '25.07.2023',
		fet: 5.68
	});

	const getValues = (c: Competition) => [c.rank, c.name, c.datum, c.fet];
</script>

<Table
	tableObjects={competitions}
	{getValues}
	tableHeadings={['rank', 'competition', 'date', 'Fet']}
/>
