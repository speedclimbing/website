<script lang="ts">
	import SelectFilter from 'compnonents/shared/inputs/SelectFilter.svelte';
	import Pagination from 'compnonents/shared/pagination/Pagination.svelte';
	import FastestAthletesAllTime from 'compnonents/stats/FastestAthletesAllTime.svelte';
	import FastestCompetitionHistory from 'compnonents/stats/LineChart.svelte';
	import FastestCompetitionsAllTime from 'compnonents/stats/FastestCompetitionsAllTime.svelte';
	import BoxContainer from 'compnonents/shared/layout/BoxContainer.svelte';
	import NationMedalsTable from 'compnonents/stats/NationMedalsTable.svelte';
	import TitleWithLine from 'compnonents/shared/content/TitleWithLine.svelte';

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

	const comps = [
		{
			id: '187f82a0-7810-4000-8781-1429a2590a01',
			name: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
			location: 'Barcelona',
			from: '23.05.2022',
			to: '23.05.2022',
			nation_code_ioc: 'ESP',
			nation_code_alpha2: 'SP',
			league_id: '187f82a0-7810-4000-8388-f85648643a80',
			final_entry_time: 6.52
		},
		{
			id: '187f82a0-7810-4000-8781-1429a2590a01',
			name: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
			location: 'Barcelona',
			from: '23.05.2022',
			to: '23.05.2022',
			nation_code_ioc: 'ESP',
			nation_code_alpha2: 'SP',
			league_id: '187f82a0-7810-4000-8388-f85648643a80',
			final_entry_time: 6.38
		},
		{
			id: '187f82a0-7810-4000-8781-1429a2590a01',
			name: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
			location: 'Barcelona',
			from: '23.05.2022',
			to: '23.05.2022',
			nation_code_ioc: 'ESP',
			nation_code_alpha2: 'SP',
			league_id: '187f82a0-7810-4000-8388-f85648643a80',
			final_entry_time: 6.31
		},
		{
			id: '187f82a0-7810-4000-8781-1429a2590a01',
			name: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
			location: 'Barcelona',
			from: '23.05.2022',
			to: '23.05.2022',
			nation_code_ioc: 'ESP',
			nation_code_alpha2: 'SP',
			league_id: '187f82a0-7810-4000-8388-f85648643a80',
			final_entry_time: 6.18
		}
	];
</script>

<section class="bg-grey/10 dark:bg-dark-grey lg:px-[10%] px-[5%] py-[50px] grid grid-cols-10 gap-6">
	<BoxContainer className="flex justify-between flex-wrap gap-5">
		<TitleWithLine titleText="Time Records" lineColor="yellow" lineClasses="mb-0" />
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
	</BoxContainer>
	<BoxContainer className="flex flex-col gap-5">
		<Pagination />
		<FastestAthletesAllTime />
		<Pagination />
	</BoxContainer>

	<BoxContainer className="px-[3vw] xl:col-span-5">
		<h2 class="text-2xl mb-5">History of Fastest Athletes</h2>
		<FastestCompetitionHistory
			data={comps.map((c) => {
				return { value: c.final_entry_time, label: c.from };
			})}
			name="World records"
		/>
	</BoxContainer>
	<BoxContainer className="px-[3vw] xl:col-span-5">
		<h2 class="text-2xl mb-5">History of Fastest Competitions</h2>

		<FastestCompetitionHistory
			data={comps.map((c) => {
				return { value: c.final_entry_time, label: c.from };
			})}
			name="FET"
		/>
	</BoxContainer>
	<BoxContainer className="flex justify-between gap-5 flex-wrap">
		<TitleWithLine titleText="Fastest Competitions" lineClasses="mb-0" />
		<div class="mt-auto mb-auto">
			<SelectFilter
				bind:value
				{options}
				textProperty="code"
				valueProperty="id"
				defaultText="All Leagues"
			/>
		</div>
	</BoxContainer>

	<BoxContainer className="flex flex-col gap-5">
		<Pagination />
		<FastestCompetitionsAllTime />
		<Pagination />
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
		<h2 class="text-3xl  mb-5">Quick Links/Other Content</h2>
		<p>
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
			invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
			ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
			eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
		</p>
	</BoxContainer>
</section>
