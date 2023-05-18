<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';
	import Hero from './Hero.svelte';
	import SwitchButton from 'compnonents/shared/buttons/SwitchButton.svelte';
	import SelectFilter from 'compnonents/shared/inputs/SelectFilter.svelte';

	export let data: LayoutData;

	let bar: HTMLElement;
	let season: number = new Date().getFullYear();
	let gender: string = 'Male';
	let showSeasonStats: boolean = true;

	const options = [
		{
			year: 2023
		},
		{
			year: 2022
		},
		{
			year: 2021
		},
		{
			year: 2020
		}
	];

	const handleClickSeasonStats = () => {
		showSeasonStats = true;
	};

	const handleClickAllTimeStats = () => {
		showSeasonStats = false;
	};

	$: {
		if (!browser) break $;
		if (showSeasonStats) goto(`/stats/${gender}/season/${season}`);
		else goto(`/stats/${gender}/all-time`);
	}
</script>

<Hero />
<section class="bg-white dark:bg-black self ">
	<div class="grid lg:grid-cols-3">
		<div
			class="grid grid-cols-2 lg:col-span-2 items-center justify-items-center text-xl dark:text-white py-5 relative"
		>
			<button class="cursor-pointer" on:click={handleClickSeasonStats}>Season Stats</button>
			<button class="cursor-pointer" on:click={handleClickAllTimeStats}>All time Stats</button>
			<div
				class="bg-red rounded-sm w-[calc(100%/2)] h-1 transition-[left] absolute bottom-[-1px] {showSeasonStats
					? 'left-0'
					: 'left-[calc(100%/2)]'}"
				bind:this={bar}
			/>
		</div>
		<div class="flex justify-end gap-2 my-auto order-first lg:order-2 py-3">
			{#if showSeasonStats}
				<SelectFilter
					bind:value={season}
					options={data.seasons}
					valueProperty="year"
					textProperty="year"
				/>
			{/if}
			<SwitchButton
				rightClickAction={() => {
					gender = 'Female';
				}}
				leftClickAction={() => {
					gender = 'Male';
				}}
				leftString="Males"
				rightString="Females"
			/>
		</div>
	</div>
</section>

<slot />
