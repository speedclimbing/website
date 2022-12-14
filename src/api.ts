import { browser, dev } from '$app/environment';
import Cookies from 'cookies-ts';

export const API_URL =
	process.env.NODE_ENV && process.env.NODE_ENV === 'development'
		? 'http://127.0.0.1:8000/v1'
		: 'https://api.speedclimbing.org/v1';

const cookies = new Cookies();

export const authorize = (r: Request) => {
	if (browser) {
		r.headers.append('authorization', `Bearer ${cookies.get('session')}`);
	}
};
