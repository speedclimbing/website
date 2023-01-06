<script>
	import Line from '../compnonents/shared/Line.svelte';
	import PrimaryButton from '../compnonents/shared/PrimaryButton.svelte';
	import SecondaryButton from '../compnonents/shared/SecondaryButton.svelte';
</script>

<section id="insights" class="px-[10%] py-[100px] flex gap-16 flex-col lg:items-center lg:flex-row">
	<img src="/images/Charts.png" alt="some statistics" class=" lg:w-[350px] xl:w-[500px]" />
	<div>
		<h2 class="text-4xl font-bold">Deep Insights</h2>
		<Line />
		<p class="mb-10">
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
			invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
			ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
			eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
		</p>
		<div class="flex gap-3 flex-col px-[auto] sm:flex-row">
			<PrimaryButton text="Latest Tournaments" />
			<SecondaryButton text="Top Climbers" />
		</div>
	</div>
</section>
