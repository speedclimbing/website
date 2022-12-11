<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { Card, Timeline, TimelineItem } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	if (!data.ok && browser) {
		goto('/login');
	} else if (!data.ok) {
		redirect(307, '/login');
	}
</script>

<div class="flex justify-center m-6">
	<Card img="/images/banner.png" size="md">
		<h3 class="p-0 text-lg font-semibold text-gray-900 dark:text-white">World record history:</h3>
		<Timeline>
			{#each data.data as record}
				<TimelineItem
					title={`${record.first_name} ${record.last_name}: ${record.result / 1000}s`}
					date={record.competition_date}
				>
					<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
						{record.competition_name}
					</p>
				</TimelineItem>
			{/each}
		</Timeline>
	</Card>
</div>
