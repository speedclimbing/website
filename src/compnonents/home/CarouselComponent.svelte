<script lang="ts">
	import { goto } from '$app/navigation';
	import Line from 'compnonents/shared/content/Line.svelte';
	import PrimaryButton from 'compnonents/shared/buttons/PrimaryButton.svelte';

	export let image: string = '';
	export let imageClass: string = '';
	export let imageSource:
		| {
				url: string;
				alt: string;
		  }
		| undefined;
</script>

<div class="absolute top-0 left-0 w-[100%] h-[100%] pointer-events-none -z-10">
	<div class="bg-black opacity-40 inline-block w-[100%] h-[100%]">
		<img
			src={image}
			class="relative w-[100%] h-[100%] object-cover -z-20 {imageClass}"
			alt="hero"
		/>
	</div>
</div>

{#if imageSource}
	<a
		class="absolute bottom-4 right-4 px-4 py-2 bg-black rounded-md text-white"
		href={imageSource.url}
		target="_blank"
	>
		{imageSource.alt}
	</a>
{/if}

<div class="flex flex-col justify-center gap-0 mx-[10%] mg:px-[15%] h-[100%] w-[80%] mg:w-[70%]">
	<h1 class="font-Raleway text-[36px] sm:text-[56px] lg:text-[64px] leading-none">
		<span class="text-white font-light">Welcome to</span><br />
		<span class="font-bold  text-red">Speedclimbing</span>
	</h1>
	<Line length="200px" />
	<p class="mb-[30px] font-semibold text-white">
		The ultimate race to the top. Full of emotions,<br />adrenalin and sportsmanship. Take a look
		for yourself!
	</p>
	<div class="flex gap-3 flex-col sm:flex-row">
		<PrimaryButton text="Latest Competitions" onClick={() => goto('/competition')} />
		<button
			class={`py-3 w-[200px] border-2 text-white border-white bg-white/10 rounded-[3px] font-semibold`}
			>Top Climbers</button
		>
	</div>
</div>
