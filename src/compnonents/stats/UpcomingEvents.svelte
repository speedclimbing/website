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

<div class="bg-grey px-[5vw] py-10 rounded-md border-white/5 border-2 col-span-1">
	<div class="flex justify-between mb-5">
		<h2 class="text-3xl">Upcoming Events</h2>
		<AlternativeButton />
	</div>
	<div class="flex flex-col gap-2">
		<EventCard competition={competitions[0]} />
		<EventCard competition={competitions[1]} />
	</div>
</div>
