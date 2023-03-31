let timer: NodeJS.Timeout | undefined = undefined;
let previousResolve: ((res: boolean) => void) | undefined = undefined;

export async function debounce(): Promise<boolean> {
	return new Promise((resolve, _) => {
		if (!timer) {
			timer = setTimeout(() => {
				timer = undefined;
			}, 500);
			resolve(true);
			return;
		}

		clearTimeout(timer);
		previousResolve?.(false);
		previousResolve = resolve;

		timer = setTimeout(() => {
			resolve(true);
		}, 500);
	});
}
