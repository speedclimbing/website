<script lang="ts">
	import type { Competition } from '../../types/Competition';
	import EventCard from '../home/EventCard.svelte';
	import AlternativeButton from '../shared/AlternativeButton.svelte';

	const competitions: Competition[] = [
		{
			name: 'Next Event',
			location: 'Barcelona',
			from: new Date(),
			to: new Date(),
			nation_code: 'ESP',
			league_id: 'abcdefg'
		},
		{
			name: 'Next Event',
			location: 'Barcelona',
			from: new Date(),
			to: new Date(),
			nation_code: 'ESP',
			league_id: 'abcdefg'
		},
		{
			name: 'Next Event',
			location: 'Barcelona',
			from: new Date(),
			to: new Date(),
			nation_code: 'ESP',
			league_id: 'abcdefg'
		}
	];
</script>

<div
	class="bg-white dark:bg-grey px-[5vw] py-10 rounded-md dark:border-white/5 border-2 xl:col-span-4 col-span-10"
>
	<div class="flex justify-between flex-wrap gap-5 mb-5">
		<h2 class="text-3xl">Upcoming</h2>
		<AlternativeButton
			style="dark:bg-red dark:border-red bg-red border-red !text-white shrink-0"
			text="All competitons"
		/>
	</div>
	<div class="flex flex-col gap-2">
		<EventCard competition={competitions[0]} />
		<EventCard competition={competitions[1]} />
	</div>
</div>
