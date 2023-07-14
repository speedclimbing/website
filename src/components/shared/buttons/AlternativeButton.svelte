<script lang="ts">
	import { ChevronRight } from 'svelte-heros-v2';
	export let text: string = 'See more';
	export { clazz as class };
	export let href: string = '';
	export let onClick: (() => void) | undefined = undefined;

	let clazz: string = '';
</script>

<button
	class="w-[150px] bg-grey/5 text-black rounded-[3px] dark:bg-grey text-[14px] dark:text-white {clazz}"
	on:click={onClick}
>
	{#if href}
		<a class="w-full h-full block py-2 text-inherit" {href}>
			{text}
			<ChevronRight class="inline-block" size="15" />
		</a>
	{:else}
		<span class="w-full h-full block py-2 text-inherit">
			{text}
			<ChevronRight class="inline-block" size="15" />
		</span>
	{/if}
</button>
