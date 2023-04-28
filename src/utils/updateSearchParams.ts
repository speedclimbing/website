import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export function updateSearchParams(params: Object): void {
	if (!browser) return;

	const url = new URL(document.location.toString());
	Object.entries(params).forEach((value) => {
		if (value[1] == '') {
			url.searchParams.get(value[0]) && url.searchParams.delete(value[0]);
			return;
		}
		url.searchParams.set(value[0], value[1]);
	});
	goto(url.toString(), { keepFocus: true });
}
