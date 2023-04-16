<script>
	import AlternativeButton from './AlternativeButton.svelte';
	import { Trophy } from 'svelte-heros-v2';
	export let color = 'yellow';
</script>

<div class="max-w-[350px] flex flex-col gap-5">
	<div class="bg-{color}/10 rounded-[5px] self-start p-3">
		<Trophy size="40" class="text-{color}" />
	</div>
	<p class="font-Roboto text-2xl font-medium">The Sport</p>
	<p>
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
		ut labore et dolore magna aliquyam erat, sed diam voluptua. At
	</p>
	<AlternativeButton />
</div>
