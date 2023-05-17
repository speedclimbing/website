<script lang="ts">
	import NationMedalsTable from 'compnonents/stats/NationMedalsTable.svelte';
	import AlternativeButton from '../../compnonents/shared/buttons/AlternativeButton.svelte';
	import RankingOverview from '../../compnonents/stats/RankingOverview.svelte';
	import BoxContainer from 'compnonents/shared/layout/BoxContainer.svelte';
	import Pagination from 'compnonents/shared/pagination/Pagination.svelte';
	import EventCard from 'compnonents/shared/content/EventCard.svelte';
	import type { Competition } from 'types/Competition';

	const competitions: Competition[] = [
		{
			name: 'Next Event',
			location: 'Barcelona',
			from: new Date(),
			to: new Date(),
			nation_code: 'ESP',
			league_id: 'abcdefg'
		},
		{
			name: 'Next Event',
			location: 'Barcelona',
			from: new Date(),
			to: new Date(),
			nation_code: 'ESP',
			league_id: 'abcdefg'
		},
		{
			name: 'Next Event',
			location: 'Barcelona',
			from: new Date(),
			to: new Date(),
			nation_code: 'ESP',
			league_id: 'abcdefg'
		}
	];
</script>

<section class="bg-grey/10 dark:bg-dark-grey lg:px-[10%] px-[5%] py-[50px] grid grid-cols-10 gap-5">
	<BoxContainer>
		<div class="flex justify-between flex-wrap gap-3 mb-6 ">
			<h2 class="text-3xl shrink-0">Season Leaders</h2>
			<AlternativeButton
				style="dark:bg-red dark:border-red bg-red border-red !text-white shrink-0"
				text="More stats"
			/>
		</div>

		<div class="flex justify-between flex-wrap gap-[50px]">
			<RankingOverview />
			<RankingOverview />
			<RankingOverview />
		</div>
	</BoxContainer>

	<BoxContainer className="xl:col-span-6">
		<div class="flex justify-between flex-wrap gap-5">
			<h2 class="text-3xl">Nation Medals</h2>
			<Pagination />
		</div>
		<hr class="border-grey/10 border-[1px] dark:border-light-grey mt-2" />
		<NationMedalsTable />
	</BoxContainer>

	<BoxContainer className="xl:col-span-4">
		<div class="flex justify-between flex-wrap gap-5 mb-5">
			<h2 class="text-3xl">Upcoming</h2>
			<AlternativeButton
				style="dark:bg-red dark:border-red bg-red border-red !text-white shrink-0"
				text="All competitons"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<EventCard competition={competitions[0]} />
			<EventCard competition={competitions[1]} />
		</div>
	</BoxContainer>
</section>
