<script>
	import { Img, P, Timeline, TimelineItem } from 'flowbite-svelte';
	import Line from '../../../compnonents/shared/Line.svelte';
</script>

<section class="py-6">
	<h2 class="text-4xl font-bold" id="the-sport">The history of speedclimbing</h2>
	<Line color="red" />

	<P class="pb-6 text-4xl">
		This timeline shows some of the most important milestones in the history of speedclimbing.
	</P>

	<Timeline>
		<TimelineItem title="First ever climbing competitions in the Soviet Union" date="Around 1940">
			<P>
				In the late 1940s, the first ever climbing competitions were held in the Soviet Union.
				Although, it is not known what the exact procedure of those competitions looked like, it has
				been handed down, that those early competitions were in fact speedclimbing competitions.
			</P>
		</TimelineItem>

		<TimelineItem title="First climbing competitions in Western Europe" date="1985">
			<P>
				With the introduction of the <a href="https://en.wikipedia.org/wiki/Sportroccia">
					Sportroccia
				</a>
				events, competition climbing started to emerge in Western Europe. The first
				<a href="https://de.wikipedia.org/wiki/Rockmaster">Rockmaster</a> event in 1986 marks the beginning
				of a long and ongoing tradition of climbing competitions in Arco, Italy.
			</P>
		</TimelineItem>

		<TimelineItem title="First ever world cup season" date="1989">
			<P>
				1989 marks the beginning of official sports climbing world cups. Back then, the world cup
				was organized by the UIAA.
			</P>
		</TimelineItem>

		<TimelineItem title="First recorded speedclimbing competition" date="1991">
			<P>
				The first recorded speedclimbing competition took place in 1991 in Frankfurt, Germany. The
				results of this competition can still be found on
				<a
					href="https://www.digitalrock.de/egroupware/ranking/sitemgr/digitalrock/eliste.html#!comp=91_WM_F&cat=ICC_MS"
				>
					digitalrock.de
				</a>
			</P>
		</TimelineItem>

		<TimelineItem title="The beginning of norm-speed" date="2005-2007">
			<P>
				Before 2005, speedclimbing competitions took place on a different wall every time. This made
				it very hard to compare the results of different competitions. Therefore, the Idea of a
				"norm" wall was introduced. This first norm wall shared most of the properties of the
				current wall. It was the same height and even the holds were the same. However, <a
					href="https://www.youtube.com/watch?v=eCKMtxxGwIA">the route itself was very different</a
				>. <br /><br />
				This first idea proved to be impractical, as the route was too hard for most climbers. Therefore,
				a second version was introduced in 2007, which hasn't changed much since then.
				<br /><br />
				Both of those walls were created by the famous route setter Jacky Godoffe.
			</P>
		</TimelineItem>

		<TimelineItem title="Founding of the IFSC" date="2007">
			<P>
				In 2007, the "International Federation of Sport Climbing" (IFSC) was founded. It has been
				responsible for the organization of competitions and the development of the sport ever
				since.
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
