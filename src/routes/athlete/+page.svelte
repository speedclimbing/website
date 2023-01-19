<script lang="ts">
	import AthleteCard from './AthleteCard.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section id="athletes">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
		{#each data.athletes as athlete, index (index)}
			<AthleteCard {athlete} />
		{/each}
	</div>
</section>
