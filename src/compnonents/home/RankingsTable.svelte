<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
</script>

<Table hoverable={true}>
	<TableHead class="text-black/25">
		<TableHeadCell>Rank</TableHeadCell>
		<TableHeadCell>Full Name</TableHeadCell>
		<TableHeadCell>Country</TableHeadCell>
		<TableHeadCell>Points</TableHeadCell>
		<TableHeadCell>Pers. Best</TableHeadCell>
	</TableHead>

	<TableBody>
		<TableBodyRow class="border-t-[1px]">
			<TableBodyCell>1</TableBodyCell>
			<TableBodyCell>Veddriq LEONARDO</TableBodyCell>
			<TableBodyCell>INA</TableBodyCell>
			<TableBodyCell>$4450</TableBodyCell>
			<TableBodyCell>5.68</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow class="border-t-[1px]">
			<TableBodyCell>2</TableBodyCell>
			<TableBodyCell>Veddriq LEONARDO</TableBodyCell>
			<TableBodyCell>INA</TableBodyCell>
			<TableBodyCell>$4450</TableBodyCell>
			<TableBodyCell>5.68</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow class="border-t-[1px]">
			<TableBodyCell>3</TableBodyCell>
			<TableBodyCell>Veddriq LEONARDO</TableBodyCell>
			<TableBodyCell>INA</TableBodyCell>
			<TableBodyCell>$4450</TableBodyCell>
			<TableBodyCell>5.68</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
