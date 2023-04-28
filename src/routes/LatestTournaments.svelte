<script lang="ts">
	import { Select } from 'flowbite-svelte';
	import Line from '../compnonents/shared/Line.svelte';
	import EventCard from '../compnonents/home/EventCard.svelte';
	import PrimaryButton from '../compnonents/shared/PrimaryButton.svelte';
	import type { Competition } from 'src/types/Competition';
	import { goto } from '$app/navigation';

	export let competitions: Competition[];

	let selected: string;
	let countries = [
		{ value: 'us', name: 'United States' },
		{ value: 'ca', name: 'Canada' },
		{ value: 'fr', name: 'France' }
	];
</script>

<section id="latest-tournaments" class="py-[100px]">
	<h2 class="text-4xl font-bold text-center">Latest Competitions</h2>
	<Line style="mx-auto" />
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
		{#each competitions as competition, index (index)}
			<EventCard {competition} />
		{/each}
	</div>

	<PrimaryButton
		text="View all Competitions"
		onClick={() => goto('/competition')}
		style="mx-auto block"
	/>
</section>
