<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let color = 'green';
	const dispatch = createEventDispatcher();
</script>

<div class="bg-{color} text-white rounded-lg p-4 text-sm" role="alert">
	<div class="flex items-center">
		<div><slot /></div>
		<button
			type="button"
			class="focus:outline-none whitespace-normal m-0.5 rounded-lg focus:ring-2 p-1.5 text-white focus:ring-white-400 hover:bg-white-200 ml-auto -mx-1.5 -my-1.5"
			aria-label="Close"
			on:click={() => {
				dispatch('close');
			}}
			><span class="sr-only">Close</span>
			<svg
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/></svg
			></button
		>
	</div>
</div>
