<script>
	import PersonCard from '../compnonents/shared/PersonCard.svelte';
</script>

<section id="world-records" class="py-[100px]">
	<h2 class="text-4xl font-bold text-center">Current World Records</h2>
	<div id="line" class="bg-yellow rounded-sm w-[100px] h-1 mt-5 mb-10 mx-auto" />
	<div class="flex flex-col gap-20 mx-auto justify-center mt-20 items-center lg:flex-row lg:gap-10">
		<PersonCard
			image="/images/aleksandra-miroslaw-transparent.png"
			name="Aleksandra Miroslaw (POL)"
			time="6,53"
			subtitle="27. May 2022"
			color="#dd972a"
		/>
		<PersonCard
			image="/images/kiromal-katibin-transparent.png"
			name="Kiromal Katibin (INA)"
			time="5,00"
			subtitle="08. July 2022"
			color="#da3c2b"
		/>
	</div>
</section>
