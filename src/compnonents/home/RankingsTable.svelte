<script lang="ts">
	import type { Ranking } from 'types/Ranking';
	import Table from '../shared/Table.svelte';
	import type { Gender } from 'types/Gender';

	export let worldRankingsFemale: Ranking[];
	export let worldRankingsMale: Ranking[];
	export let gender: Gender = 'Male';

	function capitalize(word: string): string {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	const getValues = (r: Ranking) => [
		r.rank,
		r.last_name.toUpperCase() + ' ' + capitalize(r.first_name),
		r.nation_code,
		r.competition_date.toLocaleDateString('de-DE', {
			year: 'numeric',
			month: 'long',
			day: '2-digit'
		}),
		(r.time / 1000).toFixed(3)
	];
</script>

<Table
	tableObjects={gender === 'Male'
		? worldRankingsMale.map((r) => getValues(r))
		: worldRankingsFemale.map((r) => getValues(r))}
	columnNames={['rank', 'Full name', 'Nation', 'date', 'Time']}
	tableHeadClasses="dark:!bg-gray-700"
	tableRowClasses="dark:!bg-dark-grey dark:hover:!bg-grey/25"
/>
