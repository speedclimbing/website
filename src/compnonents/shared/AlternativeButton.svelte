<script lang="ts">
	import { ChevronRight } from 'svelte-heros-v2';
	export let text: string = 'See more';
	export let style: string = '';
	export let onClick: () => void = () => {};
</script>

<button
	class={`py-3 w-[150px] bg-grey/5 text-black rounded-[3px] dark:bg-grey text-[14px] dark:text-white ${style}`}
	on:click={onClick}
	>{text}
	<ChevronRight class="inline-block" size="15" /></button
>
