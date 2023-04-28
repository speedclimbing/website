<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { getFlagEmoji } from '../../utils/getFlagEmoji';
</script>

<Table noborder divClass="relative overflow-x-auto my-5 ">
	<TableBody>
		{#each new Array(5) as n, i}
			<TableBodyRow color="custom">
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium text-md "
					>{i + 1}</TableBodyCell
				>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium text-[25px]"
					>{getFlagEmoji('de')}</TableBodyCell
				>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium ">Germany</TableBodyCell>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium "
					><div
						class="rounded-[50%] aspect-square h-9 bg-yellow flex items-center justify-center text-white"
					>
						10
					</div></TableBodyCell
				>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium "
					><div
						class="rounded-[50%] aspect-square h-9 bg-light-grey flex items-center justify-center text-white"
					>
						12
					</div></TableBodyCell
				>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium "
					><div
						class="rounded-[50%] aspect-square h-9 bg-bronze flex items-center justify-center text-white"
					>
						7
					</div></TableBodyCell
				>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium text-[18px]"
					>29</TableBodyCell
				>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<style>
	.bg-bronze {
		background-image: linear-gradient(rgba(187, 148, 87, 0.7), rgba(187, 148, 87, 0.7)),
			linear-gradient(#da3c2b, #da3c2b);
	}
</style>
