<script>
	import { goto } from '$app/navigation';
	import PrimaryButton from 'compnonents/shared/buttons/PrimaryButton.svelte';
	import TitleWithLine from 'compnonents/shared/content/TitleWithLine.svelte';
</script>

<section id="insights" class="py-[100px] flex gap-16 flex-col lg:items-center lg:flex-row">
	<img src="/images/Charts.png" alt="some statistics" class=" lg:w-[350px] xl:w-[500px]" />
	<div>
		<TitleWithLine titleText="Statistics" />
		<p class="mb-10 text-lg">
			Want to find out more about top athletes and teams? We put together some intresting rankings
			and statistics to give you a deeper insight to into the sport!
		</p>
		<PrimaryButton text="Find out more" onClick={() => goto('/stats')} style="px-auto" />
	</div>
</section>
