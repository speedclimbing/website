<script lang="ts">
	import About from './About.svelte';
	import Insights from './Insights.svelte';
	import LatestTournaments from './LatestTournaments.svelte';
	import Rankings from './Rankings.svelte';
	import WorldRecords from './WorldRecords.svelte';
	import Hero from './Hero.svelte';
	import type { HomePageData } from 'src/types/Api';

	export let data: HomePageData;
</script>

<Hero />
<WorldRecords
	worldRecordMale={data.male_worldranking[0]}
	worldRecordFemale={data.female_worldranking[0]}
/>
<Rankings
	worldRankingsMale={data.male_worldranking}
	worldRankingsFemale={data.female_worldranking}
/>
<LatestTournaments competitions={data.latest_competitions} />
<Insights />
<About />
