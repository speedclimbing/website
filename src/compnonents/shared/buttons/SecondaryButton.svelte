<script lang="ts">
	export let text: string;
	export let style: string = '';
	export let color: string = 'black';
	export let darkColor: string = 'white';
</script>

<button
	class={`py-3 w-[200px] bg-${color}/20 border-2 border-${color} text-${color} dark:text-${darkColor} dark:border-${darkColor} dark:bg-${darkColor}/10 rounded-[3px] font-semibold ${style}`}
	>{text}</button
>
