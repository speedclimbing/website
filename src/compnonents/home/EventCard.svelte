<script>
	import { Calendar, MapPin } from 'svelte-heros-v2';
</script>

<div class="py-5 px-10 border-2 rounded-md border-light-grey/10 shadow-sm dark:bg-grey">
	<h3 class="mb-5">IFSC - Test Event (B&L) - Barcelona (ESP) 2022</h3>
	<div class="flex gap-1 flex-col sm:flex-row sm:gap-4 mb-3">
		<Calendar color="#DA3C2B" />
		<p>04. März - 05. März 2022</p>
	</div>
	<div class="flex gap-1 flex-col sm:flex-row sm:gap-4">
		<MapPin color="#DA3C2B" />
		<p>Barcelona</p>
	</div>
</div>
