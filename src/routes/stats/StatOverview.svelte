<script lang="ts">
	import SecondaryButton from '../../compnonents/shared/SecondaryButton.svelte';
	import NationMedalsRanking from '../../compnonents/stats/NationMedalsRanking.svelte';
	import RankingOverview from '../../compnonents/stats/RankingOverview.svelte';
	import UpcomingEvents from '../../compnonents/stats/UpcomingEvents.svelte';
</script>

<section class="bg-grey/10 dark:bg-dark-grey px-[10%] py-[100px]">
	<div class="grid grid-cols-5 gap-4">
		<div
			class="bg-white dark:bg-grey px-[5vw] py-10 rounded-md dark:border-white/5 border-2 col-span-5"
		>
			<div class="flex justify-between">
				<h2 class="text-3xl">Season Leaders</h2>
				<SecondaryButton text="See all stats" />
			</div>

			<div class="flex justify-between gap-[50px]">
				<RankingOverview />
				<RankingOverview />
				<RankingOverview />
			</div>
		</div>
		<NationMedalsRanking />
		<UpcomingEvents />
	</div>
</section>
