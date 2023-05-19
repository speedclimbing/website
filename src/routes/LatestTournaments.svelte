<script lang="ts">
	import EventCard from 'components/shared/content/EventCard.svelte';
	import PrimaryButton from 'components/shared/buttons/PrimaryButton.svelte';
	import type { Competition } from 'types/Competition';
	import { goto } from '$app/navigation';
	import TitleWithLine from 'components/shared/content/TitleWithLine.svelte';

	export let competitions: Competition[];
</script>

<section id="latest-tournaments" class="py-[100px]">
	<TitleWithLine titleText="Latest Competitions" titleClasses="text-center" lineClasses="mx-auto" />
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
		{#each competitions as competition, index (index)}
			<EventCard {competition} />
		{/each}
	</div>

	<PrimaryButton
		text="View all Competitions"
		onClick={() => goto('/competition')}
		style="mx-auto block"
	/>
</section>
