<script lang="ts">
	import About from './About.svelte';
	import Hero from './Hero.svelte';
	import SeasonStats from './SeasonStats.svelte';
	import AllTimeStats from './AllTimeStats.svelte';
	import SwitchButton from 'compnonents/shared/buttons/SwitchButton.svelte';
	import SelectFilter from 'compnonents/shared/inputs/SelectFilter.svelte';

	let bar: HTMLElement;
	let season: number = new Date().getFullYear();
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
					{options}
					valueProperty="year"
					textProperty="year"
					defaultText="Season"
				/>
			{/if}
			<SwitchButton
				rightClickAction={() => {}}
				leftClickAction={() => {}}
				leftString="Males"
				rightString="Females"
			/>
		</div>
	</div>
</section>
{#if showSeasonStats}
	<SeasonStats />
	<About />
{:else}
	<AllTimeStats />
{/if}
