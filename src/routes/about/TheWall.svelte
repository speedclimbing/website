<script>
	import { List, P } from 'flowbite-svelte';
	import AnchorPoint from 'compnonents/shared/AnchorPoint.svelte';
	import TitleWithLine from 'compnonents/shared/content/TitleWithLine.svelte';
</script>

<section class="py-6">
	<AnchorPoint id="the-wall" />
	<TitleWithLine titleText="What is so special about that wall?" />

	<P class="pb-6">
		The speedclimbing wall was <b>originally designed in 2004</b> by the famous route-setter Jacky
		Godoffe. Everything about it is precisely normed. It is <b>exactly the same</b> in every gym and
		competition all around the world. That includes the wall itself, the holds and the position of
		the holds. This unfinification makes it possible to
		<b>compare the results of climbers from all over the world</b>.
		<br />
		<br />
		<b>Here are some specs:</b>
		<List>
			<li>15 meters high</li>
			<li>5° of titlt</li>
			<li>5.15 meters wide</li>
			<li>20 big holds</li>
			<li>10 small holds</li>
		</List>
		<br />
		More information can be found in the
		<a href="/documents/Speed_Licence_Rules_Walls.pdf">official speed licence rules</a> by the IFSC.
	</P>
</section>
