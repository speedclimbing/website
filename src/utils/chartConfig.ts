import type { Chart, ChartConfiguration, TooltipModel } from 'chart.js';

const getOrCreateTooltip = (chart: Chart) => {
	let tooltipEl = chart.canvas.parentNode?.querySelector('div');

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		tooltipEl.classList.add('custom-tooltip');

		const table = document.createElement('table');

		tooltipEl.appendChild(table);
		chart.canvas.parentNode?.appendChild(tooltipEl);
	}

	return tooltipEl;
};

const setTooltipBody = (tooltip: TooltipModel<'line'>, tooltipEl: HTMLDivElement) => {
	const bodyLines = tooltip.body.map((b) => b.lines);

	const tableHead = document.createElement('thead');
	const tableBody = document.createElement('tbody');

	tooltip.title.forEach((title) => {
		const tr = document.createElement('tr');
		const th = document.createElement('th');
		const text = document.createTextNode(title);

		th.appendChild(text);
		tr.appendChild(th);
		tableHead.appendChild(tr);
	});

	bodyLines.forEach((lines) => {
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		const text = document.createTextNode(lines[0]);

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
};

const tooltipHandler = (context: { chart: Chart; tooltip: TooltipModel<'line'> }) => {
	const { chart, tooltip } = context;
	const tooltipEl = getOrCreateTooltip(chart);

	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = '0';
		return;
	}

	setTooltipBody(tooltip, tooltipEl);

	const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

	tooltipEl.style.opacity = '1';
	tooltipEl.style.left = positionX + tooltip.caretX + 'px';
	tooltipEl.style.top = positionY + tooltip.caretY + 'px';
};

const ticksColor = (darkMode: boolean) => {
	return darkMode ? 'rgba(255, 255, 255, .6)' : 'rgba(17, 24, 39, 0.4)';
};

const lineColor = (darkMode: boolean) => {
	return darkMode ? 'rgba(255, 255, 255, .1)' : 'rgba(17, 24, 39, 0.1)';
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
					external: tooltipHandler
				}
			},
			scales: {
				y: {
					ticks: {
						color: ticksColor(darkMode),
						stepSize: 0.1
					},
					grid: { color: lineColor(darkMode) },
					border: { color: lineColor(darkMode) }
				},
				x: {
					ticks: { color: ticksColor(darkMode) },
					grid: { color: lineColor(darkMode) },
					border: { color: lineColor(darkMode) }
				}
			}
		}
	};
};
