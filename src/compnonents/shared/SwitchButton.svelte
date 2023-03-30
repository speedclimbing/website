<script lang="ts">
	let box: HTMLElement;
	export let style: string = '';
	export let leftString = 'This';
	export let rightString = 'That';
	export let leftClickAction: () => void;
	export let rightClickAction: () => void;

	function handleClickLeft() {
		box.style.marginLeft = '0';
		leftClickAction();
	}

	function handleClickRight() {
		box.style.marginLeft = '50%';
		rightClickAction();
	}
</script>

<div class={`invert ${style}`}>
	<div
		class="rounded-sm relative border-2 border-[#2268d5] w-[200px] h-[45px] bg-transparent p-[2px]"
	>
		<div
			class="bg-[#2268d5] w-[50%] h-full ml-[0%] rounded-sm transition-[margin-left] duration-500"
			bind:this={box}
		/>
		<button
			class="absolute w-[50%] h-full top-0 left-0 flex justify-center items-center text-[#2268d5] mix-blend-difference"
			on:click={handleClickLeft}
		>
			{leftString}
		</button>
		<button
			class="absolute w-[50%] h-full top-0 left-[50%] flex justify-center items-center text-[#2268d5] mix-blend-difference"
			on:click={handleClickRight}
		>
			{rightString}
		</button>
	</div>
</div>
