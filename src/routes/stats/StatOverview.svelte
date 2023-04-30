<script lang="ts">
	import type { SeasonSummary } from 'types/SeasonSummary';
	import AlternativeButton from '../../compnonents/shared/AlternativeButton.svelte';
	import NationMedalsRanking from '../../compnonents/stats/NationMedalsRanking.svelte';
	import RankingOverview from '../../compnonents/stats/RankingOverview.svelte';
	import UpcomingEvents from '../../compnonents/stats/UpcomingEvents.svelte';
	import type { AthleteResult } from 'types/Athlete';

	export let data: SeasonSummary;

	const formatName = (athlete: AthleteResult) => {
		return `${athlete.first_name.charAt(0).toUpperCase()}${athlete.first_name.slice(
			1
		)} ${athlete.last_name.toUpperCase()}`;
	};
</script>

<section class="bg-grey/10 dark:bg-dark-grey lg:px-[10%] px-[5%] py-[100px]">
	<div class="grid grid-cols-10 gap-4">
		<div
			class="bg-white dark:bg-grey px-[5vw] py-10 rounded-md dark:border-white/5 border-2 col-span-10 "
		>
			<div class="flex justify-between flex-wrap gap-3 mb-6 ">
				<h2 class="text-3xl shrink-0">Season Leaders</h2>
				<AlternativeButton
					style="dark:bg-red dark:border-red bg-red border-red !text-white shrink-0"
					text="All competitons"
				/>
			</div>

			<div class="flex justify-between flex-wrap gap-6 md:gap-20">
				<RankingOverview
					label="Worldranking by time"
					rows={data.ranking_athlete_time.map((a) => [
						formatName(a),
						a.nation_code_ioc,
						(a.time / 1000).toFixed(3)
					])}
				/>
				<RankingOverview
					label="Worldranking by points"
					rows={data.ranking_athlete_points.map((a) => [
						formatName(a),
						a.nation_code_ioc,
						a.points.toString()
					])}
				/>
				<RankingOverview
					label="Worldranking by average rank"
					rows={data.ranking_athlete_avg_rank.map((a) => [
						formatName(a),
						a.nation_code_ioc,
						a.avg_rank.toString()
					])}
				/>
			</div>
		</div>
		<NationMedalsRanking data={data.ranking_nation_points_and_medals} />
		<UpcomingEvents />
	</div>
</section>
