<script lang="ts">
	import type { Athlete } from 'src/types/Athlete';

	export let athlete: Athlete;
	let color = athlete.gender === 'Female' ? 'text-yellow' : 'text-red';

	function capitalize(word: string): string {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
</script>

<div
	class="py-5 px-5 border-2 rounded-md border-light-grey/10 shadow-sm dark:bg-grey athlete-card relative"
>
	<span class="text-4xl dark:text-gray-200 font-extrabold">{capitalize(athlete.first_name)}</span
	><br />
	<span class="text-2xl {color} font-extrabold">{capitalize(athlete.last_name)}</span>{' '}
	<span class="text-3xl {color} font-extrabold">({athlete.nation_code})</span>

	<span
		class="text-4xl relative xl:absolute xl:top-[50%] xl:translate-x-0 xl:translate-y-[-50%] xl:right-5 font-semibold {color}"
		>{((athlete.personal_best ?? 0) / 1000).toFixed(3)}</span
	>
</div>
