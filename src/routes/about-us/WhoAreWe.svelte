<script>
	import AnchorPoint from 'components/shared/AnchorPoint.svelte';
	import TitleWithLine from 'components/shared/content/TitleWithLine.svelte';
	import { Avatar, Badge, Card } from 'flowbite-svelte';

	const people = [
		{
			name: 'Dorian Zedler',
			roles: ['software architecture', 'development'],
			about: `I'm a passionate speed climber and software developer. 
                When I'm not climbing, I study computer science at the TU Munich and build software like this website. 
				You may have heard of the 'Speedclimbing Stopwatch'-App - another project of mine.`,
			website: 'https://dorian.im',
			image: '/images/about-us/dorian.webp'
		},
		{
			name: 'Jakob Mayerhofer',
			roles: ['UI/UX design', 'development'],
			about:
				'I`m a big sports fan and love watching and analysing all kinds of competitions. Originally, I did competitive Judo, where I was in the national team for a few years. These days I, study information systems at the TU Munich. In my free time I love to do sports and work on projects like this.',
			image: '/images/about-us/jakob.webp'
		},
		{
			name: 'Peter Schnabel',
			roles: ['consulting', 'statistics'],
			about: `I'm the national coach of the German speedclimbing team and totally nuts about speed climbing. 
			Even though I originally come from track and field, I've been trying to transfer my knowledge to climbing since 2021, 
			and I'm getting a little bit better every day.`,
			image: '/images/about-us/peter.webp'
		}
	];

	const contributors = [
		{
			username: '16flotho',
			name: '16flotho'
		},
		{
			username: 'allesklardy',
			name: 'allesklardy'
		}
	];
</script>

<section class="py-6">
	<AnchorPoint id="who-we-are" />
	<TitleWithLine titleText="Who we are" />

	<h4 class="text-2xl font-bold pb-6">The core team</h4>

	<p class="text-lg pb-6">
		We are a passionate team and dedicate our free time to the development of this website. We want
		it to become a central palce of information for the whole speedclimbing community.
	</p>

	<div class="flex items-stretch justify-center flex-wrap gap-4">
		{#each people as person}
			<Card href={person.website} size="xl" class="flex-auto lg:max-w-[50%] 2xl:max-w-[33%]">
				<div class="flex justify-start items-center space-x-3">
					<img
						class="w-[70px] h-[70px] rounded-full"
						src={person.image}
						alt="image of {person.name}"
					/>
					<div class="space-y-2 font-medium dark:text-white text-left">
						<span class="text-2xl">{person.name}</span>
						<div class="flex gap-2">
							{#each person.roles as role}
								<Badge color="dark">{role}</Badge>
							{/each}
						</div>
					</div>
				</div>
				<p class="pt-4">
					{person.about}
				</p>
			</Card>
		{/each}
	</div>

	<h4 class="text-2xl font-bold pt-10 pb-6">Contributors</h4>

	<p class="text-lg pb-6">
		This website is an open source project and everone is welcome to contribute to it on
		<a href="https://github.com/speedclimbing/website" target="_blank">GitHub </a>! We'd like to
		thank everyone who has done so and thereby helped the project to succeed.
	</p>

	<div class="flex items-stretch flex-wrap gap-4">
		{#each contributors as contributor}
			<Badge
				color="dark"
				class="pl-0"
				rounded={true}
				href={`https://github.com/${contributor.username}`}
			>
				<div class="pl-[2px]">
					<Avatar src={`/images/about-us/contributors/${contributor.username}.webp`} />
				</div>
				<span class="pl-2  text-lg">{contributor.name}</span>
			</Badge>
		{/each}
	</div>
</section>

<style lang="postcss">
	p {
		@apply max-w-[50rem];
	}
</style>
