<script lang="ts">
	import AthleteCard from './AthleteCard.svelte';
	import type { Gender } from '../../types/Gender';
	import { Input, Select, Spinner } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { _handleSearch } from './+page';
	import type { Athlete } from '../../types/Athlete';
	import { browser } from '$app/environment';
	import { mounted } from '../../utils/mounted';
	import { debounce } from '../../utils/debounce';

	export let data: PageData;
	let athletes: Athlete[] | Promise<Athlete[]> = data.athletes;

	let name: string | '' = data.url.searchParams.get('name') ?? '';
	let nation: string | '';
	let gender: Gender | '' = '';
	let personalBest: number | '' = '';

	const handleSearch = async (
		name: string,
		nation: string,
		gender?: Gender,
		personalBest?: number
	) => {
		if (!(await debounce())) return;

		athletes = _handleSearch(data.fetch, { name, nation, gender, personalBest });
	};

	const isMounted = () => $mounted;
	$: {
		if (!browser || !isMounted()) break $;

		handleSearch(
			name,
			nation,
			gender === '' ? undefined : gender,
			personalBest === '' ? undefined : personalBest
		);
	}

	const genderSelect = [
		{
			name: 'male and female',
			value: ''
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
	<div class="grid grid-cols-1 lg:grid-cols-2 grid-rows-3 lg:grid-rows-2 gap-5 my-10">
		<Input
			type="text"
			placeholder="Name"
			class="rounded-sm font-Raleway bg-black/5 lg:col-span-2"
			bind:value={name}
		/>
		<Select bind:value={gender} placeholder="">
			{#each genderSelect as { value, name }}
				<option {value}>{name}</option>
			{/each}
		</Select>
		<Input
			type="number"
			placeholder="PB lower than"
			class="rounded-sm font-Raleway bg-black/5"
			bind:value={personalBest}
		/>
	</div>
	{#await athletes}
		<div class="flex justify-center items-center my-10">
			<Spinner />
		</div>
	{:then athletes}
		{#if athletes.length === 0}
			<div class="flex justify-center items-center my-10">
				<p class="text-2xl font-semibold">No athletes found</p>
			</div>
		{/if}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
			{#each athletes as athlete, index (index)}
				<a href="/athlete/{athlete.id}">
					<AthleteCard {athlete} />
				</a>
			{/each}
		</div>
	{:catch error}
		<div class="flex justify-center items-center my-10">
			<p class="text-2xl font-semibold">Error: {error.message}</p>
		</div>
	{/await}
</section>
