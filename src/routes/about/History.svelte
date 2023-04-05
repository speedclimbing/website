<script>
	import { Img, P, Timeline, TimelineItem } from 'flowbite-svelte';
	import Line from '../../compnonents/shared/Line.svelte';
</script>

<section class="py-6">
	<h2 class="text-4xl font-bold" id="the-sport">Where did it come from?</h2>
	<Line color="red" />

	<P class="pb-6 text-4xl">
		This timeline shows some of the most important milestones in the history of speedclimbing.
	</P>

	<Timeline>
		<TimelineItem title="First ever climbing competitions in the sowjet union" date="Around 1940">
			<P>
				At this time, speedclimbing kind of existed already. The first ever climbing competitions in
				the sowjet union were held in the 1940s. They were focused on speed, but took place on
				natural rocks.
			</P>
		</TimelineItem>

		<TimelineItem title="Jacky Godoffe defines the speed route" date="2004">
			<P>
				In 2004, Jacky Godoffe defined the speed route as it is known today. Back then, the route
				was only 10 meters long. The initial idea was to achieve similar times as in the 100m
				sprint.
			</P>
		</TimelineItem>

		<TimelineItem title="The wall was extended to 15 meters" date="some date">
			<P>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu convallis ligula. Fusce
				semper finibus eros at hendrerit. Duis vitae leo sem. Sed id mollis turpis. Suspendisse ante
				lacus, egestas sit amet luctus ut, maximus id ante. Vestibulum elementum urna nec nisi
				pellentesque, et cursus est interdum. Integer scelerisque arcu a sapien laoreet, sit amet
				fringilla nisl vulputate. Etiam id mauris eget sem pretium placerat.
			</P>
		</TimelineItem>

		<TimelineItem title="'Norm-Speed' becomes its own discipline" date="2007">
			<P>In 2007, speedclimbing was officially introduced as a discipline in the IFSC worldcup.</P>
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
