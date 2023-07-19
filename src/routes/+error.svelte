<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} - {$page.error?.message}</title>
</svelte:head>

<section id="world-records" class="py-[100px]">
	<div class="relative mx-auto w-64">
		<img src="/favicon.png" alt="logo">
		<div class="animate-eyes absolute top-0 left-0">
			<div class="absolute rounded-full animate-blink bg-[#782118] h-3 w-3 left-[115px] top-[60px]"></div>
			<div class="absolute rounded-full animate-blink bg-[#782118] h-3 w-3 left-[145px] top-[60px]"></div>
		</div>
	</div>
	<div id="line" class="bg-yellow rounded-sm w-[170px] h-1 mt-5 mb-5 mx-auto" />
	<h2 class="text-4xl font-bold text-center">{$page.status} - {$page.error?.message}</h2>
</section>
