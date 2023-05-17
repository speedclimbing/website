<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let columnNames: string[] = [];
	export let tableObjects: (string | number | TableCellComponent)[][];
	export let tableClasses = '';
	export let tableHeadClasses = '';
	export let tableRowClasses = '';
	export let tableCellClasses = 'px-6 py-4 whitespace-nowrap font-medium';
	export let divider = true;

	type TableCellComponent = {
		type: string;
		classes: string;
		value: string | number;
	};
</script>

<Table noborder divClass="relative overflow-x-auto {tableClasses}">
	<TableHead class="text-black/40 dark:text-white bg-grey/5 dark:bg-dark-grey {tableHeadClasses}">
		{#each columnNames as heading}
			<TableHeadCell>{heading.toUpperCase()}</TableHeadCell>
		{/each}
	</TableHead>

	<TableBody>
		{#each tableObjects as object}
			<TableBodyRow
				class="{divider &&
					'border-t-[1px] border-grey/10 dark:border-light-grey/60'} dark:bg-grey hover:bg-gray-50 dark:hover:bg-gray-600/50 {tableRowClasses}"
				color="custom"
			>
				{#each object as value}
					<TableBodyCell tdClass={tableCellClasses}>
						{#if value instanceof Object}
							<svelte:element this={value.type} class={value.classes}>{value.value}</svelte:element>
						{:else}
							{value}
						{/if}
					</TableBodyCell>
				{/each}
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
