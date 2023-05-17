<script lang="ts">
	import type { PageData } from './$types';
	import { mounted } from 'utils/mounted';
	import { browser } from '$app/environment';
	import { updateSearchParams } from 'utils/updateSearchParams';
	import CompetitionCalendar from 'compnonents/competitions/CompetitionCalendar.svelte';
	import EventCard from 'compnonents/shared/content/EventCard.svelte';
	import { Spinner } from 'flowbite-svelte';
	import { navigating } from '$app/stores';
	import DebouncedInput from 'compnonents/shared/inputs/DebouncedInput.svelte';
	import SelectFilter from 'compnonents/shared/inputs/SelectFilter.svelte';
	import SwitchButton from 'compnonents/shared/buttons/SwitchButton.svelte';

	export let data: PageData;
	let { year, name, nation, league_group } = data.params;
	let viewCalendar: boolean = false;
	let calendarDate: Date | undefined = undefined;

	const isMounted = () => $mounted;
	const handleSearch = async (year: number, name: string, nation: string, league_group: string) => {
		updateSearchParams({ year, name, nation, league_group });
	};

	const updateCalendarDateOnYearChange = (newYear: number) => {
		if (calendarDate && newYear === calendarDate.getFullYear()) {
			return;
		}

		const currentDate = new Date();
		if (newYear === currentDate.getFullYear()) {
			calendarDate = currentDate;
		} else {
			calendarDate = undefined;
		}
	};

	const updateYearOnCalendarDateChange = (newCalendarDate: Date | undefined) => {
		if (!viewCalendar || newCalendarDate === undefined || year === newCalendarDate.getFullYear()) {
			return;
		}

		year = newCalendarDate.getFullYear();
	};

	$: {
		updateCalendarDateOnYearChange(year);
	}

	$: {
		updateYearOnCalendarDateChange(calendarDate);
	}

	$: {
		if (!browser || !isMounted()) break $;
		handleSearch(year, name, nation, league_group);
	}
</script>

<section id="competition-filter" class="xl:grid-cols-5 md:grid-cols-2 grid gap-[10px] mt-10">
	<DebouncedInput
		type="text"
		placeholder="Competition Name"
		inputClass="rounded-sm font-Raleway bg-black/5"
		bind:value={name}
	/>
	<SelectFilter bind:value={year} options={data.seasons} textProperty="year" valueProperty="year" />
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
