<script lang="ts">
	import { Moon, Sun } from 'svelte-heros-v2';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { browser } from '$app/environment';

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
	class="px-[10%] flex justify-between shadow fixed w-full {scrolled
		? 'bg-white dark:bg-black'
		: 'bg-transparent'} top-0 z-10"
>
	<Navbar
		let:hidden
		let:toggle
		color="none"
		class="text-gray-900 dark:text-gray-200 border-gray-100 dark:border-gray-700 px-2 sm:px-4 py-2.5 w-full px-0 sm:px-0"
	>
		<NavBrand id="logo" href="/">
			<p class="font-bold text-red dark:text-red">Speedclimbing.org</p>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl id="menu" {hidden} class="font-Raleway sm:items-center">
			<NavLi href="/" activeClass="text-red" nonActiveClass="hover:text-red">Trounaments</NavLi>
			<NavLi href="/" activeClass="text-red" nonActiveClass="hover:text-red">Athletes</NavLi>
			<NavLi href="/" activeClass="text-red" nonActiveClass="hover:text-red">Teams</NavLi>
			<NavLi href="/" activeClass="text-red" nonActiveClass="hover:text-red">Stats</NavLi>
			<NavLi href="/" activeClass="text-red" nonActiveClass="hover:text-red">About</NavLi>
			<NavLi>
				<button
					class="dark:text-white hover:text-red dark:hover:text-red"
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
