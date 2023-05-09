<script lang="ts">
	import SelectFilter from 'compnonents/competitions/SelectFilter.svelte';
	import Line from 'compnonents/shared/Line.svelte';
	import Pagination from 'compnonents/shared/Pagination.svelte';
	import FastestAthletesAllTime from 'compnonents/stats/FastestAthletesAllTime.svelte';
	import FastestCompetitionHistory from 'compnonents/stats/FastestCompetitionHistory.svelte';
	import FastestCompetitionsAllTime from 'compnonents/stats/FastestCompetitionsAllTime.svelte';
	import NationMedalsRanking from 'compnonents/stats/NationMedalsRanking.svelte';

	let value = 1;

	const options = [
		{
			code: 'World Cup',
			id: 1
		},
		{
			code: 'Olympic Games',
			id: 2
		},
		{
			code: 'National Cup',
			id: 3
		}
	];
</script>

<section class="bg-grey/10 dark:bg-dark-grey lg:px-[10%] px-[5%] py-[100px]">
	<div class="grid grid-cols-10 gap-6">
		<div
			class="bg-white dark:bg-grey px-[5vw] py-5 rounded-md dark:border-white/5 border-2 col-span-10 flex justify-between flex-wrap gap-5"
		>
			<div>
				<h2 class="text-4xl font-bold">Time Records</h2>
				<Line style="mb-0" color="yellow" />
			</div>
			<div class="mt-auto mb-auto flex gap-5 flex-wrap">
				<SelectFilter
					bind:value
					{options}
					textProperty="code"
					valueProperty="id"
					defaultText="All Leagues"
				/>
				<SelectFilter
					bind:value
					{options}
					textProperty="code"
					valueProperty="id"
					defaultText="All Leagues"
				/>
				<SelectFilter
					bind:value
					{options}
					textProperty="code"
					valueProperty="id"
					defaultText="All Leagues"
				/>
			</div>
		</div>
		<div
			class="bg-white dark:bg-grey px-[5vw] py-10 rounded-md dark:border-white/5 border-2 col-span-10 flex flex-col gap-8"
		>
			<Pagination />
			<FastestAthletesAllTime />
			<Pagination />
		</div>

		<div
			class="bg-white dark:bg-grey px-[2vw] py-10 rounded-md dark:border-white/5 border-2 col-span-10 xl:col-span-5 flex flex-col gap-2"
		>
			<h2 class="text-3xl">History of Fastest Athletes</h2>

			<FastestCompetitionHistory />
		</div>
		<div
			class="bg-white dark:bg-grey px-[2vw] py-10 rounded-md dark:border-white/5 border-2 col-span-10 xl:col-span-5 flex flex-col gap-2"
		>
			<h2 class="text-3xl">History of Fastest Competitions</h2>

			<FastestCompetitionHistory />
		</div>
		<div
			class="bg-white dark:bg-grey px-[5vw] py-5 rounded-md dark:border-white/5 border-2 col-span-10  flex justify-between flex-wrap gap-5"
		>
			<div>
				<h2 class="text-4xl font-bold">Fastest Competitions</h2>
				<Line style="mb-0" />
			</div>
			<div class="mt-auto mb-auto">
				<SelectFilter
					bind:value
					{options}
					textProperty="code"
					valueProperty="id"
					defaultText="All Leagues"
				/>
			</div>
		</div>

		<div
			class="bg-white dark:bg-grey px-[5vw] py-10 rounded-md dark:border-white/5 border-2 col-span-10  flex flex-col gap-8"
		>
			<Pagination />
			<FastestCompetitionsAllTime />
			<Pagination />
		</div>

		<NationMedalsRanking />

		<div
			class="bg-white dark:bg-grey px-[5vw] py-10 rounded-md dark:border-white/5 border-2 col-span-10 xl:col-span-4 row-span-2 shadow-[0_10px_50px_0_rgba(17,24,39,.05)]"
		>
			<h2 class="text-3xl shrink-0 mb-5">Quick Links/Other Content</h2>
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
				et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
				diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua.
			</p>
		</div>
	</div>
</section>
