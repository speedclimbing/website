<script lang="ts">
	import type { Competition } from 'src/types/Competition';
	import type { League } from 'src/types/League';
	import type { PageData } from './$types';
	import EventCard from '../../compnonents/home/EventCard.svelte';
	import { Input } from 'flowbite-svelte';
	import { _loadCompetitions, _loadLeagues } from './+page';
	import { Calendar } from 'fullcalendar';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import { onMount } from 'svelte';

	export let data: PageData;
	let competitions: Competition[] = data.competitions;
	let leagues: League[] = data.leagues;
	let name: string = '';
	let nation: string = '';
	let leagueId: string = '';
	let viewCalendar: boolean = false;
	const currentDate: Date = new Date();
	let year: number = currentDate.getFullYear();
	let calendar: Calendar | null = null;

	async function handleSearch(year: number, name: string, nation: string, leagueId: string) {
		competitions = await _loadCompetitions(year, name, nation, leagueId);
		leagues = await _loadLeagues(year);
	}

	$: {
		handleSearch(year, name, nation, leagueId);
	}

	$: {
		updateCalendarEvents(competitions);
	}

	function handleToggleCalendar() {
		if (!calendar) return;
		viewCalendar ? calendar.destroy() : calendar.render();
		viewCalendar = !viewCalendar;
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

	let timer: NodeJS.Timeout;
	const debounce = (newValue: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			name = newValue;
		}, 500);
	};

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
	});
</script>

<section id="competitions">
	<div class="flex gap-[10px] mt-10">
		<Input
			type="text"
			id="name"
			placeholder="Competition Name"
			required
			class="rounded-sm font-Raleway bg-black/5"
			on:keyup={({ target }) => {
				if (target instanceof HTMLInputElement) debounce(target.value);
			}}
		/>
		<select
			bind:value={year}
			on:change={() => {
				leagueId = '';
			}}
		>
			{#each [...Array(10).keys()] as number}
				<option>{currentDate.getFullYear() - number}</option>
			{/each}
		</select>
		<select bind:value={leagueId}>
			<option value="">All Leagues</option>
			{#each leagues as l}
				<option value={l.id}>{l.name}</option>
			{/each}
		</select>

		<select bind:value={nation}>
			<option value="">All nations</option>
			{#each data.nations as n}
				<option value={n.id}>{n.code}</option>
			{/each}
		</select>
		<input id="toggle-calendar" type="checkbox" on:click={() => handleToggleCalendar()} />
		<label for="toggle-calendar">View Calendar</label>
	</div>
	{#if !viewCalendar}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
			{#each competitions as competition, index (index)}
				<EventCard {competition} />
			{/each}
		</div>
	{/if}

	<div id="calendar" />
</section>
