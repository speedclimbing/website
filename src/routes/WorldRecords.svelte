<script lang="ts">
	import PersonCard from 'compnonents/shared/content/PersonCard.svelte';
	import TitleWithLine from 'compnonents/shared/content/TitleWithLine.svelte';
	import type { Ranking } from 'types/Ranking';

	export let worldRecordMale: Ranking;
	export let worldRecordFemale: Ranking;
</script>

<section id="world-records" class="py-[100px]">
	<TitleWithLine
		titleText="Current World Record"
		titleClasses="text-center"
		lineClasses="mx-auto"
		lineColor="yellow"
	/>
	<div class="flex flex-col gap-20 mx-auto justify-center mt-20 items-center lg:flex-row lg:gap-10">
		<PersonCard
			image="/images/aleksandra-miroslaw-transparent.png"
			name="{worldRecordFemale.first_name} {worldRecordFemale.last_name} ({worldRecordFemale.nation_code})"
			time={`${(worldRecordFemale.time / 1000).toFixed(3)}`}
			subtitle={`${worldRecordFemale.competition_date.toLocaleDateString('de-DE', {
				year: 'numeric',
				month: 'long',
				day: '2-digit'
			})}`}
			color="#dd972a"
		/>
		<PersonCard
			image="/images/kiromal-katibin-transparent.png"
			name="{worldRecordMale.first_name} {worldRecordMale.last_name} ({worldRecordMale.nation_code})"
			time={`${(worldRecordMale.time / 1000).toFixed(3)}`}
			subtitle={`${worldRecordMale.competition_date.toLocaleDateString('de-DE', {
				year: 'numeric',
				month: 'long',
				day: '2-digit'
			})}`}
			color="#da3c2b"
		/>
	</div>
</section>
