<script lang="ts">
	import { uniqueId } from 'utils/uniqueId';

	let box: HTMLElement;
	export let style: string = '';
	export let options = ['A', 'B'];
	export let value = options[0];

	let group = uniqueId();

	const optionWidth = Math.floor(100 / options.length);

	$: console.log(value);
</script>

<div class={`invert ${style}`}>
	<div
		class="switch-options rounded-md relative border-[2px] border-[#2268d5]/50 w-[200px] h-[45px] bg-transparent p-[2px]"
	>
		{#each options as option, i}
			<label
				for={`${group}-${i}`}
				class="absolute w-[{optionWidth}%] h-full top-0 left-[{optionWidth *
					i}%] flex justify-center items-center text-[#2268d5] mix-blend-difference cursor-pointer"
				>{option}</label
			>
		{/each}

		<div class="w-full h-full">
			{#each options as option, i}
				<input
					bind:group={value}
					type="radio"
					name={group}
					id={`${group}-${i}`}
					value={option}
					class="switch-option hidden"
				/>
			{/each}

			<div
				class="selected-option-indicator bg-[#2268d5] w-[{optionWidth}%] h-full ml-[0%] rounded-[3px] transition-[margin-left] duration-500"
				bind:this={box}
			/>
		</div>
	</div>
</div>

<style lang="postcss">
	.switch-option:nth-child(1):checked ~ div {
		margin-left: 0;
	}

	.switch-option:nth-child(2):nth-last-child(2):checked ~ div {
		margin-left: 50%;
	}

	.switch-option:nth-child(2):nth-last-child(3):checked ~ div {
		margin-left: 33%;
	}

	.switch-option:nth-child(3):checked ~ div {
		margin-left: 66%;
	}
</style>
