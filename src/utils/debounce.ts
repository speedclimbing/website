let timer: NodeJS.Timeout | undefined = undefined;
let previousResolve: ((res: boolean) => void) | undefined = undefined;

export async function debounce(): Promise<boolean> {
	return new Promise((resolve, _) => {
		if (timer) {
			clearTimeout(timer);
			previousResolve?.(false);
		}

		previousResolve = resolve;

		timer = setTimeout(() => {
			resolve(true);
		}, 500);
	});
}
