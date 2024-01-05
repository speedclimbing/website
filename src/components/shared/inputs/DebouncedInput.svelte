<script lang="ts">
	import { Input, type InputType } from 'flowbite-svelte';
	import { debounce } from 'utils/debounce';

	export let type: InputType | undefined;
	export let placeholder: string | undefined;
	export let value: string | number | undefined;
	export let inputClass: string | undefined;

	const handleKeyup = async (e: Event) => {
		if (!(e.target instanceof HTMLInputElement)) return;
		if (!(await debounce())) return;
		value = e.target.value;
	};
</script>

<Input {type} {placeholder} {value} class={inputClass} on:keyup={handleKeyup} />
