<script lang="ts">
	import type { Competition } from 'types/Competition';
	import { Calendar } from 'fullcalendar';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import { onMount } from 'svelte';
	import { stringToHex } from 'utils/stringToHex';
	import { mounted } from 'utils/mounted';
	import CalendarSubscriptionModal from './CalendarSubscriptionModal.svelte';

	export let competitions: Competition[];
	export let date: Date | undefined = undefined;
	let calendarEl: HTMLElement;
	let calendar: Calendar;
	let showModal: boolean;
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
						date = calendar.getDate();
					}
				},
				customnext: {
					icon: 'chevron-right',
					click: function () {
						calendar.next();
						date = calendar.getDate();
					}
				},
				subscribeToCalendar: {
					text: 'Subscribe to calendar',
					click: () => (showModal = true)
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

		if (date || competitions.length > 0) {
			calendar.gotoDate(date ?? competitions[0].from);
		}
	}
	$: {
		if (!isMounted()) break $;
		updateCalendarEvents(competitions);
		calendar.render();
	}
</script>

<div id="calendar" class="py-10 text-black dark:text-white" bind:this={calendarEl} />
<CalendarSubscriptionModal bind:open={showModal} />
