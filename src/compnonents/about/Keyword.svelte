<script lang="ts">
	export let color: string = 'red';
	export let bold: boolean = true;
	export let uppercase: boolean = false;
</script>

<span class="text-{color} {uppercase && 'uppercase'} {bold && 'font-bold'}"><slot /></span>
