<script lang="ts">
	import EventCard from '../../compnonents/home/EventCard.svelte';
	import type { Competition } from 'src/types/Competition';
	import { Input } from 'flowbite-svelte';

	export let data: {
		competitions: Competition[];
		fetch: (input: RequestInfo | URL) => Promise<Response>;
	};
	let fromDate: string;
	let toDate: string;
	let name: string;
	let timer: NodeJS.Timeout;

	const debounce = (newValue: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			name = newValue;
		}, 750);
	};

	async function handleSearch() {
		const response = await data.fetch(
			'https://api.speedclimbing.org/v1/competition?' +
				new URLSearchParams({
					from: fromDate,
					to: toDate,
					name: name
				})
		);
		const competitionsData: Competition[] = await response.json();

		competitionsData.forEach((competition: Competition) => {
			competition.from = new Date(competition.from);
			competition.to = new Date(competition.to);
		});
		data = { ...data, competitions: competitionsData };
	}
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
		<button on:click={() => handleSearch()}>Search</button>
	</div>
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
		{#each data.competitions as competition, index (index)}
			<EventCard {competition} />
		{/each}
	</div>
</section>
