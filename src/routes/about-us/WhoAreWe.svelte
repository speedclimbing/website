<script>
	import Line from 'compnonents/shared/Line.svelte';
	import { A, Avatar, Badge, Card, P } from 'flowbite-svelte';

	const people = [
		{
			name: 'Dorian Zedler',
			roles: ['software architecture', 'development'],
			about: `I'm a passionate speed climber and software developer. 
                When I'm not climbing, I study computer science at the TU Munich and build software like this website. `,
			website: 'https://dorian.im',
			image: '/images/about-us/dorian.jpg'
		},
		{
			name: 'Jakob Mayerhofer',
			roles: ['UI/UX design', 'development'],
			about: 'I study at the TU Munich blablabalbala .....',
			image: '/images/about-us/jakob.jpg'
		},
		{
			name: 'Peter Schnabel',
			roles: ['consulting', 'statistics'],
			about: 'I am the national speedclimbing coach of germany blablabalbal.....',
			image: '/images/about-us/peter.jpg'
		}
	];

	const contributors = [
		{
			username: '16flotho',
			name: '16flotho'
		}
	];
</script>

<section class="py-6">
	<h2 class="text-4xl font-bold">Who we are</h2>
	<Line color="red" />

	<h4 class="text-2xl text-center font-bold pb-6">The core team</h4>

	<p class="text-center text-lg pb-6">
		We are a passionate team and dedicate our free time to the development of this website. We want
		it to become a central palce of information for the whole speedclimbing community.
	</p>

	<div class="flex items-stretch flex-wrap justify-center gap-4">
		{#each people as person}
			<Card img={person.image} href={person.website} horizontal class="flex-auto">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{person.name}
				</h5>
				<div class="flex gap-2 py-2">
					{#each person.roles as role}
						<Badge color="dark">{role}</Badge>
					{/each}
				</div>
				<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
					{person.about}
				</p>
			</Card>
		{/each}
	</div>

	<h4 class="text-2xl text-center font-bold pt-10 pb-6">Contributors</h4>

	<p class="text-center text-lg pb-6">
		This website is an open source project and everone is welcome to contribute to it on
		<a href="https://github.com/speedclimbing/website" target="_blank">GitHub </a>! We'd like to
		thank everyone who has done so and thereby helped the project to succeed.
	</p>

	<div class="flex items-stretch flex-wrap justify-center gap-4">
		{#each contributors as contributor}
			<Badge
				color="dark"
				class="pl-0"
				rounded={true}
				href={`https://github.com/${contributor.username}`}
			>
				<Avatar src={`/images/about-us/contributors/${contributor.username}.png`} />
				<p class="pl-2 text-lg">{contributor.name}</p>
			</Badge>
		{/each}
	</div>
</section>
