<script lang="ts">
	import SwitchButton from '../../compnonents/shared/SwitchButton.svelte';
	import About from './About.svelte';
	import Hero from './Hero.svelte';
	import StatOverview from './StatOverview.svelte';

	let bar: HTMLElement;

	const handleClickSeasonStats = () => {
		bar.style.marginLeft = '0';
	};

	const handleClickAllTimeStats = () => {
		bar.style.marginLeft = 'calc(100%/3)';
	};
</script>

<Hero />
<section class="bg-white dark:bg-black self ">
	<div class="grid grid-cols-3 items-center justify-items-center text-xl py-4 dark:text-white">
		<button class="cursor-pointer" on:click={handleClickSeasonStats}>Season Stats</button>
		<button class="cursor-pointer" on:click={handleClickAllTimeStats}>All time Stats</button>
		<SwitchButton leftClickAction={() => {}} rightClickAction={() => {}} />
	</div>
	<div class="bg-red rounded-sm w-[calc(100%/3)] h-1 transition-[margin-left] " bind:this={bar} />
</section>
<StatOverview />
<About />
