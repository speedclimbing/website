<script lang="ts">
	import { Spinner } from 'flowbite-svelte';
	import type { Competition } from 'src/types/Competition';
	import EventCard from '../home/EventCard.svelte';

	export let viewCalendar: boolean;
	export let competitions: Competition[] | Promise<Competition[]>;
</script>

{#await competitions}
	<div class="flex justify-center items-center my-10">
		<Spinner />
	</div>
{:then comps}
	{#if comps.length === 0}
		<div class="flex justify-center items-center my-10">
			<p class="text-2xl font-semibold">No competitions found</p>
		</div>
	{:else if !viewCalendar}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
			{#each comps as competition, index (index)}
				<EventCard {competition} />
			{/each}
		</div>
	{/if}
{:catch error}
	<div class="flex justify-center items-center my-10">
		<p class="text-2xl font-semibold">Error: {error.message}</p>
	</div>
{/await}
