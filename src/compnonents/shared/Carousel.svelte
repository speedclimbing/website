<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import newUniqueId from 'locally-unique-id-generator';
	import { comment } from 'svelte/internal';
	import { mod } from 'utils/mod';

	interface CarouselItem {
		properties?: Record<string, any>;
		component: ConstructorOfATypedSvelteComponent;
	}

	export let items: CarouselItem[];
	let clazz: string;
	export { clazz as class };
	const id = newUniqueId();
</script>

{#each items as _, i}
	<input class="carousel-selector hidden" type="radio" name={id} id="{id}-{i}" checked={i == 0} />
{/each}

<div class="carousel-container relative z-30 {clazz}">
	{#each items as item, i}
		<figure
			class="carousel-item absolute top-0 left-0 h-[100%] w-[100%] transition-opacity duration-1000 opacity-0 pointer-events-none"
		>
			<svelte:component this={item.component} {...item.properties} />
			{#each [-1, 1] as direction}
				<label
					for="{id}-{mod(i + direction, items.length)}"
					class="carousel-control absolute top-[50%] translate-y-[-50%] px-4 z-40 cursor-pointer transition-opacity duration-1000 opacity-0 {direction ===
					-1
						? 'left-0'
						: 'right-0'}"
				>
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="3"
							d={direction === -1 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
						/></svg
					>
				</label>
			{/each}
		</figure>
	{/each}

	<div class="carousel-nav absolute bottom-4 left-[50%] translate-x-[-50%] z-40 flex">
		{#each items as _, i}
			<label
				for="{id}-{i}"
				class="px-2 py-4 cursor-pointer opacity-50 flex justify-center items-center"
			>
				<div class="block w-[50px] h-[2px] bg-white" />
			</label>
		{/each}
	</div>
</div>
