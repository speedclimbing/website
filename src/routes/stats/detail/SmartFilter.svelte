<script lang="ts">
	import SelectFilter from 'components/shared/inputs/SelectFilter.svelte';
	import type { LeagueGroup } from 'types/LeagueGroup';
	import type { Nation } from 'types/Nation';
	import type { Season } from 'types/Season';

	export let value: string;
	export let filter: string;
	export let required: boolean;
	export let league_groups: LeagueGroup[];
	export let seasons: Season[];
	export let nations: Nation[];

	$: console.log(value);

	const options: Record<string, [string, string, string, Record<string, string | number>[]]> = {
		gender: ['Both', 'name', 'name', [{ name: 'Male' }, { name: 'Female' }]],
		league_group: ['All leagues', 'name', 'id', league_groups],
		year: ['All years', 'year', 'year', seasons.map((s) => ({ year: s.year.toString() }))],
		continent: [
			'All continents',
			'name',
			'name',
			[
				{ name: 'Africa' },
				{ name: 'Asia' },
				{ name: 'Europe' },
				{ name: 'Oceania' },
				{ name: 'PanAmerica' }
			]
		],
		nation_code_ioc: ['All nations', 'name', 'code_ioc', nations]
	};
</script>

<SelectFilter
	bind:value
	options={options[filter][3]}
	textProperty={options[filter][1]}
	valueProperty={options[filter][2]}
	defaultText={required ? undefined : options[filter][0]}
	defaultValue={required ? undefined : ''}
/>
