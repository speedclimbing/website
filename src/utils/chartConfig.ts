import type { Chart, ChartConfiguration, TooltipModel } from 'chart.js';

const getOrCreateTooltip = (chart: Chart) => {
	let tooltipEl = chart.canvas.parentNode?.querySelector('div');

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');

		tooltipEl.style.paddingTop = '10px';
		tooltipEl.style.paddingBottom = '10px';
		tooltipEl.style.paddingLeft = '20px';
		tooltipEl.style.paddingRight = '20px';
		tooltipEl.style.borderRadius = '6px';
		tooltipEl.style.pointerEvents = 'none';
		tooltipEl.style.position = 'absolute';
		tooltipEl.style.transform = 'translate(-50%, 0)';
		tooltipEl.style.transition = 'all .25s ease-in-out';
		tooltipEl.style.marginTop = '15px';
		tooltipEl.style.boxShadow = '0 10px 50px 0 rgba(17,24,39,.1)';
		const table = document.createElement('table');
		table.style.margin = '0px';

		tooltipEl.appendChild(table);
		chart.canvas.parentNode?.appendChild(tooltipEl);
	}

	return tooltipEl;
};

const tooltipHandler = (context: { chart: Chart; tooltip: TooltipModel<'line'> }) => {
	const { chart, tooltip } = context;
	const tooltipEl = getOrCreateTooltip(chart);

	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = '0';
		return;
	}

	if (tooltip.body) {
		const titleLines = tooltip.title || [];
		const bodyLines = tooltip.body.map((b) => b.lines);

		const tableHead = document.createElement('thead');

		titleLines.forEach((title) => {
			const tr = document.createElement('tr');
			tr.style.borderWidth = '0';

			const th = document.createElement('th');
			th.style.borderWidth = '0';
			const text = document.createTextNode(title);

			th.appendChild(text);
			tr.appendChild(th);
			tableHead.appendChild(tr);
		});

		const tableBody = document.createElement('tbody');
		bodyLines.forEach((body, i) => {
			const tr = document.createElement('tr');
			tr.style.backgroundColor = 'inherit';
			tr.style.borderWidth = '0';

			const td = document.createElement('td');
			td.style.borderWidth = '0';

			const text = document.createTextNode(body[0]);

			td.appendChild(text);
			tr.appendChild(td);
			tableBody.appendChild(tr);
		});

		const tableRoot = tooltipEl.querySelector('table');

		while (tableRoot?.firstChild) {
			tableRoot.firstChild.remove();
		}

		tableRoot?.appendChild(tableHead);
		tableRoot?.appendChild(tableBody);
	}

	const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

	tooltipEl.style.opacity = '1';
	tooltipEl.style.left = positionX + tooltip.caretX + 'px';
	tooltipEl.style.top = positionY + tooltip.caretY + 'px';
	tooltipEl.style.background = chart.options.plugins!.tooltip!.backgroundColor!.toString();
	tooltipEl.style.color = chart.options.plugins!.tooltip!.bodyColor!.toString();
};

export const chartConfig = (
	labels: string[],
	data: number[],
	title: string,
	darkMode: boolean
): ChartConfiguration => {
	return {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: title,
					data: data,
					fill: false,
					backgroundColor: '#DA3C2B',
					borderColor: 'rgb(218, 60, 43, 0.5)',
					pointHitRadius: 10,
					pointRadius: 4
				}
			]
		},
		options: {
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					position: 'nearest',
					enabled: false,
					backgroundColor: darkMode ? '#1F2937' : 'white',
					bodyColor: darkMode ? 'white' : '#1F2937',
					external: tooltipHandler
				}
			},
			scales: {
				y: {
					stacked: true,
					ticks: {
						color: darkMode ? 'rgba(255, 255, 255, .6)' : 'rgba(17, 24, 39, 0.4)',
						stepSize: 0.1
					},
					grid: { color: darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(17, 24, 39, 0.1)' },
					border: { color: darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(17, 24, 39, 0.1)' }
				},
				x: {
					ticks: { color: darkMode ? 'rgba(255, 255, 255, .4)' : 'rgba(17, 24, 39, 0.4)' },
					grid: { color: darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(17, 24, 39, 0.1)' },
					border: { color: darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(17, 24, 39, 0.1)' }
				}
			}
		}
	};
};
