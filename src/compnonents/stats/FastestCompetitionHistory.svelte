<script lang="ts">
	import Chart, { type ChartItem } from 'chart.js/auto';
	import { chartConfig } from 'utils/chartConfig';
	import { onDestroy, onMount } from 'svelte';

	let canvas: ChartItem;
	let prefersDarkMode =
		window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	let chart: Chart;

	const initializeChart = () => {
		chart = new Chart(
			canvas,
			chartConfig(
				comps.map((c) => c.from),
				comps.map((c) => c.final_entry_time),
				'FET',
				prefersDarkMode
			)
		);
	};

	const handleColorThemeChange = (event: MediaQueryListEvent) => {
		prefersDarkMode = event.matches;
		chart.destroy();
		initializeChart();
	};

	const comps = [
		{
			id: '187f82a0-7810-4000-8781-1429a2590a01',
			name: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
			location: 'Barcelona',
			from: '23.05.2022',
			to: '23.05.2022',
			nation_code_ioc: 'ESP',
			nation_code_alpha2: 'SP',
			league_id: '187f82a0-7810-4000-8388-f85648643a80',
			final_entry_time: 6.52
		},
		{
			id: '187f82a0-7810-4000-8781-1429a2590a01',
			name: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
			location: 'Barcelona',
			from: '23.05.2022',
			to: '23.05.2022',
			nation_code_ioc: 'ESP',
			nation_code_alpha2: 'SP',
			league_id: '187f82a0-7810-4000-8388-f85648643a80',
			final_entry_time: 6.38
		},
		{
			id: '187f82a0-7810-4000-8781-1429a2590a01',
			name: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
			location: 'Barcelona',
			from: '23.05.2022',
			to: '23.05.2022',
			nation_code_ioc: 'ESP',
			nation_code_alpha2: 'SP',
			league_id: '187f82a0-7810-4000-8388-f85648643a80',
			final_entry_time: 6.31
		},
		{
			id: '187f82a0-7810-4000-8781-1429a2590a01',
			name: 'IFSC - Test Event (B&L) - Barcelona (ESP) 2022',
			location: 'Barcelona',
			from: '23.05.2022',
			to: '23.05.2022',
			nation_code_ioc: 'ESP',
			nation_code_alpha2: 'SP',
			league_id: '187f82a0-7810-4000-8388-f85648643a80',
			final_entry_time: 6.18
		}
	];

	onMount(() => {
		initializeChart();
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', handleColorThemeChange);
	});

	onDestroy(() => {
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.removeEventListener('change', handleColorThemeChange);
	});
</script>

<canvas bind:this={canvas} class="my-auto" />
