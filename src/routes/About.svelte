<script>
	import { goto } from '$app/navigation';
	import { BarsArrowUp, BookOpen, Trophy } from 'svelte-heros-v2';
	import IconBox from '../compnonents/home/IconBox.svelte';
	import Line from '../compnonents/shared/Line.svelte';
</script>

<section id="about" class="py-[100px]">
	<h2 class="text-4xl font-bold">About SpeedClimbing</h2>
	<Line color="yellow" />
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
		<IconBox title="The sport" onClick={() => goto('/about#the-sport')}>
			<Trophy size="40" class="text-yellow" />
		</IconBox>
		<IconBox title="The wall" onClick={() => goto('/about#the-wall')}>
			<BarsArrowUp size="40" class="text-yellow" />
		</IconBox>
		<IconBox title="The rules" onClick={() => goto('/about#the-rules')}>
			<BookOpen size="40" class="text-yellow" />
		</IconBox>
	</div>
</section>
