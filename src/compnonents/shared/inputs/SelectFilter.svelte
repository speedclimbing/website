<script lang="ts">
	export let value: string | number;
	export let onChange: () => void = () => {};
	export let textProperty: string;
	export let valueProperty: string;
	export let options: any[];
	export let defaultText: string | null = null;
</script>

<select
	bind:value
	class="block text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm py-2.5 px-5 flex-grow"
	on:change={onChange}
>
	{#if defaultText}
		<option value="">{defaultText}</option>
	{/if}
	{#each options as option}
		<option value={option[valueProperty]}>{option[textProperty]}</option>
	{/each}
</select>
