<script lang="ts">
	import type { PageData } from './$types';
	import { mounted } from 'utils/mounted';
	import { browser } from '$app/environment';
	import { updateSearchParams } from 'utils/updateSearchParams';
	import CompetitionCalendar from 'compnonents/competitions/CompetitionCalendar.svelte';
	import EventCard from 'compnonents/home/EventCard.svelte';
	import { Spinner } from 'flowbite-svelte';
	import { navigating } from '$app/stores';
	import DebouncedInput from 'compnonents/shared/DebouncedInput.svelte';
	import SelectFilter from 'compnonents/competitions/SelectFilter.svelte';
	import SwitchButton from 'compnonents/shared/SwitchButton.svelte';

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
		const currentDate = new Date();
		if (!viewCalendar && year === currentDate.getFullYear()) {
			calendarDate = currentDate;
		} else if (!viewCalendar && year !== currentDate.getFullYear()) {
			calendarDate = undefined;
		} else if (viewCalendar && calendarDate && year !== calendarDate.getFullYear()) {
			year = calendarDate.getFullYear();
		}
	}
</script>

<section id="competition-filter" class="xl:grid-cols-5 md:grid-cols-2 grid gap-[10px] mt-10">
	<DebouncedInput
		type="text"
		placeholder="Competition Name"
		inputClass="rounded-sm font-Raleway bg-black/5"
		bind:value={name}
	/>
	<SelectFilter
		bind:value={year}
		options={data.seasons}
		disabled={viewCalendar}
		textProperty="year"
		valueProperty="year"
	/>
	<SelectFilter
		bind:value={league_group}
		options={data.league_groups}
		textProperty="name"
		valueProperty="id"
		optgroup={{
			property: 'continent',
			defaultText: 'World-wide'
		}}
		defaultText="All Leagues"
	/>
	<SelectFilter
		bind:value={nation}
		options={data.nations}
		textProperty="name"
		valueProperty="code_ioc"
		defaultText="All Nations"
		optgroup={{
			property: 'continent',
			defaultText: 'World-wide'
		}}
	/>
	<SwitchButton
		leftClickAction={() => (viewCalendar = false)}
		rightClickAction={() => (viewCalendar = true)}
		leftString="List"
		rightString="Calendar"
		style="md:col-span-2 ml-auto xl:col-span-1"
	/>
</section>

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
