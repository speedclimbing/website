<script lang="ts">
	import type { NationPointsAndMedalsCount } from 'types/Nation';
	import Pagination from 'components/shared/pagination/Pagination.svelte';
	import SmartTable from './SmartTable.svelte';

	export let data: NationPointsAndMedalsCount[];

	let page = 0;
</script>

<div class="flex justify-between flex-wrap gap-5">
	<h2 class="text-3xl">Nation Medals</h2>
	<Pagination bind:page totalPages={Math.ceil(data.length / 5)} />
</div>
<hr class="border-grey/10 border-[1px] dark:border-light-grey mt-2" />

<SmartTable
	{data}
	bind:page
	header={false}
	paginationUi={false}
	pageSize={5}
	tableCellClasses="px-4 py-2 whitespace-nowrap font-medium"
/>
