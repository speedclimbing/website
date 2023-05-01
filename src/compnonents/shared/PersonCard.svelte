<script lang="ts">
	import type { Action } from 'svelte/types/runtime/action';

	export let image: string;
	export let color: string = '#dd972a';
	export let name: string = 'Name';
	export let subtitle: string = 'Subtitle';
	export let time: string = '5.00';

	const cardColor: Action<HTMLElement, undefined> = (node) => {
		node.style.setProperty(`--cardColor`, color);

		return {
			update() {
				node.style.setProperty(`--cardColor`, color);
			}
		};
	};
</script>

<div
	class="w-[300px] md:w-[450px] lg:w-[400px] h-[250px] p-5 rounded-md background-gradient relative flex flex-col-reverse"
	use:cardColor
>
	<img src={image} alt={name} class="absolute w-[70%] top-[-70px] left-[50%] translate-x-[-50%]" />
	<div class="relative p-5 rounded-sm bg-white/[0.85]">
		<p class="dark:text-black">{name}</p>
		<p class="text-color text-normal font-normal">{subtitle}</p>
		<p
			class="relative xl:absolute xl:top-[50%] xl:translate-x-0 xl:translate-y-[-50%] xl:right-5 font-semibold text-2xl text-color"
		>
			{time}
		</p>
	</div>
</div>

<style>
	.background-gradient {
		background: linear-gradient(0deg, rgba(55, 65, 81, 0.05), rgba(55, 65, 81, 0.05)),
			linear-gradient(180deg, rgba(218, 60, 43, 0.03) 47.48%, var(--cardColor) 100%);
		box-shadow: 0px 20px 50px rgba(17, 24, 39, 0.1);
	}

	.text-color {
		color: var(--cardColor);
	}
</style>
