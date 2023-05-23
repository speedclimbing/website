<script lang="ts">
	import { ChevronRight } from 'svelte-heros-v2';
	export let text: string = 'See more';
	export let style: string = '';
	export let href: string = '';
	export let onClick: (() => void) | undefined = undefined;
</script>

{#if onClick}
	<button
		class={`py-2 w-[150px] bg-grey/5 text-black rounded-[3px] dark:bg-grey text-[14px] dark:text-white ${style}`}
		on:click={onClick}
	>
		{text}
		<ChevronRight class="inline-block" size="15" />
	</button>
{/if}

{#if href}
	<a
		class={`py-2 w-[150px] bg-grey/5 text-black rounded-[3px] dark:bg-grey text-[14px] dark:text-white flex justify-center items-center gap-2 ${style}`}
		{href}
	>
		{text}
		<ChevronRight class="inline-block" size="15" />
	</a>
{/if}
