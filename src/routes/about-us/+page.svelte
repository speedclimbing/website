<script lang="ts">
	import Contact from './Contact.svelte';
	import WhoAreWe from './WhoAreWe.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<WhoAreWe />
<Contact turnstileSiteKey={data.turnstileSiteKey} />
