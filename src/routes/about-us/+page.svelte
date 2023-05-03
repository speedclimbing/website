<script lang="ts">
	import Contact from './Contact.svelte';
	import WhoAreWe from './WhoAreWe.svelte';
	import Imprint from './Imprint.svelte';
	import type { PageData } from './$types';
	import PrivacyPolicy from './PrivacyPolicy.svelte';

	export let data: PageData;
</script>

<WhoAreWe />
<Contact turnstileSiteKey={data.turnstileSiteKey} />
<Imprint />
<PrivacyPolicy />
