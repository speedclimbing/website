<script lang="ts">
	import About from './About.svelte';
	import Insights from './Insights.svelte';
	import LatestTournaments from './LatestTournaments.svelte';
	import Rankings from './Rankings.svelte';
	import WorldRecords from './WorldRecords.svelte';
	import Hero from './Hero.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home of Speedclimbing.org</title>
	<meta
		name="description"
		content="Your Page for the current and past statistics about Speedclimbing. 
		See everything about the current world records, the latest tournaments and the performance of the athlets."
	/>
</svelte:head>

<Hero heroImages={data.heroImages} />
<WorldRecords
	worldRecordMale={data.data.male_worldranking[0]}
	worldRecordFemale={data.data.female_worldranking[0]}
/>
<Rankings
	worldRankingsMale={data.data.male_worldranking}
	worldRankingsFemale={data.data.female_worldranking}
/>
<LatestTournaments competitions={data.data.latest_competitions} />
<Insights />
<About />
