<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
</script>

<Table>
	<TableHead class="!text-black/40 dark:!text-white !bg-grey/5 dark:!bg-dark-grey">
		<TableHeadCell>Rank</TableHeadCell>
		<TableHeadCell>Competition</TableHeadCell>
		<TableHeadCell>Date</TableHeadCell>
		<TableHeadCell>FET</TableHeadCell>
	</TableHead>

	<TableBody>
		{#each new Array(10) as n, index}
			<TableBodyRow
				class="border-t-[1px] border-grey/10 dark:border-light-grey/60  dark:bg-grey"
				color="custom"
			>
				<TableBodyCell>{index + 1}</TableBodyCell>
				<TableBodyCell>IFSC - Test Event (B&L) - Barcelona (ESP) 2022</TableBodyCell>
				<TableBodyCell>25.07.2023</TableBodyCell>
				<TableBodyCell>5.68</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
