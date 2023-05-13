<script lang="ts">
	export let className: string = '';
</script>

<div
	class="px-[5vw] py-10 bg-white dark:bg-grey dark:border-white/5 rounded-md border-2 shadow-box-light col-span-10 {className}"
>
	<slot />
</div>
