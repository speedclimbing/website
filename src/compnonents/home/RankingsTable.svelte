<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { Ranking } from 'src/types/Ranking';

	export let worldRankingsFemale: Ranking[];
	export let worldRankingsMale: Ranking[];
	export let male: boolean = true;

	function capitalize(word: string): string {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
</script>

<Table hoverable={true}>
	<TableHead class="text-black/25">
		<TableHeadCell>Rank</TableHeadCell>
		<TableHeadCell>Full Name</TableHeadCell>
		<TableHeadCell>Country</TableHeadCell>
		<TableHeadCell>Date</TableHeadCell>
		<TableHeadCell>Time</TableHeadCell>
	</TableHead>

	<TableBody>
		{#each male ? worldRankingsMale : worldRankingsFemale as ranking, index (index)}
			<TableBodyRow class="border-t-[1px]">
				<TableBodyCell>{index + 1}</TableBodyCell>
				<TableBodyCell
					>{ranking.last_name.toUpperCase()} {capitalize(ranking.first_name)}</TableBodyCell
				>
				<TableBodyCell>{ranking.nation_code}</TableBodyCell>
				<TableBodyCell
					>{ranking.date.toLocaleDateString('de-DE', {
						year: 'numeric',
						month: 'long',
						day: '2-digit'
					})}</TableBodyCell
				>
				<TableBodyCell>{(ranking.time / 1000).toFixed(3)}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
