<script lang="ts">
	import { page } from '$app/stores';
	import Line from 'compnonents/shared/Line.svelte';
	import PrimaryButton from 'compnonents/shared/PrimaryButton.svelte';
	import Alert from 'compnonents/shared/Alert.svelte';
	import { Input, Label, P, Textarea } from 'flowbite-svelte';
	import { Turnstile } from 'svelte-turnstile';
	import { goto } from '$app/navigation';

	let turnstilePassed = false;
	let submitResult: string;

	$: submitResult = $page.url.searchParams.get('contact-result') ?? '';

	const resetSubmitResult = () => {
		$page.url.searchParams.set('contact-result', '');
		goto($page.url.toString(), { keepFocus: true });
	};
</script>

<section class="py-6">
	<h2 class="text-4xl font-bold" id="contact">Get in touch</h2>
	<Line color="red" />

	<P class="pb-4 text-yellow-800">
		Do you have any ideas on things we should add? Want to share your thoughts, or just want to say
		hello? We are always happy to hear feedback, so feel free to drop us a message and we will try
		to get back to you as soon as possible.
	</P>

	{#if submitResult === 'success'}
		<Alert status="success" on:close={resetSubmitResult}>Submitted successfully!</Alert>
	{:else if submitResult !== ''}
		<Alert status="error" on:close={resetSubmitResult}>
			An error occured. Please refresh the page and try again.
		</Alert>
	{/if}

	<form class="grid grid-cols-2 gap-4 pt-4" method="post" action="/about-us/contact">
		<div class="col-span-2 md:col-span-1">
			<Label for="email" class="bloack mb-2">Your E-Mail address</Label>
			<Input id="email" name="email" placeholder="john.doe@gmail.com" required type="email" />
		</div>

		<div class="col-span-2 md:col-span-1">
			<Label for="name" class="bloack mb-2">Your name</Label>
			<Input id="name" name="name" placeholder="John Doe" required />
		</div>

		<div class="col-span-2">
			<Label for="message" class="bloack mb-2">Your message</Label>
			<Textarea id="message" name="message" rows="4" required />
		</div>

		<div class="col-span-2">
			<Turnstile
				siteKey="1x00000000000000000000AA"
				on:turnstile-callback={() => (turnstilePassed = true)}
			/>
		</div>

		<PrimaryButton text="Submit" disabled={!turnstilePassed} />
	</form>
</section>
