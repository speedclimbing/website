<script lang="ts">
	import { Moon, Sun } from 'svelte-heros-v2';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let darkMode: boolean = false;
	let scrolled: boolean = false;

	$: {
		if (darkMode && browser) {
			document.documentElement.classList.add('dark');
		} else if (browser) {
			document.documentElement.classList.remove('dark');
		}
	}

	function handleClick(e: any) {
		darkMode = !darkMode;
	}

	if (browser) {
		// On page load or when changing themes
		const prefersColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');
		prefersColorSchemeDark.addEventListener('change', (e) => (darkMode = e.matches));
		darkMode = prefersColorSchemeDark.matches;

		scrolled = document.documentElement.scrollTop > 10;
		window.addEventListener('scroll', () => (scrolled = document.documentElement.scrollTop > 10));
	}
</script>

<header
	class="px-[10%] lg:px-[15%] flex justify-between fixed w-full {scrolled ||
	$page.url.pathname !== '/'
		? 'bg-white dark:bg-black shadow'
		: 'bg-white/0 dark:bg-white/0'} top-0 z-10 transition-colors duration-500"
>
	<Navbar
		let:hidden
		let:toggle
		color="none"
		class="text-black dark:text-dark-white {scrolled
			? ''
			: 'text-dark-white'} border-gray-100 dark:border-gray-700 px-2 sm:px-4 py-2.5 w-full px-0 sm:px-0"
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
			ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-bold"
		>
			<NavLi href="/" activeClass="text-red" nonActiveClass="hover:text-red">Trounaments</NavLi>
			<NavLi href="/" activeClass="text-red" nonActiveClass="hover:text-red">Athletes</NavLi>
			<NavLi href="/" activeClass="text-red" nonActiveClass="hover:text-red">Teams</NavLi>
			<NavLi href="/" activeClass="text-red" nonActiveClass="hover:text-red">Stats</NavLi>
			<NavLi href="/" activeClass="text-red" nonActiveClass="hover:text-red">About</NavLi>
			<NavLi>
				<button
					class="text-black font-bold dark:text-gray-200 hover:text-red dark:hover:text-red {scrolled
						? ''
						: 'text-dark-white'}"
					on:click={(e) => handleClick(e)}
				>
					{#if darkMode}
						<Moon />
					{:else}
						<Sun />
					{/if}
				</button>
			</NavLi>
		</NavUl>
	</Navbar>
</header>
