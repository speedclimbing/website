<script>
	import AnchorPoint from 'compnonents/shared/AnchorPoint.svelte';
	import TitleWithLine from 'compnonents/shared/content/TitleWithLine.svelte';
</script>

<section class="py-6">
	<AnchorPoint id="the-rules" />
	<TitleWithLine titleText="How does the competition work?" />

	<p>
		A speedclimbing competition consists of two parts:
		<span class="text-blue-500 font-bold">training</span>,
		<span class="text-yellow font-bold">qualification</span>
		and
		<span class="text-red font-bold">final</span>.
		<br />
		<br />
		In the <span class="text-blue-500 uppercase font-bold">training</span>, the athletes have to
		runs which have no meaning for the result. They are used to check out the wall and to get used
		to the conditions.
		<br />
		In the <span class="text-yellow uppercase font-bold">qualification</span>, all athletes climb
		the wall twice, once on lane A and once on lane B. Only the better attempt is used for the
		result. The best 16, 8 or 4 athletes will qualify for the final, depending on how many athletes
		compete. In this stage,
		<b>it does not matter if the athletes win or lose the race, only the time counts</b>. False
		starts lead to immideate disqualification, even when the athlete has already a valid result from
		the previous run.
		<br />
		The <span class="text-red uppercase font-bold">final</span> consists of multiple elimination stages.
		This is where it gets exciting! In the final, the time does not matter anymore, it's only about being
		the first one at the top. In every round, the first place competes against the last place, the second
		place competes against the second last place and so on. The winner of each round advances to the
		next round. The loser is eliminated. When only four athletes are left, it's called the semi-final.
		The losers of the semi-final compete again, in the so-called small-final, for the third place. The
		winners proceed to the final to determine who wins the competition.
	</p>
</section>
