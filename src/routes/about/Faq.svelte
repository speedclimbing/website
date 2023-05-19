<script lang="ts">
	import { Accordion, AccordionItem, P } from 'flowbite-svelte';
	import AnchorPoint from 'components/shared/AnchorPoint.svelte';
	import TitleWithLine from 'components/shared/content/TitleWithLine.svelte';

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
	<TitleWithLine titleText="FAQ" />

	<Accordion flush>
		{#each faq as { question, answer }, i}
			<AccordionItem open={i == 0}>
				<span slot="header">{question}</span>
				<P>{answer}</P>
			</AccordionItem>
		{/each}
	</Accordion>
</section>
