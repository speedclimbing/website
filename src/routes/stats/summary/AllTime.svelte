<script lang="ts">
	import SelectFilter, { type Filter } from 'components/shared/inputs/SelectFilter.svelte';
	import FastestCompetitionHistory from 'components/stats/LineChart.svelte';
	import BoxContainer from 'components/shared/layout/BoxContainer.svelte';
	import NationMedalsTable from 'components/stats/NationMedalsTable.svelte';
	import TitleWithLine from 'components/shared/content/TitleWithLine.svelte';
	import type { AllTimeSummary } from 'types/StatsSummary';
	import { formatName } from 'utils/formatName';
	import PaginatedTable from 'components/shared/pagination/PaginatedTable.svelte';
	import type { LeagueGroup } from 'types/LeagueGroup';
	import type { Nation } from 'types/Nation';
	import SmartTable from 'components/stats/SmartTable.svelte';
	import SecondaryButton from 'components/shared/buttons/SecondaryButton.svelte';
	import AlternativeButton from 'components/shared/buttons/AlternativeButton.svelte';

	export let allTimeSummary: AllTimeSummary;

	export let params: Record<string, string>;
	export let filters: Filter[];

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
			{#each filters.filter((f) => ['continent', 'nation_code_ioc'].includes(f.name)) as filter}
				<SelectFilter bind:value={params[filter.name]} {filter} />
			{/each}
		</div>
	</BoxContainer>
	<BoxContainer className="flex flex-col gap-5">
		<SmartTable data={allTimeSummary.ranking_athlete_time} pageSize={10} />
	</BoxContainer>

	<BoxContainer className="px-[3vw] xl:col-span-5">
		<h2 class="text-2xl mb-5">World-Record history</h2>
		<FastestCompetitionHistory
			data={allTimeSummary.history_world_record
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
			data={allTimeSummary.history_competition_fet.map((c) => {
				return { value: c.final_entry_time, label: formatCompetitionName(c.name) };
			})}
			name="FET"
		/>
	</BoxContainer>
	<BoxContainer className="flex justify-between gap-5 flex-wrap">
		<TitleWithLine titleText="Fastest Competitions" lineClasses="mb-0" />
		<div class="mt-auto mb-auto">
			{#each filters.filter((f) => ['league_group'].includes(f.name)) as filter}
				<SelectFilter bind:value={params[filter.name]} {filter} />
			{/each}
		</div>
	</BoxContainer>

	<BoxContainer className="flex flex-col gap-5">
		<SmartTable data={allTimeSummary.ranking_competition_fet} pageSize={10} />
	</BoxContainer>

	<BoxContainer className="xl:col-span-6">
		<NationMedalsTable data={allTimeSummary.ranking_nation_points_and_medals} />
	</BoxContainer>

	<BoxContainer className="xl:col-span-4">
		<h2 class="text-3xl  mb-5">Want to know more?</h2>
		<p class="pb-4">
			If you want more filter and options - <b>check out our detailed stats!</b> If that's still not
			enough for you, feel free to <b>reach out to us</b>. We are happy to hear your ideas and
			wishes for new and exciting statistics.
		</p>
		<div class="flex gap-2">
			<AlternativeButton
				style="!bg-red !text-white shrink-0"
				href="/stats/detail"
				text="detailed stats"
			/>

			<AlternativeButton
				style="dark:!text-yellow dark:border-yellow dark:border-2"
				href="/about-us#contact"
				text="contact us"
			/>
		</div>
	</BoxContainer>
</section>
