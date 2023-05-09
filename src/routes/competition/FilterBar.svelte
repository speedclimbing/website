<script lang="ts">
	import type { LeagueGroup } from 'types/LeagueGroup';
	import type { Nation } from 'types/Nation';
	import type { Season } from 'types/Season';
	import SwitchButton from 'compnonents/shared/SwitchButton.svelte';
	import SelectFilter from 'compnonents/competitions/SelectFilter.svelte';
	import DebouncedInput from 'compnonents/shared/DebouncedInput.svelte';

	export let viewCalendar: boolean;
	export let name: string;
	export let year: number;
	export let league_group: string;
	export let nation: string;
	export let seasons: Season[];
	export let nations: Nation[];
	export let league_groups: LeagueGroup[];
</script>

<section id="competition-filter" class="xl:grid-cols-5 md:grid-cols-2 grid gap-[10px] mt-10">
	<DebouncedInput
		type="text"
		placeholder="Competition Name"
		inputClass="rounded-sm font-Raleway bg-black/5"
		bind:value={name}
	/>
	<SelectFilter bind:value={year} options={seasons} textProperty="year" valueProperty="year" />
	<SelectFilter
		bind:value={league_group}
		options={league_groups}
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
		options={nations}
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
