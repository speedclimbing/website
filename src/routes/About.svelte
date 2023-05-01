<script>
	import { goto } from '$app/navigation';
	import IconBox from 'compnonents/shared/IconBox.svelte';
	import Line from 'compnonents/shared/Line.svelte';
	import { P } from 'flowbite-svelte';
	import { BarsArrowUp, BookOpen, Trophy } from 'svelte-heros-v2';
</script>

<section id="about" class="py-[100px]">
	<h2 class="text-4xl font-bold">About Speedclimbing</h2>
	<Line color="yellow" />

	<p class=" text-xl pb-10">
		You have never heard of speedclimbing? This is the perfect place to get up to speed and learn
		more about the sport!
	</p>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
		<IconBox title="The sport" onClick={() => goto('/about#the-sport')}>
			<Trophy slot="icon" size="40" class="text-yellow" />
			<p slot="text">
				Speedclimbing is one of the three disciplines in modern sports climbing. The biggest
				difference to lead or bouldering is the standardized wall - and ofcourse the speed!
			</p>
		</IconBox>
		<IconBox title="The wall" onClick={() => goto('/about#the-wall')}>
			<BarsArrowUp slot="icon" size="40" class="text-yellow" />
			<p slot="text">
				The speedclimbing wall, as it is known today das designed arond 2007 and has not changed
				since. Everything about it is precisely normed - it is exactly the same all around the
				world.
			</p>
		</IconBox>
		<IconBox title="The rules" onClick={() => goto('/about#the-rules')} text="">
			<BookOpen slot="icon" size="40" class="text-yellow" />
			<p slot="text">
				A speedclimbing competition consists of two parts:
				<b>training</b>,
				<b>qualification</b>
				and
				<b>final</b>. Every athlete starts with training and qualification and eventually proceeds
				to the finals.
			</p>
		</IconBox>
	</div>
</section>
