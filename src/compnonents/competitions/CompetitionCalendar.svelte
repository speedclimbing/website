<script lang="ts">
	import type { Competition } from 'src/types/Competition';
	import { Calendar } from 'fullcalendar';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import { onMount } from 'svelte';
	import { stringToHex } from '../../utils/stringToHex';
	import { mounted } from '../../utils/mounted';

	export let competitions: Competition[];
	export let year: number;
	let calendarEl: HTMLElement;
	let calendar: Calendar;
	var calendarYearChanged = false;
	const isMounted = () => $mounted;

	onMount(() => {
		calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin],
			headerToolbar: {
				left: 'title',
				right: 'customprev,customnext'
			},
			footerToolbar: {
				right: 'subscribeToCalendar'
			},
			initialView: 'dayGridMonth',
			displayEventTime: false,
			eventClick: (info) => {
				console.log(info.el);
			},
			eventContent: function (arg) {
				let p1 = document.createElement('p');
				p1.innerHTML = arg.event.title;
				p1.style.overflow = 'clip';
				return { domNodes: [p1] };
			},
			customButtons: {
				customprev: {
					icon: 'chevron-left',
					click: function () {
						calendar.prev();
						if (calendar.getDate().getFullYear() == year) return;
						calendarYearChanged = true;
						year = calendar.getDate().getFullYear();
					}
				},
				customnext: {
					icon: 'chevron-right',
					click: function () {
						calendar.next();
						if (calendar.getDate().getFullYear() == year) return;
						calendarYearChanged = true;
						year = calendar.getDate().getFullYear();
					}
				},
				subscribeToCalendar: {
					text: 'Copy calendar link for subscription',
					click: function () {
						navigator.clipboard.writeText('http://ics.speedclimbing.org/');
					}
				}
			}
		});
		updateCalendarEvents(competitions);
		calendar.render();
	});

	function updateCalendarEvents(competitions: Competition[]) {
		calendar.removeAllEvents();
		competitions.forEach((c) => {
			calendar.addEvent({
				title: c.name,
				start: c.from,
				end: c.to,
				backgroundColor: stringToHex(c.league_id),
				borderColor: 'transparent',
				extendedProps: {
					location: c.location,
					nation: c.nation_code
				}
			});
		});
		if (competitions.length && !calendarYearChanged) {
			calendar.gotoDate(competitions[0]?.from);
		} else {
			calendarYearChanged = false;
		}
	}
	$: {
		if (!isMounted()) break $;
		updateCalendarEvents(competitions);
	}
</script>

<div id="calendar" class="py-10 text-black dark:text-white" bind:this={calendarEl} />
