<script>
	import Header from 'compnonents/shared/Header.svelte';
	import Footer from 'compnonents/shared/Footer.svelte';
	import '../app.postcss';
	import { navigating } from '$app/stores';
</script>

<Header />

{#if $navigating}
	<div class="absolute top-0 left-[-10%] w-[100vw] h-1 bg-red z-50 progress_animation" />
{/if}

<main>
	<slot />
</main>

<Footer />

<style>
	.progress_animation {
		transition: all 0.5s linear;
		animation-duration: 4s;
		animation-iteration-count: 1;
		animation-name: indeterminate-progress-bar;
	}

	@keyframes indeterminate-progress-bar {
		0% {
			left: -100%;
		}
		10% {
			left: -80%;
		}
		30% {
			left: -40%;
		}
		100% {
			left: -10%;
		}
	}
</style>
