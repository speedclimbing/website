<script lang="ts">
	import SwitchButton from 'components/shared/buttons/SwitchButton.svelte';
	import TitleWithLine from 'components/shared/content/TitleWithLine.svelte';
	import SelectFilter from 'components/shared/inputs/SelectFilter.svelte';
	import BoxContainer from 'components/shared/layout/BoxContainer.svelte';
	import { ChevronLeft } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import PaginatedTable from 'components/shared/pagination/PaginatedTable.svelte';
	import { updateSearchParams } from 'utils/updateSearchParams';
	import SmartFilter from './SmartFilter.svelte';
	import SmartTable from './SmartTable.svelte';

	export let data: PageData;

	$: console.log(data.data);
	$: {
		updateSearchParams(data.params);
	}
</script>

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
			<SelectFilter
				bind:value={data.params.entity}
				options={data.filters.availableEntities.map((e) => {
					return { name: e };
				})}
				textProperty="name"
				valueProperty="name"
			/>
			<SelectFilter
				bind:value={data.params.subject}
				options={data.filters.availableSubjects.map((e) => {
					return { name: e };
				})}
				textProperty="name"
				valueProperty="name"
			/>
			{#each Object.entries(data.filters.availableFilters) as [filter, required]}
				<SmartFilter
					bind:value={data.params[filter]}
					{filter}
					{required}
					league_groups={data.leagueGroups}
					seasons={data.seasons}
					nations={data.nations}
				/>
			{/each}
		</div>
	</BoxContainer>

	<BoxContainer className="flex flex-col gap-5">
		<SmartTable data={data.data} />
	</BoxContainer>
</section>
