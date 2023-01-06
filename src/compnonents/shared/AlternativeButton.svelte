<script lang="ts">
	import { ChevronRight } from 'svelte-heros-v2';
	export let text: string = 'Mehr erfahren';
	export let style: string = '';
</script>

<button
	class={`py-3 w-[150px] bg-grey/5 text-black rounded-[3px] dark:bg-grey dark:text-white ${style}`}
	>{text}
	<ChevronRight class="inline-block" size="15" /></button
>
