<script lang="ts">
	import type { League } from 'types/League';
	import type { Nation } from 'types/Nation';
	import type { Season } from 'types/Season';
	import SwitchButton from 'compnonents/shared/buttons/SwitchButton.svelte';
	import SelectFilter from 'compnonents/shared/inputs/SelectFilter.svelte';
	import DebouncedInput from 'compnonents/shared/inputs/DebouncedInput.svelte';

	export let viewCalendar: boolean;
	export let name: string;
	export let year: number;
	export let league: string;
	export let nation: string;
	export let seasons: Season[];
	export let nations: Nation[];
	export let leagues: League[];
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
		options={seasons}
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
		options={nations}
		textProperty="code"
		valueProperty="id"
		defaultText="All Nations"
	/>
	<SwitchButton
		leftClickAction={() => (viewCalendar = false)}
		rightClickAction={() => (viewCalendar = true)}
		leftString="List"
		rightString="Calendar"
		style="md:col-span-2 ml-auto xl:col-span-1"
	/>
</section>
