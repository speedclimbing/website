let timer: NodeJS.Timeout | undefined = undefined;
export async function debounce(): Promise<void> {
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
