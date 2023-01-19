<script lang="ts">
	export let text: string;
	export let style: string = '';
	export let onClick: () => void = () => {};
</script>

<button
	class={`py-3 w-[200px] bg-red border-red border-2 text-white rounded-[3px] ${style}`}
	on:click={() => onClick()}>{text}</button
>
