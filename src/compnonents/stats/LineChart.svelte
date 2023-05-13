<script lang="ts">
	import Chart, { type ChartItem } from 'chart.js/auto';
	import { chartConfig } from 'utils/chartConfig';
	import { prefersDarkMode } from 'utils/stores';
	import { mounted } from 'utils/mounted';
	import { browser } from '$app/environment';

	export let data: any[];
	export let valueAttribute: string;
	export let nameAttribute: string;

	let canvas: ChartItem;
	let chart: Chart;

	const initializeChart = (colorMode: boolean) => {
		chart = new Chart(
			canvas,
			chartConfig(
				data.map((obj) => obj[nameAttribute]),
				data.map((obj) => obj[valueAttribute]),
				'FET',
				colorMode
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
