<script lang="ts">
	import Line from './Line.svelte';

	export let lineClasses: string = '';
	export let titleClasses: string = '';
	export let lineColor: string = 'red';
	export let lineLength: string = '100px';
	export let titleText: string;
</script>

<div>
	<h2 class="text-4xl font-bold {titleClasses}">{titleText}</h2>
	<Line style={lineClasses} color={lineColor} length={lineLength} />
</div>
