<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { getFlagEmoji } from '../../utils/getFlagEmoji';
	import MedalCountCircle from './MedalCountCircle.svelte';
	import type { NationPointsAndMedalsCount } from 'types/Nation';

	export let data: NationPointsAndMedalsCount[];
</script>

<Table noborder divClass="relative overflow-x-auto my-5 ">
	<TableBody>
		{#each data as nation, i}
			<TableBodyRow color="custom">
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium text-md "
					>{i + 1}</TableBodyCell
				>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium text-[25px]"
					>{getFlagEmoji(nation.alpha2_code)}</TableBodyCell
				>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium ">
					{nation.ioc_code}
				</TableBodyCell>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium ">
					<MedalCountCircle count={nation.gold} type="gold" />
				</TableBodyCell>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium ">
					<MedalCountCircle count={nation.silver} type="silver" />
				</TableBodyCell>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium ">
					<MedalCountCircle count={nation.bronze} type="bronze" />
				</TableBodyCell>
				<TableBodyCell tdClass="px-4 py-2 whitespace-nowrap font-medium text-[18px]">
					{nation.points}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
