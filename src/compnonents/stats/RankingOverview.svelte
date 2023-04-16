<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import AlternativeButton from '../shared/AlternativeButton.svelte';
</script>

<div class="py-5 flex-grow max-w-[400px]">
	<h3 class="text-yellow text-xl font-medium">World Cup Ranking</h3>
	<hr class="border-grey/10 dark:border-light-grey border-[1px] my-2" />
	<Table noborder divClass="relative overflow-x-auto my-5">
		<TableBody>
			{#each new Array(5) as n, i}
				<TableBodyRow color="custom">
					<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap font-medium">{i + 1}</TableBodyCell>
					<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap font-medium"
						>Veddriq LEONARDO</TableBodyCell
					>
					<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap font-medium">INA</TableBodyCell>
					<TableBodyCell tdClass="px-6 py-2 whitespace-nowrap font-medium">4450</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	<AlternativeButton />
</div>
