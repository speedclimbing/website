<script lang="ts">
	import type { NationMedalsCount } from 'types/Medals';
	import NationMedalsTable from './NationMedalsTable.svelte';
	import PaginationButton from './PaginationButton.svelte';

	export let data: NationMedalsCount[];
</script>

<div
	class="bg-white dark:bg-grey px-[5vw] py-10 rounded-md dark:border-white/5 border-2 xl:col-span-6 col-span-10"
>
	<div class="flex justify-between flex-wrap gap-5">
		<h2 class="text-3xl">Nation Medals</h2>
		<div class="flex gap-5 shrink-0">
			<p class="self-center">Page <strong>1</strong> of <strong>10</strong></p>
			<PaginationButton />
		</div>
	</div>
	<hr class="border-grey/10 border-[1px] dark:border-light-grey mt-2" />
	<NationMedalsTable {data} />
</div>
