import { dev } from '$app/environment';
export const API_URL = dev ? 'http://localhost:8000/v1' : 'https://api.speedclimbing.org/v1';
