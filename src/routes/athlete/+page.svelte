<script lang="ts">
	import AthleteCard from './AthleteCard.svelte';
	import type { Gender } from 'src/types/Gender';
	import type { Athlete } from 'src/types/Athlete';
	import { Input, Select, Spinner } from 'flowbite-svelte';
	import PrimaryButton from '../../compnonents/shared/PrimaryButton.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let { fetch } = data;

	let name: string;
	let nation: string;
	let gender: Gender;
	let personalBest: number;

	async function handleSearch(
		name: string,
		nation: string,
		gender: Gender,
		personalBest: number
	): Promise<Athlete[]> {
		await debounce();
		const response = await fetch(
			'https://api.speedclimbing.org/v1/athlete?' +
				new URLSearchParams({
					name: (name ?? '').toLocaleLowerCase(),
					nation: nation ?? '',
					gender: gender ?? '',
					personal_best: personalBest?.toString() ?? ''
				})
		);

		const athletes: Athlete[] = await response.json();

		if (athletes.length == 0) {
			throw new Error('No athletes found');
		}

		return athletes;
	}

	let athletesPromise: Promise<Athlete[]>;
	$: {
		athletesPromise = handleSearch(name, nation, gender, personalBest);
	}

	let timer: NodeJS.Timeout;
	async function debounce(): Promise<void> {
		return new Promise((resolve, _) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				resolve();
			}, 500);
		});
	}

	const genderSelect = [
		{
			name: 'male and female',
			value: undefined
		},
		{
			name: 'male',
			value: 'Male'
		},
		{
			name: 'female',
			value: 'Female'
		}
	];
</script>

<section id="athletes">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
		<Input
			type="text"
			placeholder="Name"
			class="rounded-sm font-Raleway bg-black/5 col-span-2"
			bind:value={name}
		/>
		<Select items={genderSelect} bind:value={gender} placeholder="Select gender" />
		<Input
			type="number"
			placeholder="PB lower than"
			class="rounded-sm font-Raleway bg-black/5"
			bind:value={personalBest}
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
