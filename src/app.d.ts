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
			EMAIL_HOST: string;
			EMAIL_PORT: string;
			EMAIL_TLS: string;
			EMAIL_SSL: string;
			EMAIL_USER: string;
			EMAIL_PASSWORD: string;
			EMAIL_FROM: string;
			EMAIL_TO: string;
			TURNSTILE_SECRET_KEY: string;
			TURNSTILE_SITE_KEY: string;
		};
	}
}
