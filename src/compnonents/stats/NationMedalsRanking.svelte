<script lang="ts">
	import NationMedalsTable from './NationMedalsTable.svelte';
</script>

<div
	class="bg-white dark:bg-grey px-[5vw] py-10 rounded-md dark:border-white/5 border-2 col-span-3"
>
	<div class="flex justify-between">
		<h2 class="text-3xl">Nation Medals</h2>
	</div>
	<hr class="border-grey/10 border-[1px] dark:border-light-grey mt-2" />
	<NationMedalsTable />
</div>
