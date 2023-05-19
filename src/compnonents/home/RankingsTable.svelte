<script lang="ts">
	import type { AthleteTimeResult } from 'types/Athlete';
	import Table from '../shared/Table.svelte';
	import type { Gender } from 'types/Gender';
	import { formatName } from 'utils/formatName';

	export let worldRankingsFemale: AthleteTimeResult[];
	export let worldRankingsMale: AthleteTimeResult[];
	export let gender: Gender = 'Male';

	const getValues = (r: AthleteTimeResult, i: number) => [
		i + 1,
		formatName(r),
		r.nation_code_ioc,
		(r.time / 1000).toFixed(3),
		r.competition_date.toLocaleDateString('de-DE', {
			year: 'numeric',
			month: 'long',
			day: '2-digit'
		})
	];
</script>

<Table
	tableObjects={gender === 'Male'
		? worldRankingsMale.map((r, i) => getValues(r, i))
		: worldRankingsFemale.map((r, i) => getValues(r, i))}
	columnNames={['rank', 'Full name', 'Nation', 'Time', 'Date']}
	tableHeadClasses="dark:!bg-gray-700"
	tableRowClasses="dark:!bg-dark-grey dark:hover:!bg-grey/25"
/>
