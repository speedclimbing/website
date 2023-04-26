<script>
	import Header from 'compnonents/shared/Header.svelte';
	import Footer from 'compnonents/shared/Footer.svelte';
	import '../app.postcss';
	import { navigating } from '$app/stores';
	import { Spinner } from 'flowbite-svelte';

	let wholePageLoading = false;

	$: {
		if (!$navigating) {
			wholePageLoading = false;
			break $;
		}

		if ($navigating.type === 'goto' && $navigating.from?.route.id === $navigating.to?.route.id) {
			wholePageLoading = false;
			break $;
		}

		wholePageLoading = true;
	}
</script>

<Header />
<main class={wholePageLoading ? 'blur-sm' : ''}>
	<slot />
</main>

{#if wholePageLoading}
	<Spinner class="fixed top-[50%] left-[50%]" />
{/if}

<Footer />
