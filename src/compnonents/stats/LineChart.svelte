<script lang="ts">
	import Chart, { type ChartItem } from 'chart.js/auto';
	import { chartConfig } from 'utils/chartConfig';
	import { prefersDarkMode } from 'utils/stores';
	import { mounted } from 'utils/mounted';
	import { browser } from '$app/environment';

	type ChartPoint = {
		value: number;
		label: string;
	};

	export let data: ChartPoint[];
	export let name: string;

	let canvas: ChartItem;
	let chart: Chart;

	const initializeChart = (darkMode: boolean) => {
		chart = new Chart(
			canvas,
			chartConfig(
				data.map((d) => d.label),
				data.map((d) => d.value),
				name,
				darkMode
			)
		);
	};

	$: {
		if (browser && $mounted) {
			if (chart) chart.destroy();
			initializeChart($prefersDarkMode);
		}
	}
</script>

<canvas bind:this={canvas} class="my-auto" />
