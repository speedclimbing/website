<script lang="ts">
	import { goto } from '$app/navigation';
	export let text: string = 'Click me';
	export let style: string = '';
	export let link: string = '/';
	export let onClick: () => void = () => {
		goto(link);
	};
</script>

<button
	class={`py-3 w-[200px] bg-red border-red border-2 text-white rounded-[3px] ${style}`}
	on:click={() => onClick()}>{text}</button
>
