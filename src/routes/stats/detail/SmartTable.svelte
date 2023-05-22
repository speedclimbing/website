<script lang="ts">
	import PaginatedTable from 'components/shared/pagination/PaginatedTable.svelte';
	import type { AthleteResult } from 'types/Athlete';
	import { formatName } from 'utils/formatName';

	export let data: Record<string, string>[];

	const propertyToString = (entity: Record<string, string>, property: string) => {
		switch (property) {
			case 'first_name': {
				const athlete = entity as AthleteResult;
				return { value: formatName(athlete), col_name: 'full name' };
			}
			case 'nation_code_ioc': {
				return { value: entity[property], col_name: 'nation' };
			}
			case 'time': {
				return { value: (parseInt(entity[property]) / 1000).toFixed(3), col_name: 'time' };
			}
			case 'competition_date': {
				return { value: new Date(entity[property]).toLocaleDateString(), col_name: 'date' };
			}
			case 'competition_name': {
				return { value: entity[property], col_name: 'competition' };
			}
			case 'name': {
				return { value: entity[property], col_name: 'name' };
			}
			case 'final_entry_time': {
				return { value: (parseInt(entity[property]) / 1000).toFixed(3), col_name: 'time' };
			}
			case 'from': {
				return { value: new Date(entity[property]).toLocaleDateString(), col_name: 'date' };
			}
			default: {
				return undefined;
			}
		}
	};

	let normalizedData: { value: string; col_name: string }[][] = [];

	$: normalizedData = data.map((e, i) => {
		let res = [{ value: (i + 1).toString(), col_name: 'rank' }];
		for (const key of Object.keys(e)) {
			const val = propertyToString(e, key);
			if (val) res.push(val);
		}

		return res;
	});
</script>

<PaginatedTable
	tableObjects={normalizedData.map((e) => e.map((e) => e.value))}
	columnNames={normalizedData[0].map((e) => e.col_name)}
	pageSize={10}
/>
