<script>
	import { Input } from 'flowbite-svelte';
	import Line from '../compnonents/shared/Line.svelte';
	import RankingsTable from '../compnonents/home/RankingsTable.svelte';
	import SwitchButton from '../compnonents/home/SwitchButton.svelte';
	import PrimaryButton from '../compnonents/shared/PrimaryButton.svelte';
</script>

<section
	id="rankings"
	class="bg-grey/5 px-[10%] lg:px-[15%] py-20 flex flex-col gap-10 dark:bg-black"
>
	<div
		id="rankings-search"
		class=" p-10 bg-[white] rounded-md border-grey/20 border-2 dark:bg-dark-grey"
	>
		<div class="flex gap-3 justify-between flex-col md:flex-row">
			<div>
				<h2 class="text-4xl font-bold">Player Search</h2>
				<Line />
			</div>
			<p class="text-sm font-light max-w-[300px] md:text-right mb-5 mt-[-30px] md:mt-0">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
				invidunt ut labore et dolore magna aliquyam
			</p>
		</div>

		<div class="flex gap-5 flex-col md:flex-row">
			<Input
				type="text"
				id="name"
				placeholder="Ahtlete Name"
				required
				class="rounded-sm font-Raleway bg-black/5"
			/>
			<PrimaryButton text="View all Athletes" />
		</div>
	</div>
	<div
		id="rankings-table"
		class="p-10 bg-[white] rounded-md border-grey/20 border-2 dark:bg-dark-grey"
	>
		<div class="flex gap-5 justify-between flex-col sm:flex-row">
			<div>
				<h2 class="text-4xl font-bold">World Rankings</h2>
				<Line color="yellow" />
			</div>
			<SwitchButton style="mb-10 mt-[-30px] sm:mt-0" />
		</div>
		<RankingsTable />
	</div>
</section>
