<script lang="ts">
	import AthleteCard from './AthleteCard.svelte';
	import type { Gender } from 'src/types/Gender';
	import type { Athlete } from 'src/types/Athlete';
	import { Input, Spinner } from 'flowbite-svelte';
	import PrimaryButton from '../../compnonents/shared/PrimaryButton.svelte';

	let name: string;
	let nation: string;
	let gender: Gender;
	let personalBest: number;

	async function handleSearch(): Promise<Athlete[]> {
		const response = await fetch(
			'https://api.speedclimbing.org/v1/athlete?' +
				new URLSearchParams({
					name: (name ?? '').toLocaleLowerCase()
				})
		);

		const athletes: Athlete[] = await response.json();

		if (athletes.length == 0) {
			throw new Error('No athletes found');
		}

		return athletes;
	}

	let athletesPromise = handleSearch();

	let timer: NodeJS.Timeout;
	const debounce = (newValue: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			name = newValue;
			athletesPromise = handleSearch();
		}, 500);
	};
</script>

<section id="athletes">
	<div class="flex gap-[10px] mt-10">
		<Input
			type="text"
			id="name"
			placeholder="Name"
			required
			class="rounded-sm font-Raleway bg-black/5"
			on:keyup={({ target }) => {
				if (target instanceof HTMLInputElement) debounce(target.value);
			}}
		/>
	</div>
	{#await athletesPromise}
		<div class="flex justify-center items-center my-10">
			<Spinner />
		</div>
	{:then athletes}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
			{#each athletes as athlete, index (index)}
				<AthleteCard {athlete} />
			{/each}
		</div>
	{:catch error}
		<div class="flex justify-center items-center my-10">
			<p class="text-2xl font-semibold">{error.message}</p>
		</div>
	{/await}
</section>
