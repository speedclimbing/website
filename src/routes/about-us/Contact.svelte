<script lang="ts">
	import PrimaryButton from 'components/shared/buttons/PrimaryButton.svelte';
	import Alert from 'components/shared/Alert.svelte';
	import { Input, Label, P, Textarea } from 'flowbite-svelte';
	import { Turnstile } from 'svelte-turnstile';
	import AnchorPoint from 'components/shared/AnchorPoint.svelte';
	import TitleWithLine from 'components/shared/content/TitleWithLine.svelte';

	export let turnstileSiteKey: string | undefined;

	let loading = false;
	let turnstilePassed = false;
	let turnstile: Turnstile;
	let submitResult: string = '';

	const resetSubmitResult = () => {
		submitResult = '';
	};

	const handleSubmit = async (e: Event) => {
		let form = e.target;
		if (!(form instanceof HTMLFormElement)) {
			return;
		}

		loading = true;

		let data = new FormData(form);
		let resp = await fetch(form.action, {
			method: form.method,
			body: data,
			headers: {
				Accept: 'application/json'
			}
		});

		submitResult = (await resp.json()).result;

		if (turnstileSiteKey) {
			turnstilePassed = false;
			turnstile.reset();
		}

		if (submitResult == 'success') {
			form.reset();
		}

		loading = false;
	};
</script>

<section class="py-6">
	<AnchorPoint id="contact" />
	<TitleWithLine titleText="Get in touch" />

	<P class="pb-4 text-yellow-800">
		Do you have any ideas on things we should add? Want to share your thoughts, or just want to say
		hello? We are always happy to hear feedback, so feel free to drop us a message and we will try
		to get back to you as soon as possible.
	</P>

	{#if submitResult === 'success'}
		<Alert status="success" on:close={resetSubmitResult}>Submitted successfully!</Alert>
	{:else if submitResult !== ''}
		<Alert status="error" on:close={resetSubmitResult}>
			An error occured, please try again. Alternatively, you can send us an email to <a
				class="text-white font-bold"
				href="mailto:contact@speedclimbing.org">contact@speedclimbing.org</a
			>.
		</Alert>
	{/if}

	<form
		class="grid grid-cols-2 gap-4 pt-4"
		method="post"
		action="/about-us/contact"
		on:submit|preventDefault={handleSubmit}
	>
		<div class="col-span-2 md:col-span-1">
			<Label for="email" class="bloack mb-2">Your E-Mail address</Label>
			<Input
				id="email"
				name="email"
				placeholder="john.doe@gmail.com"
				required
				type="email"
				disabled={loading}
			/>
		</div>

		<div class="col-span-2 md:col-span-1">
			<Label for="name" class="bloack mb-2">Your name</Label>
			<Input id="name" name="name" placeholder="John Doe" required disabled={loading} />
		</div>

		<div class="col-span-2">
			<Label for="message" class="bloack mb-2">Your message</Label>
			<Textarea id="message" name="message" rows="4" required disabled={loading} />
		</div>

		{#if turnstileSiteKey}
			<div class="col-span-2">
				<Turnstile
					siteKey={turnstileSiteKey}
					on:turnstile-callback={() => (turnstilePassed = true)}
					bind:this={turnstile}
				/>
			</div>
		{/if}

		<PrimaryButton text="Submit" disabled={(turnstileSiteKey && !turnstilePassed) || loading} />
	</form>
</section>
