import type { Competition } from 'src/types/Competition';

export function isPromise(
	value: Competition[] | Promise<Competition[]>
): value is Promise<Competition[]> {
	return Object.prototype.toString.call(value) === '[object Promise]';
}
