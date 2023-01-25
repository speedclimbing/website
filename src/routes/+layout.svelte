<script>
	import Header from '../compnonents/shared/Header.svelte';
	import Footer from '../compnonents/shared/Footer.svelte';
	import '../app.postcss';
	import { navigating } from '$app/stores';
	import { Spinner } from 'flowbite-svelte';
</script>

<Header />
<main class={$navigating ? 'blur-sm' : ''}>
	<slot />
</main>

{#if $navigating}
	<Spinner class="fixed top-[50%] left-[50%]" />
{/if}

<Footer />
