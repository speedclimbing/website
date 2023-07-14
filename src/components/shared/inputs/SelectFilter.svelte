<script context="module" lang="ts">
	export interface FilterOption {
		name: string;
		value: string;
		optgroup?: string;
	}
	export interface Filter {
		name: string;
		order?: number;
		defaultText?: string;
		optgroup?: {
			defaultText?: string;
		};
		options: FilterOption[];
	}
</script>

<script lang="ts">
	export let value: string | number | undefined;
	export let onChange: () => void = () => {};

	export let filter: Filter;
	export let disabled: boolean = false;

	let groupedOptions: Record<string, typeof filter.options> = {};

	$: if (filter.optgroup) {
		groupedOptions = {};
		groupedOptions = filter.options.reduce((acc, { name, value, optgroup }) => {
			optgroup = optgroup ?? filter.optgroup?.defaultText ?? '';
			if (!acc[optgroup]) {
				acc[optgroup] = [];
			}
			acc[optgroup].push({ name, value });
			return acc;
		}, groupedOptions);
	}
</script>

<select
	bind:value
	class="block text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm py-2.5 px-5 flex-grow disabled:opacity-60"
	on:change={onChange}
	name={filter.name}
	{disabled}
>
	{#if filter.defaultText}
		<option value={undefined}>{filter.defaultText}</option>
	{/if}

	{#if filter.optgroup}
		{#each Object.keys(groupedOptions) as group}
			<optgroup label={group}>
				{#each groupedOptions[group] as option}
					<option value={option.value}>{option.name}</option>
				{/each}
			</optgroup>
		{/each}
	{:else}
		{#each filter.options as option}
			<option value={option.value}>{option.name}</option>
		{/each}
	{/if}
</select>
