<script lang="ts">
	import { Modal, Tooltip } from 'flowbite-svelte';
	import { Clipboard } from 'svelte-heros-v2';

	export let showModal: boolean;
</script>

<Modal
	bind:open={showModal}
	title="Subscribe to calendar"
	size="md"
	placement="center"
	class="px-7 py-2"
>
	<p>
		To subscribe to our Competiton calendar just copy the link below and import it to your personal
		calendar.
	</p>
	<Tooltip trigger="click" triggeredBy="#copy" arrow placement="right" style="auto">Copied!</Tooltip
	>
	<button
		id="copy"
		class=" border-light-grey dark:border-grey border-2 rounded-[10px] flex items-center overflow-hidden"
		on:click={() => {
			navigator.clipboard.writeText('https://ics.speedclimbing.org/');
		}}
	>
		<div class="inline-block bg-light-grey dark:bg-grey p-2">
			<Clipboard class="text-white dark:text-light-grey" />
		</div>
		<p class="inline-block px-3 hover:text-light-grey">https://ics.speedclimbing.org/</p>
	</button>

	<div>
		<p>Having trouble importing? Here are a few helpful tutorials:</p>
		<ul class="mt-0 text-blue-500">
			<li><a href="https://support.google.com/calendar/answer/37100">Add to Google Calendar</a></li>
		</ul>
	</div>
</Modal>
