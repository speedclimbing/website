<script lang="ts">
	import Carousel from 'components/shared/Carousel.svelte';
	import CarouselComponent from 'components/home/CarouselComponent.svelte';
	import { MEDIA_URL } from 'utils/constants';

	export let heroImages: string[][];

	const carouselItems = heroImages.map((image) => {
		return {
			properties: {
				image: `${MEDIA_URL}/image/hero/${image[0]}`,
				imageClass: image[4],
				imageSource: {
					url: image[2],
					alt: `Source: ${image[1]}`
				}
			},
			component: CarouselComponent
		};
	});
</script>

<section id="hero" class="relative p-0">
	<div class="top-0 left-0  w-[100%] pointer-events-none">
		<Carousel items={carouselItems} bottomNav={false} class="w-[100%] h-[45rem]" />
	</div>
</section>

<style lang="postcss">
	#hero {
		margin-top: -5rem;
	}
</style>
