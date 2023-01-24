import { browser } from '$app/environment';
import type { Load } from '@sveltejs/kit';
import type { Athlete } from 'src/types/Athlete';
import type { Gender } from 'src/types/Gender';

export const load: Load = async ({
	fetch,
	url
}): Promise<{
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
	url: URL;
	athletesPromises?: [Promise<Athlete[]>];
	athletes?: Athlete[];
}> => {
	let athletesPromise: Promise<Athlete[]> = _handleSearch(
		url.searchParams.get('name') ?? undefined
	);

	if (!browser) {
		return {
			fetch,
			url,
			athletes: await athletesPromise
		};
	}

	return {
		fetch,
		url,
		athletesPromises: [athletesPromise]
	};
};

export async function _handleSearch(
	name?: string,
	nation?: string,
	gender?: Gender,
	personalBest?: number
): Promise<Athlete[]> {
	await debounce();
	const response = await fetch(
		'https://api.speedclimbing.org/v1/athlete?' +
			new URLSearchParams({
				name: (name ?? '').toLocaleLowerCase(),
				nation: nation ?? '',
				gender: gender ?? '',
				personal_best: personalBest?.toString() ?? ''
			})
	);

	const athletes: Athlete[] = await response.json();

	if (athletes.length == 0) {
		throw new Error('No athletes found');
	}

	return athletes;
}

let timer: NodeJS.Timeout | undefined = undefined;
async function debounce(): Promise<void> {
	return new Promise((resolve, _) => {
		if (!timer) {
			timer = setTimeout(() => {
				timer = undefined;
			}, 500);
			resolve();
			return;
		}

		clearTimeout(timer);
		timer = setTimeout(() => {
			resolve();
		}, 500);
	});
}
