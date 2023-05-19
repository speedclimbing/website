<script lang="ts">
	import PaginationButton from './PaginationButton.svelte';

	export let page: number;
	export let totalPages = 1;
</script>

<div class="flex gap-5 shrink-0 ml-auto">
	<p class="self-center">Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong></p>
	<PaginationButton bind:page {totalPages} />
</div>
