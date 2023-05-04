<script>
	import Carousel from 'compnonents/shared/Carousel.svelte';
	import CarouselComponent from 'compnonents/home/CarouselComponent.svelte';

	const carouselItems = [
		{
			properties: {
				image: '/images/52852741066_38ce95a27a_h.jpg',
				imageClass: 'object-right-top'
			},
			component: CarouselComponent
		},
		{
			properties: {
				image: '/images/Hero.jpg',
				imageClass: 'object-top'
			},
			component: CarouselComponent
		}
	];
</script>

<section id="hero" class="relative p-0">
	<div class="top-0 left-0  w-[100%] pointer-events-none">
		<Carousel items={carouselItems} class="w-[100%] h-[45rem]" />
	</div>
</section>

<style lang="postcss">
	#hero {
		margin-top: -5rem;
	}
</style>
