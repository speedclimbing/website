<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import RankingsTable from 'components/home/RankingsTable.svelte';
	import SwitchButton from 'components/shared/buttons/SwitchButton.svelte';
	import PrimaryButton from 'components/shared/buttons/PrimaryButton.svelte';
	import TitleWithLine from 'components/shared/content/TitleWithLine.svelte';
	import type { Gender } from 'types/Gender';
	import type { AthleteTimeResult } from 'types/Athlete';

	export let worldRankingsFemale: AthleteTimeResult[];
	export let worldRankingsMale: AthleteTimeResult[];
	let gender: Gender = 'Male';
</script>

<section id="rankings" class="bg-grey/5 py-20 flex flex-col gap-10 dark:bg-black">
	<div
		id="rankings-search"
		class=" p-10 bg-[white] rounded-md border-grey/20 border-2 dark:bg-dark-grey"
	>
		<div class="flex gap-3 justify-between flex-col md:flex-row">
			<TitleWithLine titleText="Athlete Search" />
			<p class="text-lg font-light max-w-[300px] md:text-right mb-5 mt-[-30px] md:mt-0">
				Find out more about your favourite athletes!
			</p>
		</div>

		<form action="/athlete" class="flex gap-5 flex-col md:flex-row">
			<Input
				type="text"
				name="name"
				placeholder="Ahtlete Name"
				required
				class="rounded-sm font-Raleway bg-black/5"
			/>
			<PrimaryButton text="Search" />
		</form>
	</div>
	<div
		id="rankings-table"
		class="p-10 bg-[white] rounded-md border-grey/20 border-2 dark:bg-dark-grey"
	>
		<div class="flex gap-5 justify-between flex-col sm:flex-row">
			<TitleWithLine titleText="All time World Ranking" lineColor="yellow" />
			<SwitchButton
				class="mb-10 mt-[-30px] sm:mt-0"
				options={['Male', 'Female']}
				bind:value={gender}
			/>
		</div>
		<RankingsTable {worldRankingsFemale} {worldRankingsMale} {gender} />
	</div>
</section>
