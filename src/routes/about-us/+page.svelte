<script lang="ts">
	import Contact from './Contact.svelte';
	import WhoAreWe from './WhoAreWe.svelte';
	import Imprint from './Imprint.svelte';
	import type { PageData } from './$types';
	import PrivacyPolicy from './PrivacyPolicy.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>About our Team</title>
	<meta
		name="description"
		content="Meet the Team behind Speedclimbing.org! 
		Contact us if you have any questions or suggestions."
	/>
</svelte:head>

<WhoAreWe />
<Contact turnstileSiteKey={data.turnstileSiteKey} />
<Imprint />
<PrivacyPolicy />
