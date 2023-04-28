<script>
	import { goto } from '$app/navigation';
	import Line from 'compnonents/shared/Line.svelte';
	import PrimaryButton from 'compnonents/shared/PrimaryButton.svelte';
	import SecondaryButton from 'compnonents/shared/SecondaryButton.svelte';
</script>

<section id="insights" class="py-[100px] flex gap-16 flex-col lg:items-center lg:flex-row">
	<img src="/images/Charts.png" alt="some statistics" class=" lg:w-[350px] xl:w-[500px]" />
	<div>
		<h2 class="text-4xl font-bold">Statistics</h2>
		<Line />
		<p class="mb-10 text-lg">
			Want to find out more about top athletes and teams? We put together some intresting rankings
			and statistics to give you a deeper insight to into the sport!
		</p>
		<div class="flex gap-3 flex-col px-[auto] sm:flex-row">
			<PrimaryButton text="Find out more" onClick={() => goto('/stats')} />
		</div>
	</div>
</section>
