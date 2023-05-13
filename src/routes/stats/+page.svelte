<script lang="ts">
	import About from './About.svelte';
	import Hero from './Hero.svelte';
	import SeasonStats from './SeasonStats.svelte';
	import AllTimeStats from './AllTimeStats.svelte';

	let bar: HTMLElement;
	let showSeasonStats: boolean = true;

	const handleClickSeasonStats = () => {
		bar.style.marginLeft = '0';
		showSeasonStats = true;
	};

	const handleClickAllTimeStats = () => {
		bar.style.marginLeft = 'calc(100%/2)';
		showSeasonStats = false;
	};
</script>

<Hero />
<section class="bg-white dark:bg-black self ">
	<div class="grid grid-cols-2  items-center justify-items-center text-xl py-4 dark:text-white">
		<button class="cursor-pointer" on:click={handleClickSeasonStats}>Season Stats</button>
		<button class="cursor-pointer" on:click={handleClickAllTimeStats}>All time Stats</button>
	</div>

	<div class="bg-red rounded-sm w-[calc(100%/2)] h-1 transition-[margin-left] " bind:this={bar} />
</section>
{#if showSeasonStats}
	<SeasonStats />
	<About />
{:else}
	<AllTimeStats />
{/if}
