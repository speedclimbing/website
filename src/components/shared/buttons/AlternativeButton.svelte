<script lang="ts">
	import { ChevronRight } from 'svelte-heros-v2';
	export let text: string = 'Mehr erfahren';
	export let style: string = '';
	export let onClick: () => void = () => {};
</script>

<button
	class={`py-2 w-[150px] bg-grey/5 text-black rounded-[3px] dark:bg-grey text-[14px] dark:text-white ${style}`}
	on:click={onClick}
	>{text}
	<ChevronRight class="inline-block" size="15" /></button
>
