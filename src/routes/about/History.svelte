<script>
	import { Img, P, Timeline, TimelineItem } from 'flowbite-svelte';
	import Line from '../../compnonents/shared/Line.svelte';
	import PrimaryButton from '../../compnonents/shared/PrimaryButton.svelte';
	import { goto } from '$app/navigation';
</script>

<section class="py-6">
	<h2 class="text-4xl font-bold" id="the-sport">Where did it come from?</h2>
	<Line color="red" />

	<P>
		As you might know, modern (norm-) speedclimbing is a rather young sport. However, it came a long
		way to become what it is today! We summarized the most important milestones for you! Check out
		the <a href="/about/history">timeline to learn more</a>.
	</P>
</section>
