<script lang="ts">
	import type { Competition } from 'src/types/Competition';
	import type { League } from 'src/types/League';
	import type { PageData } from './$types';
	import EventCard from '../../compnonents/home/EventCard.svelte';
	import { Input, Spinner } from 'flowbite-svelte';
	import { _loadCompetitions, _loadLeagues } from './+page';
	import EventCalendar from '../../compnonents/competitions/EventCalendar.svelte';
	import SwitchButton from '../../compnonents/shared/SwitchButton.svelte';
	import { debounce } from '../../utils/debounce';
	import { mounted } from '../../utils/mounted';
	import { browser } from '$app/environment';
	import { updateSearchParams } from '../../utils/updateSearchParams';

	export let data: PageData;
	let competitions: Competition[] | Promise<Competition[]> = data.competitions;
	let leagues: League[] = data.leagues;
	let { year, name, nation, league } = data.params;
	let viewCalendar: boolean = false;

	async function handleSearch(year: number, name: string, nation: string, league: string) {
		competitions = _loadCompetitions(data.fetch, year, name, nation, league);
		leagues = await _loadLeagues(data.fetch, year);
	}

	const isMounted = () => $mounted;
	$: {
		if (!browser || !isMounted()) break $;
		handleSearch(year, name, nation, league);
		updateSearchParams({ year, name, nation, league }, data.url);
	}
</script>

<section id="competitions">
	<div class="flex gap-[10px] mt-10">
		<Input
			type="text"
			id="name"
			placeholder="Competition Name"
			required
			class="rounded-sm font-Raleway bg-black/5"
			value={name}
			on:keyup={async ({ target }) => {
				if (target instanceof HTMLInputElement) {
					await debounce();
					name = target.value;
				}
			}}
		/>
		<select
			bind:value={year}
			on:change={() => {
				league = '';
			}}
		>
			{#each data.seasons as season}
				<option>{season.year}</option>
			{/each}
		</select>
		<select bind:value={league}>
			<option value="">All Leagues</option>
			{#each leagues as l}
				<option value={l.id}>{l.name}</option>
			{/each}
		</select>

		<select bind:value={nation}>
			<option value="">All nations</option>
			{#each data.nations as n}
				<option value={n.id}>{n.code}</option>
			{/each}
		</select>
		<SwitchButton
			leftClickAction={() => (viewCalendar = false)}
			rightClickAction={() => (viewCalendar = true)}
			leftString="List"
			rightString="Calendar"
		/>
	</div>

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
	<EventCalendar {competitions} {viewCalendar} bind:year />
</section>
