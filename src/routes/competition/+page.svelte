<script lang="ts">
	import type { Competition } from 'types/Competition';
	import type { PageData } from './$types';
	import { mounted } from 'utils/mounted';
	import { browser } from '$app/environment';
	import { updateSearchParams } from 'utils/updateSearchParams';
	import FilterBar from './FilterBar.svelte';
	import CompetitionCalendar from 'compnonents/competitions/CompetitionCalendar.svelte';
	import EventCard from 'compnonents/home/EventCard.svelte';
	import { Spinner } from 'flowbite-svelte';
	import { navigating } from '$app/stores';

	export let data: PageData;
	let { year, name, nation, league_group } = data.params;
	let viewCalendar: boolean = false;
	let calendarDate: Date | undefined = undefined;

	const isMounted = () => $mounted;
	const handleSearch = async (year: number, name: string, nation: string, league_group: string) => {
		updateSearchParams({ year, name, nation, league_group });
	};

	$: {
		if (!browser || !isMounted()) break $;
		handleSearch(year, name, nation, league_group);
	}

	$: {
		if (!browser || !isMounted()) break $;

		const currentDate = new Date();
		if (!calendarDate && year === currentDate.getFullYear()) {
			calendarDate = currentDate;
		}

		if (calendarDate && year !== calendarDate.getFullYear()) {
			year = calendarDate.getFullYear();
		}
	}
</script>

<FilterBar
	bind:year
	bind:name
	bind:nation
	bind:league_group
	bind:viewCalendar
	seasons={data.seasons}
	league_groups={data.league_groups}
	nations={data.nations}
/>
<section id="competitions">
	{#if $navigating}
		<div class="flex justify-center items-center my-10">
			<Spinner />
		</div>
	{:else if data.competitions.length === 0}
		<div class="flex justify-center items-center my-10">
			<p class="text-2xl font-semibold">No competitions found</p>
		</div>
	{:else if !viewCalendar}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
			{#each data.competitions as competition, index (index)}
				<EventCard {competition} />
			{/each}
		</div>
	{:else if viewCalendar}
		<CompetitionCalendar competitions={data.competitions} bind:date={calendarDate} />
	{/if}
</section>
