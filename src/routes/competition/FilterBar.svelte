<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import { debounce } from '../../utils/debounce';
	import type { League } from '../../types/League';
	import type { Nation } from '../../types/Nation';
	import type { Season } from '../../types/Season';
	import SwitchButton from '../../compnonents/shared/SwitchButton.svelte';
	import SelectFilter from '../../compnonents/competitions/SelectFilter.svelte';

	export let viewCalendar: boolean;
	export let name: string;
	export let year: number;
	export let league: string;
	export let nation: string;
	export let seasons: Season[];
	export let nations: Nation[];
	export let leagues: League[];

	const handleKeyup = async (target: EventTarget | null) => {
		if (!(target instanceof HTMLInputElement)) return;
		if (!(await debounce())) return;
		name = target.value;
	};
</script>

<section id="competition-filter" class="xl:grid-cols-5 md:grid-cols-2 grid gap-[10px] mt-10">
	<Input
		type="text"
		placeholder="Competition Name"
		class="rounded-sm font-Raleway bg-black/5"
		value={name}
		on:keyup={(e) => handleKeyup(e.target)}
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
