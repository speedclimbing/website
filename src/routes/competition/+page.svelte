<script lang="ts">
	import type { PageData } from './$types';
	import { mounted } from 'utils/mounted';
	import { browser } from '$app/environment';
	import { updateSearchParams } from 'utils/updateSearchParams';
	import CompetitionCalendar from 'components/competitions/CompetitionCalendar.svelte';
	import EventCard from 'components/shared/content/EventCard.svelte';
	import { Spinner } from 'flowbite-svelte';
	import { navigating } from '$app/stores';
	import DebouncedInput from 'components/shared/inputs/DebouncedInput.svelte';
	import SelectFilter from 'components/shared/inputs/SelectFilter.svelte';
	import SwitchButton from 'components/shared/buttons/SwitchButton.svelte';

	export let data: PageData;
	let view: 'List' | 'Calendar' = 'List';
	let calendarDate: Date | undefined = undefined;

	const isMounted = () => $mounted;

	const updateCalendarDateOnYearChange = (newYear: string) => {
		if (calendarDate && newYear === calendarDate.getFullYear().toString()) {
			return;
		}

		const currentDate = new Date();
		if (newYear === currentDate.getFullYear().toString()) {
			calendarDate = currentDate;
		} else {
			calendarDate = undefined;
		}
	};

	const updateYearOnCalendarDateChange = (newCalendarDate: Date | undefined) => {
		if (
			view !== 'Calendar' ||
			newCalendarDate === undefined ||
			data.params.year === newCalendarDate.getFullYear().toString()
		) {
			return;
		}

		data.params.year = newCalendarDate.getFullYear().toString();
	};

	$: {
		updateCalendarDateOnYearChange(data.params.year);
	}

	$: {
		updateYearOnCalendarDateChange(calendarDate);
	}

	$: {
		if (!browser || !isMounted()) break $;
		updateSearchParams(data.params);
	}
</script>

<section id="competition-filter" class="xl:grid-cols-5 md:grid-cols-2 grid gap-[10px] mt-10">
	<DebouncedInput
		type="text"
		placeholder="Competition Name"
		inputClass="rounded-sm font-Raleway bg-black/5"
		bind:value={data.params.name}
	/>
	{#each data.filters as filter}
		<SelectFilter bind:value={data.params[filter.name]} {filter} />
	{/each}
	<SwitchButton
		options={['List', 'Calendar']}
		bind:value={view}
		class="md:col-span-2 ml-auto xl:col-span-1"
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
	{:else if view === 'List'}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
			{#each data.competitions as competition, index (index)}
				<EventCard {competition} />
			{/each}
		</div>
	{:else if view === 'Calendar'}
		<CompetitionCalendar competitions={data.competitions} bind:date={calendarDate} />
	{/if}
</section>
