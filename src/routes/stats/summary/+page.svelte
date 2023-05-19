<script lang="ts">
	import SwitchButton from 'components/shared/buttons/SwitchButton.svelte';
	import SelectFilter from 'components/shared/inputs/SelectFilter.svelte';
	import type { PageData } from './$types';
	import { updateSearchParams } from 'utils/updateSearchParams';
	import Season from './Season.svelte';
	import AllTime from './AllTime.svelte';

	export let data: PageData;
	let { year, gender, leagueGroup, nation, continent } = data.params;

	$: {
		updateSearchParams({ year, gender, leagueGroup, nation, continent });
	}
</script>

<section class="bg-white dark:bg-black self ">
	<div class="grid lg:grid-cols-3">
		<div
			class="grid grid-cols-2 lg:col-span-2 items-center justify-items-center text-xl dark:text-white py-5 relative"
		>
			<button
				class="cursor-pointer"
				on:click={() => {
					year = new Date().getFullYear();
				}}>Season Stats</button
			>
			<button
				class="cursor-pointer"
				on:click={() => {
					year = undefined;
				}}>All time Stats</button
			>
			<div
				class="bg-red rounded-sm w-[calc(100%/2)] h-1 transition-[left] absolute bottom-[-1px] {year
					? 'left-0'
					: 'left-[calc(100%/2)]'}"
			/>
		</div>
		<div class="flex justify-end gap-2 my-auto order-first lg:order-2 py-3">
			{#if data.seasonData && year}
				<SelectFilter
					bind:value={year}
					options={data.seasonData.seasons}
					valueProperty="year"
					textProperty="year"
				/>
			{/if}
			<SwitchButton bind:value={gender} options={['Male', 'Female']} />
		</div>
	</div>
</section>

{#if data.seasonData}
	<Season
		upcomingCompetitions={data.seasonData.upcomingCompetitions}
		seasonSummary={data.seasonData.seasonSummary}
	/>
{/if}

{#if data.allTimeData}
	<AllTime bind:leagueGroup bind:nation bind:continent allTimeData={data.allTimeData} />
{/if}
