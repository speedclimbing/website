<script lang="ts">
	import AlternativeButton from '../shared/buttons/AlternativeButton.svelte';
	import Table from '../shared/Table.svelte';

	export let label: string;
	export let data: string[][];
</script>

<div class="py-5 flex-grow max-w-full">
	<h3 class="text-yellow text-xl font-medium">{label}</h3>
	<hr class="border-grey/10 dark:border-light-grey border-[1px] my-2" />

	<Table
		tableObjects={data}
		tableCellClasses="px-2 py-4 whitespace-nowrap font-medium"
		divider={false}
	/>
	<AlternativeButton style="dark:!text-yellow dark:border-yellow dark:border-2 mt-5" />
</div>
