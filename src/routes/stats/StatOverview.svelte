<script lang="ts">
	import AlternativeButton from '../../compnonents/shared/AlternativeButton.svelte';
	import NationMedalsRanking from '../../compnonents/stats/NationMedalsRanking.svelte';
	import RankingOverview from '../../compnonents/stats/RankingOverview.svelte';
	import UpcomingEvents from '../../compnonents/stats/UpcomingEvents.svelte';
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
					text="More stats"
				/>
			</div>

			<div class="flex justify-between flex-wrap gap-[50px]">
				<RankingOverview />
				<RankingOverview />
				<RankingOverview />
			</div>
		</div>
		<NationMedalsRanking />
		<UpcomingEvents />
	</div>
</section>
