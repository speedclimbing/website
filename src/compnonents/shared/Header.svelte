<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let scrolled: boolean = false;
	let transparent: boolean = false;

	$: transparent = !scrolled && $page.url.pathname === '/' && browser;

	if (browser) {
		scrolled = document.documentElement.scrollTop > 10;
		window.addEventListener('scroll', () => (scrolled = document.documentElement.scrollTop > 10));
	}

	const items = {
		'/competition': 'Competitions',
		'/athlete': 'Athletes',
		'/team': 'Teams',
		'/stats': 'Stats',
		'/about': 'About'
	};
</script>

<header
	class="px-[10%] lg:px-[15%] flex justify-between fixed w-full {transparent
		? 'bg-white/0 dark:bg-white/0'
		: 'bg-white dark:bg-black shadow'} top-0 z-10 transition-colors duration-500"
>
	<Navbar
		let:hidden
		let:toggle
		color="none"
		class="text-black dark:text-dark-white {transparent &&
			'text-dark-white'} border-gray-100 dark:border-gray-700 py-2.5 w-full px-0 sm:px-0"
		navDivClass="mx-0 flex flex-wrap justify-between items-center  container"
	>
		<NavBrand id="logo" href="/">
			<img src="/favicon.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
			<p class="font-bold text-red dark:text-red text-xl">speedclimbing</p>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl
			id="menu"
			{hidden}
			class="font-Raleway sm:items-center"
			ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-base font-bold"
			slideParams={{ delay: 0 }}
		>
			{#each Object.entries(items) as [path, name]}
				<NavLi
					href={path}
					activeClass="text-red"
					nonActiveClass="hover:text-red"
					on:click={() => {
						!hidden && toggle();
					}}>{name}</NavLi
				>
			{/each}
		</NavUl>
	</Navbar>
</header>
