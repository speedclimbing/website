<script lang="ts">
	export let text: string = 'Click me';
	export let style: string = '';
	export let disabled: boolean = false;
	export let onClick: () => void = () => {};
</script>

<button
	class={`py-3 w-[200px] bg-red border-red border-2 text-white rounded-[3px] ${
		disabled && 'opacity-30'
	} ${style}`}
	on:click={onClick}
	type="submit"
	{disabled}>{text}</button
>
