<script lang="ts">
	import type { Competition } from 'src/types/Competition';
	import type { League } from 'src/types/League';
	import type { PageData } from './$types';
	import { Input } from 'flowbite-svelte';
	import { _loadCompetitions, _loadLeagues } from './+page';
	import EventCalendar from '../../compnonents/competitions/EventCalendar.svelte';
	import SwitchButton from '../../compnonents/shared/SwitchButton.svelte';
	import { debounce } from '../../utils/debounce';
	import { mounted } from '../../utils/mounted';
	import { browser } from '$app/environment';
	import { updateSearchParams } from '../../utils/updateSearchParams';
	import SelectFilter from '../../compnonents/competitions/SelectFilter.svelte';
	import CompetitionGrid from '../../compnonents/competitions/CompetitionGrid.svelte';

	export let data: PageData;
	let competitions: Competition[] | Promise<Competition[]> = data.competitions;
	let leagues: League[] = data.leagues;
	let { year, name, nation, league } = data.params;
	let viewCalendar: boolean = false;

	async function handleSearch(year: number, name: string, nation: string, league: string) {
		competitions = _loadCompetitions(data.fetch, { year, name, nation, league });
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
			placeholder="Competition Name"
			class="rounded-sm font-Raleway bg-black/5"
			value={name}
			on:keyup={async ({ target }) => {
				if (target instanceof HTMLInputElement) {
					await debounce();
					name = target.value;
				}
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
			options={leagues}
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
		/>
	</div>

	<CompetitionGrid {competitions} {viewCalendar} />
	<EventCalendar {competitions} {viewCalendar} bind:year />
</section>
