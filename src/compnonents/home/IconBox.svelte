<script lang="ts">
	import AlternativeButton from '../shared/AlternativeButton.svelte';
	import { Trophy } from 'svelte-heros-v2';
	import type { SvelteComponent } from 'svelte';

	export let title: string = 'The Sport';
	export let text: string =
		'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At';
	export let onClick: () => void;
</script>

<div class="max-w-[350px] flex flex-col gap-5">
	<div class="bg-yellow/10 rounded-[5px] self-start p-3">
		<slot />
	</div>
	<p class="font-Roboto text-2xl font-medium">{title}</p>
	<p>
		{text}
	</p>
	<AlternativeButton {onClick} text="read more" />
</div>
