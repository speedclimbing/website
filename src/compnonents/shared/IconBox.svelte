<script lang="ts">
	// colors: bg-red/10 bg-yellow/10
	import AlternativeButton from './AlternativeButton.svelte';
	export let color = 'yellow';
	export let title = 'The Sport';
	export let text =
		'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At';
	export let onClick: (() => void) | undefined = undefined;
</script>

<div class="max-w-[350px] flex flex-col gap-5">
	<div class="bg-{color}/10 rounded-[5px] self-start p-3">
		<slot name="icon" />
	</div>
	<p class="font-Roboto text-2xl font-medium">{title}</p>
	<p>
		<slot name="text">
			{text}
		</slot>
	</p>
	{#if onClick}
		<AlternativeButton {onClick} text="read more" />
	{/if}
</div>
