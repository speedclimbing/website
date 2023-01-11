<script>
	import PersonCard from '../../compnonents/shared/PersonCard.svelte';
	import Line from '../../compnonents/shared/Line.svelte';
</script>

<main>
	<section class="px-[10%] py-[100px]">
		<h2 class="text-4xl font-bold">The team</h2>
		<Line color="red" />

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-items-center">
			<PersonCard
				image="/images/dorian-zedler-transparent.png"
				name="Dorian Zedler"
				color="#225db6"
			/>
			<PersonCard name="Jakob Mayerhofer" color="#225db6" />
			<PersonCard
				image="/images/peter-schnabel-transparent.png"
				name="Peter Schnabel"
				color="#225db6"
			/>
			<PersonCard name="Hagen Schnabel" color="#225db6" />
		</div>
	</section>
</main>
