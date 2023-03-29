<script lang="ts">
	import type { Competition } from 'src/types/Competition';
	import { Calendar } from 'fullcalendar';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import { onMount } from 'svelte';
	import { isPromise } from '../../utils/typeguards';

	export let competitions: Competition[] | Promise<Competition[]>;
	export let viewCalendar: boolean;
	let calendar: Calendar | null = null;

	onMount(() => {
		let calendarEl: HTMLElement = document.getElementById('calendar')!;
		calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin],
			initialView: 'dayGridMonth',
			displayEventTime: false,
			eventClick: (info) => {
				console.log(info.el);
			},
			eventContent: function (arg) {
				let p1 = document.createElement('p');
				p1.innerHTML = arg.event.title;
				p1.style.overflow = 'clip';
				let arrayOfDomNodes = [p1];
				return { domNodes: arrayOfDomNodes };
			}
		});
		if (!isPromise(competitions)) {
			updateCalendarEvents(competitions);
		}
	});

	function handleToggleCalendar(viewCalendar: boolean) {
		if (!calendar) return;
		viewCalendar ? calendar.render() : calendar.destroy();
	}

	function updateCalendarEvents(competitions: Competition[]) {
		if (!calendar) return;
		calendar.removeAllEvents();
		competitions.forEach((c) => {
			calendar?.addEvent({
				title: c.name,
				start: c.from,
				end: c.to,
				extendedProps: {
					location: c.location,
					nation: c.nation_code
				}
			});
		});
		if (competitions.length) calendar.gotoDate(competitions[0].from);
	}
	$: {
		if (isPromise(competitions) && viewCalendar) {
			handleToggleCalendar(false);
			competitions.then((comps) => {
				updateCalendarEvents(comps);
				handleToggleCalendar(comps.length != 0);
			});
		} else {
			handleToggleCalendar(viewCalendar);
		}
	}
</script>

<div id="calendar" />
