<script lang="ts">
	import SwitchButton from 'components/shared/buttons/SwitchButton.svelte';
	import TitleWithLine from 'components/shared/content/TitleWithLine.svelte';
	import SelectFilter from 'components/shared/inputs/SelectFilter.svelte';
	import BoxContainer from 'components/shared/layout/BoxContainer.svelte';
	import { ChevronLeft } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { updateSearchParams } from 'utils/updateSearchParams';
	import SmartTable from '../../../components/stats/SmartTable.svelte';

	export let data: PageData;

	$: {
		updateSearchParams(data.params);
	}
</script>

<svelte:head>
	<title>Detailed Statistics</title>
	<meta
		name="description"
		content="Explore our Detailed Statistics page, where you can deep dive into data using our dynamic filters."
	/>
</svelte:head>

<section class="bg-white dark:bg-black self flex flex-wrap w-full">
	<a
		href="/stats/summary?year={new Date().getFullYear()}"
		class="py-4 cursor-pointer flex justify-center items-center gap-2 font-bold"
	>
		<ChevronLeft class="text-red font-bold" size="20" /> Back to summary
	</a>
	<div class="grow" />
	<SwitchButton
		class="py-4 justify-self-end"
		bind:value={data.params.gender}
		options={['Male', 'Female']}
	/>
</section>

<section class="bg-grey/10 dark:bg-dark-grey lg:px-[10%] px-[5%] py-[50px] grid grid-cols-10 gap-6">
	<BoxContainer className="flex justify-between flex-wrap gap-5">
		<TitleWithLine titleText="Detailed stats" lineColor="yellow" lineClasses="mb-0" />
		<div class="mt-auto mb-auto flex gap-5 flex-wrap">
			{#each data.filters as filter}
				<SelectFilter bind:value={data.params[filter.name]} {filter} />
			{/each}
		</div>
	</BoxContainer>

	<BoxContainer className="flex flex-col gap-5">
		{#if data.data.length > 0}
			<SmartTable data={data.data} />
		{:else}
			<div class="flex flex-col justify-center items-center my-10">
				<p class="text-2xl font-semibold">No matching data found</p>
				<p class="text-md font-semibold">Please adjust your filters</p>
			</div>
		{/if}
	</BoxContainer>
</section>
