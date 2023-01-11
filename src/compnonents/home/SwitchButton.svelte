<script lang="ts">
	let box: HTMLElement;
	export let style: string = '';

	function handleClickMale(e: any) {
		box.style.marginLeft = '0';
	}

	function handleClickFemale(e: any) {
		box.style.marginLeft = '50%';
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
			on:click={(e) => handleClickMale(e)}
		>
			Male
		</button>
		<button
			class="absolute w-[50%] h-full top-0 left-[50%] flex justify-center items-center text-[#2268d5] mix-blend-difference"
			on:click={(e) => handleClickFemale(e)}
		>
			Female
		</button>
	</div>
</div>
