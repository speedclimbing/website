<script lang="ts">
	import { Modal, Tooltip } from 'flowbite-svelte';
	import { Clipboard } from 'svelte-heros-v2';

	export let open: boolean;
	let params: URLSearchParams;
	const url = 'https://ics.speedclimbing.org/?';

	$: {
		if (open) {
			params = new URL(document.location.toString()).searchParams;
			params.delete('year');
		}
	}
</script>

<Modal
	bind:open
	title="Subscribe to calendar"
	size="md"
	placement="center"
	class="px-7 py-2 overflow-hidden"
>
	<p>
		To subscribe to our Competiton calendar just click on the link below to copy and import it to
		your personal calendar.
	</p>
	<Tooltip trigger="click" triggeredBy="#copy" arrow placement="top" style="auto">Copied!</Tooltip>
	<button
		id="copy"
		class=" border-light-grey dark:border-grey border-2 rounded-[10px] flex items-center w-full"
		on:click={() => {
			navigator.clipboard.writeText(url + params.toString());
		}}
	>
		<div class="inline-block bg-light-grey dark:bg-grey p-2">
			<Clipboard class="text-white dark:text-light-grey" />
		</div>
		<p
			class="inline-block px-3 hover:text-light-grey whitespace-nowrap overflow-hidden text-ellipsis w-full"
		>
			{url + params.toString()}
		</p>
	</button>

	<div>
		<p>Having trouble importing? Here are a few helpful tutorials:</p>
		<ul class="mt-0 text-blue-500">
			<li><a href="https://support.google.com/calendar/answer/37100">Add to Google Calendar</a></li>
			<li>
				<a href="https://support.apple.com/en-mn/guide/iphone/iph3d1110d4/16.0/ios/16.0"
					>Add to IPhone Calendar</a
				>
			</li>
		</ul>
	</div>
</Modal>
