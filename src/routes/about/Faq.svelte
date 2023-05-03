<script lang="ts">
	import { Accordion, AccordionItem, P } from 'flowbite-svelte';
	import Line from 'compnonents/shared/Line.svelte';
	import AnchorPoint from 'compnonents/shared/AnchorPoint.svelte';

	const faq = [
		{
			question: 'Question 1',
			answer: 'Answer 1'
		},
		{
			question: 'Question 2',
			answer: 'Answer 2'
		},
		{
			question: 'Question 3',
			answer: 'Answer 3'
		}
	];
</script>

<section class="py-6">
	<AnchorPoint id="faq" />
	<h2 class="text-4xl font-bold">FAQ</h2>
	<Line color="red" />

	<Accordion flush>
		{#each faq as { question, answer }, i}
			<AccordionItem open={i == 0}>
				<span slot="header">{question}</span>
				<P>{answer}</P>
			</AccordionItem>
		{/each}
	</Accordion>
</section>
