<script lang="ts">
	import { page } from '$app/stores';
</script>

<section id="world-records" class="py-[100px]">
	<h1 class="text-8xl font-bold text-center">{$page.status}</h1>
	<div id="line" class="bg-yellow rounded-sm w-[170px] h-1 mt-5 mb-5 mx-auto" />
	<h2 class="text-4xl font-bold text-center">{$page.error?.message}</h2>
</section>
