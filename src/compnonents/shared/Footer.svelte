<script>
	import { NavBrand } from 'flowbite-svelte';
</script>

<footer
	class="bg-black flex px-[10%] lg:px-[15%] py-[50px] font-Raleway text-white flex-col justify-between gap-14 lg:flex-row"
>
	<div>
		<NavBrand href="/" class="pb-4">
			<img src="/favicon.png" class="mr-3 h-6 sm:h-9" alt="Logo" />
			<p class="font-bold text-red dark:text-red text-xl">speedclimbing.org</p>
		</NavBrand>
		<div class="bg-red rounded-sm w-[100px] h-1" />
		<p class="w-[300px] mt-[20px]">
			Speedclimbing.org is developed and provided by
			<a href="https://github.com/speedclimbing/website"> the community </a>. It is not affiliated
			with the IFSC in any way.
		</p>
	</div>
	<div id="site-map" class="grid grid-cols-1 gap-10 sm:gap-20 sm:grid-cols-2 md:grid-cols-3">
		<div class="flex flex-col">
			<p class="text-light-grey font-light text-lg mb-3 dark:text-light-grey">Search</p>
			<ul class=" font-medium flex-col gap-2 flex">
				<a href="/competition">Competitions</a>
				<a href="/athlete">Athletes</a>
				<a href="/stats">Stats</a>
			</ul>
		</div>
		<div class="flex flex-col">
			<p class="text-light-grey font-light text-lg mb-3 dark:text-light-grey">Speedclimbing</p>
			<ul class=" font-medium flex-col gap-2 flex">
				<a href="/about#the-sport">The sport</a>
				<a href="/about#the-wall">The wall</a>
				<a href="/about#the-rules">The rules</a>
			</ul>
		</div>
		<div class="flex flex-col">
			<p class="text-light-grey font-light text-lg mb-3 dark:text-light-grey">About</p>
			<ul class=" font-medium flex-col gap-2 flex">
				<a href="/about-us#contact">Contact</a>
				<a href="/about-us#impress">Impress</a>
				<a href="/about-us#privacy-policy">Privacy Policy</a>
			</ul>
		</div>
	</div>
</footer>

<style>
	ul > a {
		color: white;
	}
</style>
