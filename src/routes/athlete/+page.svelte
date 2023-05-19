<script lang="ts">
	import AthleteCard from './AthleteCard.svelte';
	import type { Gender } from 'types/Gender';
	import { Select, Spinner } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { mounted } from 'utils/mounted';
	import { updateSearchParams } from 'utils/updateSearchParams';
	import DebouncedInput from 'components/shared/inputs/DebouncedInput.svelte';
	import { navigating } from '$app/stores';

	export let data: PageData;
	let params = data.params;

	const handleSearch = async (
		name: string,
		nation: string,
		gender: Gender | '',
		personalBest: number | ''
	) => {
		updateSearchParams({ name, nation, gender, personalBest });
	};

	const isMounted = () => $mounted;
	$: {
		if (!browser || !isMounted()) break $;

		handleSearch(params.name, params.nation, params.gender, params.personalBest);
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
		<DebouncedInput
			type="text"
			placeholder="Name"
			inputClass="rounded-sm font-Raleway bg-black/5 lg:col-span-2"
			bind:value={params.name}
		/>
		<Select bind:value={params.gender} placeholder="">
			{#each genderSelect as { value, name }}
				<option {value}>{name}</option>
			{/each}
		</Select>
		<DebouncedInput
			type="number"
			placeholder="PB lower than"
			inputClass="rounded-sm font-Raleway bg-black/5"
			bind:value={params.personalBest}
		/>
	</div>

	{#if $navigating}
		<div class="flex justify-center items-center my-10">
			<Spinner />
		</div>
	{:else if data.athletes.length === 0}
		<div class="flex justify-center items-center my-10">
			<p class="text-2xl font-semibold">No athletes found</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
			{#each data.athletes as athlete, index (index)}
				<AthleteCard {athlete} />
			{/each}
		</div>
	{/if}
</section>
