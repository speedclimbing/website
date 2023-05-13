<script lang="ts">
	import type { Competition } from 'types/Competition';
	import { Calendar } from 'fullcalendar';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import { onMount } from 'svelte';
	import { stringToHex } from 'utils/stringToHex';
	import { mounted } from 'utils/mounted';
	import CalendarSubscriptionModal from './CalendarSubscriptionModal.svelte';

	export let competitions: Competition[] | Promise<Competition[]>;
	export let year: number;
	let calendarEl: HTMLElement;
	let calendar: Calendar;
	let showModal: boolean;
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
			height: 'auto',
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
					text: 'Subscribe to calendar',
					click: () => (showModal = true)
				}
			}
		});

		if (competitions instanceof Promise) {
			competitions.then((comps) => {
				updateCalendarEvents(comps);
			});
		} else {
			updateCalendarEvents(competitions);
		}

		calendar.render();
	});

	function handleToggleCalendar(viewCalendar: boolean) {
		viewCalendar ? calendar.render() : calendar.destroy();
	}

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
			calendar.gotoDate(competitions[0].from);
		} else {
			calendarYearChanged = false;
		}
	}
	$: {
		if (!isMounted() || !(competitions instanceof Promise)) break $;
		handleToggleCalendar(false);
		competitions.then((comps) => {
			updateCalendarEvents(comps);
			handleToggleCalendar(comps.length != 0);
		});
	}
</script>

<div id="calendar" class="py-10" bind:this={calendarEl} />
<CalendarSubscriptionModal bind:open={showModal} />
