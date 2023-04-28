<script lang="ts">
	export let count: number;
	export let type: 'gold' | 'silver' | 'bronze';

	const color = {
		gold: 'bg-yellow',
		silver: 'bg-light-grey',
		bronze: 'bg-bronze'
	};
</script>

<div
	class="rounded-[50%] aspect-square h-9 {color[
		type
	]} flex items-center justify-center text-white {count === 0 && 'opacity-20'}"
>
	{count}
</div>

<style>
	.bg-bronze {
		background-image: linear-gradient(rgba(187, 148, 87, 0.7), rgba(187, 148, 87, 0.7)),
			linear-gradient(#da3c2b, #da3c2b);
	}
</style>
