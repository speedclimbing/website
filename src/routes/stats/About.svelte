<script>
	import { BookOpen, ChartBar, Envelope } from 'svelte-heros-v2';
	import IconBox from '../../compnonents/shared/IconBox.svelte';
	import Line from '../../compnonents/shared/Line.svelte';
</script>

<section id="about" class="py-[100px]">
	<h2 class="text-4xl font-bold text-center">About the Numbers</h2>
	<Line color="red" style="mx-auto" />
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
		<IconBox color="red" title="Our sources">
			<BookOpen slot="icon" class="text-red" />
			<p slot="text">
				All of our data comes from official sources, like
				<a href="https://ifsc.results.info"> ifsc.results.info </a>
				or <a href="https://digitalrock.de">digitalrock.de</a>. We collect it in a unified database
				and update it regularly.
			</p>
		</IconBox>
		<IconBox color="red" title="How we calculate">
			<ChartBar slot="icon" class="text-red" />
			<p slot="text">
				All statistics are calculated in real time on the latest data. Point-based statistics are
				based on the official rules.
			</p>
		</IconBox>
		<IconBox color="red" title="Suggestions">
			<Envelope slot="icon" class="text-red" />
			<p slot="text">
				Do you have any suggestions, or found something wrong or missing? We'd be happy to
				<a href="/about-us#contact">hear your feedback</a>!
			</p>
		</IconBox>
	</div>
</section>
