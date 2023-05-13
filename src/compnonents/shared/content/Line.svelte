<script lang="ts">
	export let color: string = 'red';
	export let length: string = '100px';
	export let style: string = '';
</script>

<div id="line" class={`bg-${color} rounded-sm w-[${length}] h-1 mt-5 mb-10 ${style}`} />
