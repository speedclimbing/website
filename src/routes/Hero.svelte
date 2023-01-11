<script>
	import SecondaryButton from '../compnonents/shared/SecondaryButton.svelte';
	import PrimaryButton from '../compnonents/shared/PrimaryButton.svelte';
	import Line from '../compnonents/shared/Line.svelte';
</script>

<section id="hero" class="hero-image pb-[150px] pt-[230px]">
	<h1 class="font-Raleway text-[36px] sm:text-[56px] lg:text-[64px] leading-none mb-[30px]">
		<span class="text-white font-light">Welcome to</span><br />
		<span class="font-bold  text-black">Speedclimbing</span>
	</h1>
	<Line length="200px" />
	<p class="mt-[40px] mb-[30px] font-semibold text-white">
		The ultimate race to the top. Full of emotions,<br />adrenalin and sportsmanship. Take a look
		for yourself!
	</p>
	<div class="flex gap-3 flex-col sm:flex-row">
		<PrimaryButton text="Latest Tournaments" />
		<button
			class={`py-3 w-[200px] border-2 text-white border-white bg-white/10 rounded-[3px] font-semibold`}
			>Top Climbers</button
		>
	</div>
</section>

<style>
	.hero-image {
		background-image: linear-gradient(0deg, rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.6)),
			url('/images/Hero.jpg');
		background-position: 50% 10%;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
