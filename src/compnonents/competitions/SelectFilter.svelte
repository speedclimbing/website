<script lang="ts">
	export let value: string | number;
	export let onChange: () => void = () => {};
	export let textProperty: string;
	export let valueProperty: string;
	export let optgroup:
		| {
				property: string;
				defaultText: string;
		  }
		| undefined = undefined;
	export let defaultText: string | null = null;
	export let options: { [key: string]: string | number | null }[];
	export let disabled: boolean = false;

	let groupedOptions: Record<string, typeof options> = {};

	if (optgroup) {
		groupedOptions = options.reduce((acc, option) => {
			const group = option[optgroup!.property] ?? optgroup!.defaultText;
			if (!acc[group]) {
				acc[group] = [];
			}
			acc[group].push(option);
			return acc;
		}, groupedOptions);
	}
</script>

<select
	bind:value
	class="block w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm p-2.5 disabled:opacity-60"
	on:change={onChange}
	{disabled}
>
	{#if defaultText}
		<option value="">{defaultText}</option>
	{/if}

	{#if optgroup}
		{#each Object.keys(groupedOptions) as group}
			<optgroup label={group}>
				{#each groupedOptions[group] as option}
					<option value={option[valueProperty]}>{option[textProperty]}</option>
				{/each}
			</optgroup>
		{/each}
	{:else}
		{#each options as option}
			<option value={option[valueProperty]}>{option[textProperty]}</option>
		{/each}
	{/if}
</select>
