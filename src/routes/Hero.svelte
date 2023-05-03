<script>
	import { goto } from '$app/navigation';
	import PrimaryButton from 'compnonents/shared/PrimaryButton.svelte';
	import Line from 'compnonents/shared/Line.svelte';
	import { Carousel } from 'flowbite-svelte';

	const images = [
		{
			id: 0,
			name: 'Source: IFSC',
			imgurl: '/images/52852741066_38ce95a27a_h.jpg',
			attribution: 'bla'
		},
		{
			id: 1,
			name: 'Source: IFSC',
			imgurl: '/images/Hero.jpg',
			attribution: 'bla'
		}
	];
</script>

<section id="hero" class="relative p-0 h-[700px]">
	<div class="h-[100%]">
		<Carousel
			{images}
			divClass="h-[100%]"
			slideClass="h-[100%] hero-slide flex overflow-hidden"
			captionClass="h-10 bg-gray-300 dark:bg-gray-700 dark:text-white p-2 m-2 text-center absolute bottom-0 right-0 rounded-md"
			showThumbs={false}
			showCaptions={true}
		/>
	</div>

	<div
		class="absolute top-0 left-0 pt-[230px] px-[10%] lg:px-[15%] w-[100%] h-[100%] hero-gradient"
	>
		<h1 class="font-Raleway text-[36px] sm:text-[56px] lg:text-[64px] leading-none mb-[30px]">
			<span class="text-white font-light">Welcome to</span><br />
			<span class="font-bold  text-red">Speedclimbing</span>
		</h1>
		<Line length="200px" />
		<p class="mt-[40px] mb-[30px] font-semibold text-white">
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
</section>

<style lang="postcss">
	.hero-gradient {
		background-image: linear-gradient(0deg, rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.6));
	}

	.hero-slide > img {
		felx: auto;
		display: none;
	}

	#hero {
		margin-top: -5rem;
	}
</style>
