// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	interface Platform {
		env?: {
			API_TOKEN: string;
			FORMRECEVR_URL: string;
			TURNSTILE_SECRET_KEY: string;
			TURNSTILE_SITE_KEY: string;
		};
	}
}
