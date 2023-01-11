<script>
	import SecondaryButton from '../compnonents/shared/SecondaryButton.svelte';
	import PrimaryButton from '../compnonents/shared/PrimaryButton.svelte';
	import Line from '../compnonents/shared/Line.svelte';
</script>

<section id="hero" class="hero-image py-[150px]">
	<h1 class="font-Raleway text-[36px] sm:text-[56px] lg:text-[64px] leading-none mb-[30px]">
		<span class="text-white font-light">Welcome to</span><br />
		<span class="font-bold  text-black">Speedclimbing</span>
	</h1>
	<Line length="200px" />
	<p class="mt-[40px] mb-[30px] font-semibold">
		The ultimate race to the top. Full of emotions,<br />adrenalin and sportsmanship. Take a look
		for yourself!
	</p>
	<div class="flex gap-3 flex-col sm:flex-row">
		<PrimaryButton text="Latest Tournaments" />
		<SecondaryButton text="Top Climbers" />
	</div>
</section>
