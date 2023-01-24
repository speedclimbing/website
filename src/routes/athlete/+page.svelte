<script lang="ts">
	import AthleteCard from './AthleteCard.svelte';
	import type { Gender } from 'src/types/Gender';
	import { Input, Select, Spinner } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { _handleSearch } from './+page';
	import { browser } from '$app/environment';

	export let data: PageData;
	let athletesPromise = (data?.athletesPromises ?? [Promise.resolve([])])[0];
	let atletes = data.athletes ?? [];

	let name: string | undefined = data.url.searchParams.get('name') ?? '';
	let nation: string | undefined;
	let gender: Gender | undefined;
	let personalBest: number | undefined;

	$: {
		athletesPromise = _handleSearch(name, nation, gender, personalBest);
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
	{#if browser}
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
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
			{#each atletes as athlete, index (index)}
				<AthleteCard {athlete} />
			{/each}
		</div>
	{/if}
</section>
