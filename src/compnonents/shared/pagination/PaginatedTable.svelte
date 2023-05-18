<script lang="ts">
	import Table from '../Table.svelte';
	import type { TableCellComponent } from '../Table.svelte';
	import Pagination from './Pagination.svelte';

	export let columnNames: string[] = [];
	export let tableObjects: (string | number | TableCellComponent)[][];
	export let tableClasses = '';
	export let tableHeadClasses = '';
	export let tableRowClasses = '';
	export let tableCellClasses = 'px-6 py-4 whitespace-nowrap font-medium';
	export let divider = true;

	export let page = 0;
	export let pageSize: number = 5;
	export let paginationUi = true;

	const totalPages = Math.ceil(tableObjects.length / pageSize);
</script>

{#if paginationUi}
	<Pagination bind:page {totalPages} />
{/if}
<Table
	{columnNames}
	tableObjects={tableObjects.slice(pageSize * page, pageSize * (page + 1))}
	{tableClasses}
	{tableHeadClasses}
	{tableRowClasses}
	{tableCellClasses}
	{divider}
/>
{#if paginationUi}
	<Pagination bind:page {totalPages} />
{/if}
