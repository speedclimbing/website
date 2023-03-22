<script lang="ts">
	import EventCard from '../../compnonents/home/EventCard.svelte';
	import type { Competition } from 'src/types/Competition';
	import type { League } from 'src/types/League';
	import { Input, Select } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let name: string = '';
	let nation: string = '';
	const currentYear: number = new Date().getFullYear();
	let year: number = currentYear;
	let leagueId: string = '';

	async function handleSearch(year: number, name: string, nation: string, leagueId: string) {
		const competitionResponse = await data.fetch(
			'https://api.speedclimbing.org/v1/competition?' +
				new URLSearchParams({
					from: new Date(year, 0, 1).toISOString().substring(0, 10),
					to: new Date(year, 11, 31).toISOString().substring(0, 10),
					name: name,
					nation: nation,
					league: leagueId
				})
		);
		const competitionsData: Competition[] = await competitionResponse.json();

		competitionsData.forEach((competition: Competition) => {
			competition.from = new Date(competition.from);
			competition.to = new Date(competition.to);
		});

		const leaugeResponse = await data.fetch(
			'https://api.speedclimbing.org/v1/league?' +
				new URLSearchParams({
					year: year.toString()
				})
		);
		const leaguesData: League[] = await leaugeResponse.json();

		data = { ...data, competitions: competitionsData, leagues: leaguesData };
	}

	$: {
		handleSearch(year, name, nation, leagueId);
	}

	let nationSelect = data.nations.map((n) => {
		return { value: n.id, name: n.code };
	});
	nationSelect.sort((a, b) => {
		return a.name < b.name ? -1 : 1;
	});
	nationSelect.unshift({ value: '#', name: 'All nations' });

	let timer: NodeJS.Timeout;
	const debounce = (newValue: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			name = newValue;
		}, 500);
	};
</script>

<section id="competitions">
	<div class="flex gap-[10px] mt-10">
		<Input
			type="text"
			id="name"
			placeholder="Competition Name"
			required
			class="rounded-sm font-Raleway bg-black/5"
			on:keyup={({ target }) => {
				if (target instanceof HTMLInputElement) debounce(target.value);
			}}
		/>
		<select
			bind:value={year}
			on:change={() => {
				leagueId = '';
			}}
		>
			{#each [...Array(10).keys()] as number}
				<option>{currentYear - number}</option>
			{/each}
		</select>
		<select bind:value={leagueId}>
			<option value="">All Leagues</option>
			{#each data.leagues as l}
				<option value={l.id}>{l.name}</option>
			{/each}
		</select>

		<Select items={nationSelect} bind:value={nation} placeholder="Select Nation" />
	</div>
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
		{#each data.competitions as competition, index (index)}
			<EventCard {competition} />
		{/each}
	</div>
</section>
