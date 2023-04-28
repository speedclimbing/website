<script lang="ts">
	import type { Competition } from '../../types/Competition';
	import { Calendar, MapPin } from 'svelte-heros-v2';

	export let competition: Competition;
</script>

<div class="py-5 px-10 border-2 rounded-md border-light-grey/10 shadow-sm dark:bg-grey">
	<h3 class="mb-5">{competition.name}</h3>
	<div class="flex gap-1 flex-col sm:flex-row sm:gap-4 mb-3">
		<Calendar color="#DA3C2B" />
		<p>
			{competition.from.toLocaleDateString('de-DE', {
				year: 'numeric',
				month: 'long',
				day: '2-digit'
			})} - {competition.to.toLocaleDateString('de-DE', {
				year: 'numeric',
				month: 'long',
				day: '2-digit'
			})}
		</p>
	</div>
	<div class="flex gap-1 flex-col sm:flex-row sm:gap-4">
		<MapPin color="#DA3C2B" />
		<p>{competition.location}</p>
	</div>
</div>
