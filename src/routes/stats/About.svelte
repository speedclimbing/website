<script>
	import IconBox from '../../compnonents/shared/IconBox.svelte';
	import Line from '../../compnonents/shared/Line.svelte';
</script>

<section id="about" class="py-[100px]">
	<h2 class="text-4xl font-bold text-center">About the Numbers</h2>
	<Line color="red" style="mx-auto" />
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
		<IconBox color="red" />
		<IconBox color="red" />
		<IconBox color="red" />
	</div>
</section>
