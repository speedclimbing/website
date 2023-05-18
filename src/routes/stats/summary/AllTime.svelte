<script lang="ts">
	import SelectFilter from 'compnonents/shared/inputs/SelectFilter.svelte';
	import FastestCompetitionHistory from 'compnonents/stats/LineChart.svelte';
	import BoxContainer from 'compnonents/shared/layout/BoxContainer.svelte';
	import NationMedalsTable from 'compnonents/stats/NationMedalsTable.svelte';
	import TitleWithLine from 'compnonents/shared/content/TitleWithLine.svelte';
	import type { AllTimeSummary } from 'types/StatsSummary';
	import { formatName } from 'utils/formatName';
	import PaginatedTable from 'compnonents/shared/pagination/PaginatedTable.svelte';
	import type { LeagueGroup } from 'types/LeagueGroup';
	import type { Nation } from 'types/Nation';

	export let allTimeData: {
		allTimeSummary: AllTimeSummary;
		leagueGroups: LeagueGroup[];
		nations: Nation[];
	};

	export let leagueGroup: string | undefined;
	export let nation: string | undefined;
	export let continent: string | undefined;

	const formatCompetitionName = (name: string) => {
		// turn IFSC - Climbing World Cup (L,S) - Villars (SUI) 2021 into Villars 2021 using regex
		const regex = /(?:[^(]+) \((?:[^)]+)\) - ([^(]+) \((?:[A-Z]{3})\) (\d{4})/g;
		const match = regex.exec(name);
		if (match) {
			return `${match[1]} ${match[2]}`;
		}
		return name;
	};
</script>

<section class="bg-grey/10 dark:bg-dark-grey lg:px-[10%] px-[5%] py-[50px] grid grid-cols-10 gap-6">
	<BoxContainer className="flex justify-between flex-wrap gap-5">
		<TitleWithLine titleText="Time Records" lineColor="yellow" lineClasses="mb-0" />
		<div class="mt-auto mb-auto flex gap-5 flex-wrap">
			<SelectFilter
				bind:value={continent}
				options={['Africa', 'Asia', 'Europe', 'Oceania', 'PanAmerica'].map((c) => {
					return { name: c };
				})}
				textProperty="name"
				valueProperty="name"
				defaultText="All Continents"
			/>
			<SelectFilter
				bind:value={nation}
				options={allTimeData.nations.filter((n) => !continent || n.continent === continent)}
				textProperty="name"
				valueProperty="code_ioc"
				defaultText="All Nations"
				optgroup={{
					property: 'continent',
					defaultText: 'World-wide'
				}}
			/>
		</div>
	</BoxContainer>
	<BoxContainer className="flex flex-col gap-5">
		<PaginatedTable
			tableObjects={allTimeData.allTimeSummary.ranking_athlete_time.map((a, i) => [
				i + 1,
				formatName(a),
				a.nation_code_ioc,
				(a.time / 1000).toFixed(3),
				a.competition_date.toLocaleDateString(),
				a.competition_name
			])}
			columnNames={['Rank', 'Full name', 'Nation', 'Time', 'Date', 'Competition']}
			pageSize={10}
		/>
	</BoxContainer>

	<BoxContainer className="px-[3vw] xl:col-span-5">
		<h2 class="text-2xl mb-5">World-Record history</h2>
		<FastestCompetitionHistory
			data={allTimeData.allTimeSummary.history_world_record
				.sort((a, b) => b.time - a.time)
				.map((c) => {
					return { value: c.time, label: formatCompetitionName(c.competition_name) };
				})}
			name="World records"
		/>
	</BoxContainer>
	<BoxContainer className="px-[3vw] xl:col-span-5">
		<h2 class="text-2xl mb-5">Final entry time history</h2>

		<FastestCompetitionHistory
			data={allTimeData.allTimeSummary.history_competition_fet.map((c) => {
				return { value: c.final_entry_time, label: formatCompetitionName(c.name) };
			})}
			name="FET"
		/>
	</BoxContainer>
	<BoxContainer className="flex justify-between gap-5 flex-wrap">
		<TitleWithLine titleText="Fastest Competitions" lineClasses="mb-0" />
		<div class="mt-auto mb-auto">
			<SelectFilter
				bind:value={leagueGroup}
				options={allTimeData.leagueGroups}
				textProperty="name"
				valueProperty="id"
				defaultText="All Leagues"
				optgroup={{
					property: 'continent',
					defaultText: 'World-wide'
				}}
			/>
		</div>
	</BoxContainer>

	<BoxContainer className="flex flex-col gap-5">
		<PaginatedTable
			tableObjects={allTimeData.allTimeSummary.ranking_competition_fet.map((c, i) => [
				i + 1,
				c.name,
				(c.final_entry_time / 1000).toFixed(3),
				c.from.toLocaleDateString()
			])}
			columnNames={['rank', 'competition', 'Fet', 'date']}
			pageSize={10}
		/>
	</BoxContainer>

	<BoxContainer className="xl:col-span-6">
		<NationMedalsTable data={allTimeData.allTimeSummary.ranking_nation_points_and_medals} />
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