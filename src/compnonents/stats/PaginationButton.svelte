<script lang="ts">
	import { ChevronRight, ChevronLeft } from 'svelte-heros-v2';
	export let page = 0;
	export let totalPages = 1;
	export let onClickLeft: () => void = () => {
		page--;
	};
	export let onCickRight: () => void = () => {
		page++;
	};
</script>

<div
	class="bg-grey/5 dark:bg-dark-grey text-black dark:text-white rounded-md p-1 flex align-middle gap-1"
>
	<button on:click={onClickLeft} class="p-1" disabled={page === 0}>
		<ChevronLeft />
	</button>
	<button on:click={onCickRight} class="p-1" disabled={page + 1 >= totalPages}>
		<ChevronRight />
	</button>
</div>
