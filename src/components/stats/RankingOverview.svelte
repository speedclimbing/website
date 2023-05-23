<script lang="ts">
	import AlternativeButton from '../shared/buttons/AlternativeButton.svelte';
	import SmartTable from './SmartTable.svelte';

	export let label: string;
	export let subject: string;
	export let gender: string;
	export let data: Record<string, string | number | Date>[];
	export let columns: string[] | undefined = undefined;
</script>

<div class="py-5 flex-grow max-w-full">
	<h3 class="text-yellow text-xl font-medium">{label}</h3>
	<hr class="border-grey/10 dark:border-light-grey border-[1px] my-2" />

	<SmartTable
		{data}
		header={false}
		{columns}
		tableCellClasses="px-2 py-4 whitespace-nowrap font-medium"
	/>

	<AlternativeButton
		href={`/stats/detail?gender=${gender}&entity=athlete&subject=${subject}`}
		style="dark:!text-yellow dark:border-yellow dark:border-2 mt-5"
	/>
</div>
