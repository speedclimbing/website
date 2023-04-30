<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import AlternativeButton from '../shared/AlternativeButton.svelte';

	export let label: string;
	export let rows: string[][];
</script>

<div class="py-5 flex-grow">
	<h3 class="text-yellow text-xl font-medium">{label}</h3>
	<hr class="border-grey/10 dark:border-light-grey border-[1px] my-2" />
	<Table noborder divClass="relative overflow-x-auto mt-5 mb-8">
		<TableBody>
			{#each rows as row, i}
				<TableBodyRow color="custom">
					<TableBodyCell tdClass="px-2 py-4 whitespace-nowrap font-medium ">{i + 1}</TableBodyCell>
					{#each row as col}
						<TableBodyCell tdClass="px-2 py-4 whitespace-nowrap font-medium ">{col}</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	<AlternativeButton style="dark:text-yellow dark:border-yellow dark:border-2 " />
</div>
