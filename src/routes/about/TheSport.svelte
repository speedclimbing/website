<script>
	import { Img, P, Timeline, TimelineItem } from 'flowbite-svelte';

	import Line from '../../compnonents/shared/Line.svelte';
</script>

<section class="pt-[100px] py-6">
	<h2 class="text-4xl font-bold" id="the-sport">The sport</h2>
	<Line color="red" />

	<P firstupper class="pb-6">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu convallis ligula. Fusce semper
		finibus eros at hendrerit. Duis vitae leo sem. Sed id mollis turpis. Suspendisse ante lacus,
		egestas sit amet luctus ut, maximus id ante. Vestibulum elementum urna nec nisi pellentesque, et
		cursus est interdum. Integer scelerisque arcu a sapien laoreet, sit amet fringilla nisl
		vulputate. Etiam id mauris eget sem pretium placerat.
	</P>

	<Timeline>
		<TimelineItem
			title="First recorded speedclimbing competition"
			date="Tue, 1 Oct - Wed, 2 Oct 1991"
		>
			<P>
				<a href="https://ifsc.results.info/#/event/103">link</a>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu convallis ligula. Fusce semper
				finibus eros at hendrerit. Duis vitae leo sem. Sed id mollis turpis. Suspendisse ante lacus,
				egestas sit amet luctus ut, maximus id ante. Vestibulum elementum urna nec nisi pellentesque,
				et cursus est interdum. Integer scelerisque arcu a sapien laoreet, sit amet fringilla nisl vulputate.
				Etiam id mauris eget sem pretium placerat.
			</P>
		</TimelineItem>

		<TimelineItem title="Introduction of the 10m speedwall" date="some date">
			<P>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu convallis ligula. Fusce
				semper finibus eros at hendrerit. Duis vitae leo sem. Sed id mollis turpis. Suspendisse ante
				lacus, egestas sit amet luctus ut, maximus id ante. Vestibulum elementum urna nec nisi
				pellentesque, et cursus est interdum. Integer scelerisque arcu a sapien laoreet, sit amet
				fringilla nisl vulputate. Etiam id mauris eget sem pretium placerat.
			</P>
		</TimelineItem>

		<TimelineItem title="'Norm-Speed' becomes its own discipline" date="some date">
			<P>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu convallis ligula. Fusce
				semper finibus eros at hendrerit. Duis vitae leo sem. Sed id mollis turpis. Suspendisse ante
				lacus, egestas sit amet luctus ut, maximus id ante. Vestibulum elementum urna nec nisi
				pellentesque, et cursus est interdum. Integer scelerisque arcu a sapien laoreet, sit amet
				fringilla nisl vulputate. Etiam id mauris eget sem pretium placerat.
			</P>
		</TimelineItem>

		<TimelineItem title="Introduction of the 15m speedwall" date="some date">
			<Img
				alt="venue-munich"
				src="/images/about/venue-munich.jpg"
				class="rounded-lg"
				caption="Venue at the european championships 2022 in Munich"
			/>
			<P>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu convallis ligula. Fusce
				semper finibus eros at hendrerit. Duis vitae leo sem. Sed id mollis turpis. Suspendisse ante
				lacus, egestas sit amet luctus ut, maximus id ante. Vestibulum elementum urna nec nisi
				pellentesque, et cursus est interdum. Integer scelerisque arcu a sapien laoreet, sit amet
				fringilla nisl vulputate. Etiam id mauris eget sem pretium placerat.
			</P>
		</TimelineItem>
	</Timeline>
</section>
