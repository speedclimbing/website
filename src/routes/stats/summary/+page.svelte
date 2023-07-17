<script lang="ts">
	import SwitchButton from 'components/shared/buttons/SwitchButton.svelte';
	import SelectFilter from 'components/shared/inputs/SelectFilter.svelte';
	import type { PageData } from './$types';
	import { updateSearchParams } from 'utils/updateSearchParams';
	import Season from './Season.svelte';
	import AllTime from './AllTime.svelte';

	export let data: PageData;

	$: {
		updateSearchParams(data.params);
	}
</script>

<svelte:head>
	<title>Statistics Summary</title>
	<meta
		name="description"
		content="The latest and most relevant speedclimbing statistics at a glance.
		View who has the most medals and the world records."
	/>
</svelte:head>

<section class="bg-white dark:bg-black self ">
	<div class="grid lg:grid-cols-3">
		<div
			class="grid grid-cols-2 lg:col-span-2 items-center justify-items-center text-xl dark:text-white py-5 relative"
		>
			<button
				class="cursor-pointer"
				on:click={() => {
					data.params.year = new Date().getFullYear().toString();
				}}>Season Stats</button
			>
			<button
				class="cursor-pointer"
				on:click={() => {
					data.params.year = '';
				}}>All time Stats</button
			>
			<div
				class="bg-red rounded-sm w-[calc(100%/2)] h-1 transition-[left] absolute bottom-[-1px] {data
					.params.year
					? 'left-0'
					: 'left-[calc(100%/2)]'}"
			/>
		</div>
		<div class="flex justify-end gap-2 my-auto order-first lg:order-2 py-3">
			{#if data.seasonData && data.params.year}
				<SelectFilter bind:value={data.params.year} filter={data.filters[0]} />
			{/if}
			<SwitchButton bind:value={data.params.gender} options={['Male', 'Female']} />
		</div>
	</div>
</section>

{#if data.seasonData}
	<Season
		gender={data.params.gender}
		upcomingCompetitions={data.seasonData.upcomingCompetitions}
		seasonSummary={data.seasonData.seasonSummary}
	/>
{/if}

{#if data.allTimeData}
	<AllTime
		bind:params={data.params}
		filters={data.filters}
		allTimeSummary={data.allTimeData.allTimeSummary}
	/>
{/if}
