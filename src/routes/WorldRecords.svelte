<script>
	import RecordCardFemale from '../compnonents/home/RecordCardFemale.svelte';
	import RecordCardMale from '../compnonents/home/RecordCardMale.svelte';
</script>

<section id="world-records" class="py-[100px] px-[5%] lg:px-[20%]">
	<h2 class="text-4xl font-bold text-center">Current World Records</h2>
	<div id="line" class="bg-yellow rounded-sm w-[100px] h-1 mt-5 mb-10 mx-auto" />
	<div class="flex flex-col gap-20 mx-auto justify-center mt-20 items-center lg:flex-row lg:gap-10">
		<RecordCardFemale />
		<RecordCardMale />
	</div>
</section>
