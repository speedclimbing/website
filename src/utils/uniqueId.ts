import { get } from 'svelte/store';
import { nextId } from '../stores';

export function uniqueId() {
	const id = get(nextId);
	nextId.set(id + 1);
	return `uid-${id}`;
}
