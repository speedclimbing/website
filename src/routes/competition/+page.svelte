<script lang="ts">
	import type { Competition } from 'src/types/Competition';
	import type { PageData } from './$types';
	import { _loadCompetitions, _loadLeagues } from './+page';
	import { mounted } from '../../utils/mounted';
	import { browser } from '$app/environment';
	import { updateSearchParams } from '../../utils/updateSearchParams';
	import FilterBar from './FilterBar.svelte';
	import { Spinner } from 'flowbite-svelte';
	import CompetitionCalendar from '../../compnonents/competitions/CompetitionCalendar.svelte';
	import EventCard from '../../compnonents/home/EventCard.svelte';

	export let data: PageData;
	let competitions: Competition[] | Promise<Competition[]> = data.competitions;
	let { year, name, nation, league } = data.params;
	let viewCalendar: boolean = false;

	const isMounted = () => $mounted;
	const handleSearch = async (year: number, name: string, nation: string, league: string) => {
		competitions = _loadCompetitions(data.fetch, { year, name, nation, league });
	};
	const handleYearChange = async (year: number) => {
		data.leagues = await _loadLeagues(data.fetch, year);
	};

	$: {
		if (!browser || !isMounted()) break $;
		handleSearch(year, name, nation, league);
		updateSearchParams({ year, name, nation, league }, data.url);
	}
	$: {
		handleYearChange(year);
	}
</script>

<FilterBar
	bind:year
	bind:name
	bind:nation
	bind:league
	bind:viewCalendar
	seasons={data.seasons}
	leagues={data.leagues}
	nations={data.nations}
/>
<section id="competitions">
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
	{#if viewCalendar}
		<CompetitionCalendar {competitions} bind:year />
	{/if}
</section>
