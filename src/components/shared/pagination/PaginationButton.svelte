<script lang="ts">
	import { ChevronRight, ChevronLeft } from 'svelte-heros-v2';
	export let page: number;
	export let totalPages: number;
</script>

<div
	class="bg-grey/5 dark:bg-dark-grey text-black dark:text-white rounded-md p-1 flex align-middle gap-1"
>
	<button
		on:click={() => {
			page--;
		}}
		class="p-1 disabled:opacity-50"
		disabled={page === 0}
	>
		<ChevronLeft />
	</button>
	<button
		on:click={() => {
			page++;
		}}
		class="p-1 disabled:opacity-50"
		disabled={page + 1 >= totalPages}
	>
		<ChevronRight />
	</button>
</div>
