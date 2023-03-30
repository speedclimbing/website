export function updateSearchParams(params: Object, url: URL): void {
	Object.entries(params).forEach((value) => {
		if (value[1] == '') {
			url.searchParams.get(value[0]) && url.searchParams.delete(value[0]);
			return;
		}
		url.searchParams.set(value[0], value[1]);
	});
	window.history.pushState({}, '', url);
}
