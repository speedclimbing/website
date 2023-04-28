<script lang="ts">
	import { ChevronRight } from 'svelte-heros-v2';
	export let text: string = 'See more';
	export let style: string = '';
</script>

<button
	class={`py-2 w-[150px] bg-grey/5 text-black rounded-[3px] dark:bg-grey dark:text-white text-[14px] ${style}`}
	>{text}
	<ChevronRight class="inline-block" size="15" /></button
>
