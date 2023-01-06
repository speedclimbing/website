<script lang="ts">
	export let text: string;
	export let style: string = '';
</script>

<button
	class={`py-3 w-[200px] bg-black/20 border-2 border-black text-black dark:text-white dark:border-white dark:bg-white/10 rounded-[3px] font-semibold ${style}`}
	>{text}</button
>
