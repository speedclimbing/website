<script lang="ts">
	import EventCard from '../../compnonents/home/EventCard.svelte';
	import type { Competition } from 'src/types/Competition';
	import { Input, Select } from 'flowbite-svelte';
	import PrimaryButton from '../../compnonents/shared/PrimaryButton.svelte';
	import type { Nation } from 'src/types/Nation';

	export let data: {
		competitions: Competition[];
		fetch: (input: RequestInfo | URL) => Promise<Response>;
		nations: Nation[];
	};
	let fromDate: string = '';
	let toDate: string = '';
	let name: string = '';
	let nation: string = '';

	async function handleSearch() {
		const response = await data.fetch(
			'https://api.speedclimbing.org/v1/competition?' +
				new URLSearchParams({
					from: fromDate,
					to: toDate,
					name: name,
					nation: nation
				})
		);
		const competitionsData: Competition[] = await response.json();

		competitionsData.forEach((competition: Competition) => {
			competition.from = new Date(competition.from);
			competition.to = new Date(competition.to);
		});
		data = { ...data, competitions: competitionsData };
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
		<input type="date" bind:value={fromDate} />
		<input type="date" bind:value={toDate} />
		<Select items={nationSelect} bind:value={nation} placeholder="Select Nation" />
		<PrimaryButton onClick={() => handleSearch()} text="Search" />
	</div>
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
		{#each data.competitions as competition, index (index)}
			<EventCard {competition} />
		{/each}
	</div>
</section>
