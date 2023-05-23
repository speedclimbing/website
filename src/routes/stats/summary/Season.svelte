<script lang="ts">
	import NationMedalsTable from 'components/stats/NationMedalsTable.svelte';
	import AlternativeButton from '../../../components/shared/buttons/AlternativeButton.svelte';
	import RankingOverview from '../../../components/stats/RankingOverview.svelte';
	import BoxContainer from 'components/shared/layout/BoxContainer.svelte';
	import EventCard from 'components/shared/content/EventCard.svelte';
	import About from './About.svelte';
	import { goto } from '$app/navigation';
	import type { Competition } from 'types/Competition';
	import type { SeasonSummary } from 'types/StatsSummary';
	import { formatName } from 'utils/formatName';

	export let gender: string;
	export let upcomingCompetitions: Competition[];
	export let seasonSummary: SeasonSummary;
</script>

<section class="bg-grey/10 dark:bg-dark-grey lg:px-[10%] px-[5%] py-[50px] grid grid-cols-10 gap-5">
	<BoxContainer>
		<div class="flex justify-between flex-wrap gap-3 mb-6 ">
			<h2 class="text-3xl shrink-0">Season Leaders</h2>
			<AlternativeButton
				style="!bg-red !text-white shrink-0"
				text="More stats"
				href={'/stats/detail'}
			/>
		</div>

		<div class="flex justify-between flex-wrap gap-[50px]">
			<RankingOverview
				label="Worldranking by time"
				{gender}
				subject="time"
				columns={['first_name', 'nation_code_ioc', 'time']}
				data={seasonSummary.ranking_athlete_time}
			/>
			<RankingOverview
				label="Worldranking by points"
				{gender}
				subject="points"
				columns={['first_name', 'nation_code_ioc', 'points']}
				data={seasonSummary.ranking_athlete_points}
			/>
			<RankingOverview
				label="Worldranking by average rank"
				{gender}
				subject="avg_rank"
				columns={['first_name', 'nation_code_ioc', 'avg_rank']}
				data={seasonSummary.ranking_athlete_avg_rank}
			/>
		</div>
	</BoxContainer>

	<BoxContainer className="xl:col-span-6">
		<NationMedalsTable data={seasonSummary.ranking_nation_points_and_medals} />
	</BoxContainer>

	<BoxContainer className="xl:col-span-4">
		<div class="flex justify-between flex-wrap gap-5 mb-5">
			<h2 class="text-3xl">Upcoming</h2>
			<AlternativeButton
				style="dark:bg-red dark:border-red bg-red border-red !text-white shrink-0"
				text="All competitons"
				href={'/competition'}
			/>
		</div>
		<div class="flex flex-col gap-2">
			{#each upcomingCompetitions as competition}
				<EventCard {competition} />
			{/each}
		</div>
	</BoxContainer>
</section>

<About />
