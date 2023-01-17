<script>
	import { Img, P } from 'flowbite-svelte';
	import Line from '../../compnonents/shared/Line.svelte';
</script>

<section class="py-6">
	<h2 class="text-4xl font-bold" id="the-wall">The wall</h2>
	<Line color="red" />

	<P firstupper class="pb-6">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu convallis ligula. Fusce semper
		finibus eros at hendrerit. Duis vitae leo sem. Sed id mollis turpis. Suspendisse ante lacus,
		egestas sit amet luctus ut, maximus id ante. Vestibulum elementum urna nec nisi pellentesque, et
		cursus est interdum. Integer scelerisque arcu a sapien laoreet, sit amet fringilla nisl
		vulputate. Etiam id mauris eget sem pretium placerat.
	</P>

	<Img
		alt="wall-olympia"
		src="/images/about/wall-olympia.jpg"
		class="rounded-lg"
		caption="The speed climbing wall at Olympia in Tokyo, 2021"
	/>
</section>
