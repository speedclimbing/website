<script lang="ts">
	import type { Competition } from 'src/types/Competition';
	import type { League } from 'src/types/League';
	import type { PageData } from './$types';
	import { Input, Spinner } from 'flowbite-svelte';
	import { _loadCompetitions, _loadLeagues } from './+page';
	import CompetitionCalendar from '../../compnonents/competitions/CompetitionCalendar.svelte';
	import SwitchButton from '../../compnonents/shared/SwitchButton.svelte';
	import { debounce } from '../../utils/debounce';
	import { mounted } from '../../utils/mounted';
	import { browser } from '$app/environment';
	import { updateSearchParams } from '../../utils/updateSearchParams';
	import SelectFilter from '../../compnonents/competitions/SelectFilter.svelte';
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

<section id="competitions">
	<div class="xl:grid-cols-5 md:grid-cols-2 grid gap-[10px] mt-10">
		<Input
			type="text"
			placeholder="Competition Name"
			class="rounded-sm font-Raleway bg-black/5"
			value={name}
			on:keyup={async ({ target }) => {
				if (!(target instanceof HTMLInputElement)) return;
				await debounce();
				name = target.value;
			}}
		/>
		<SelectFilter
			bind:value={year}
			options={data.seasons}
			textProperty="year"
			valueProperty="year"
			onChange={() => {
				league = '';
			}}
		/>
		<SelectFilter
			bind:value={league}
			options={data.leagues}
			textProperty="name"
			valueProperty="id"
			defaultText="All Leagues"
		/>
		<SelectFilter
			bind:value={nation}
			options={data.nations}
			textProperty="code"
			valueProperty="id"
			defaultText="All Leagues"
		/>
		<SwitchButton
			leftClickAction={() => (viewCalendar = false)}
			rightClickAction={() => (viewCalendar = true)}
			leftString="List"
			rightString="Calendar"
			style="md:col-span-2 ml-auto xl:col-span-1"
		/>
	</div>

	{#await competitions}
		<div class="flex justify-center items-center my-10">
			<Spinner />
		</div>
	{:then comps}
		{#if viewCalendar}
			<CompetitionCalendar competitions={comps} bind:year />
		{:else if comps.length === 0}
			<div class="flex justify-center items-center my-10">
				<p class="text-2xl font-semibold">No competitions found</p>
			</div>
		{:else}
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
</section>
