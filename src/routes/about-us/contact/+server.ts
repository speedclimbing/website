import type { RequestHandler } from './$types';

const respond = (result: string, headers: Headers) => {
	if (headers.has('Accept') && headers.get('Accept') == 'application/json') {
		return new Response(JSON.stringify({ result: result }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	return new Response('Redirect', {
		status: 303,
		headers: { Location: `/about-us?contact-result=${result}#contact` }
	});
};

interface TokenValidateResponse {
	'error-codes': string[];
	success: boolean;
	action: string;
	cdata: string;
}

async function verifyCfTurnstileResponse(token: string, secret: string) {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			response: token,
			secret: secret
		})
	});

	const data: TokenValidateResponse = await response.json();

	return data.success;
}

const EMAIL_REGEX =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

interface ContactFormSubmission {
	formrecevrUrl: string;
	senderEmail: string;
	senderName: string;
	senderMessage: string;
}

async function sendEmail(form: ContactFormSubmission) {
	let formData = new FormData();
	formData.set('email', form.senderEmail);
	formData.set('name', form.senderName);
	formData.set('message', form.senderMessage);

	let response = await fetch(form.formrecevrUrl, {
		method: 'POST',
		body: formData,
		headers: { Accept: 'application/json' }
	});

	return response.ok;
}

export const POST: RequestHandler = async (event) => {
	const env = event.platform?.env;
	if (!env?.FORMRECEVR_URL) {
		return respond('error', event.request.headers);
	}

	const formData = await event.request.formData();

	const response = formData.get('cf-turnstile-response')?.toString() ?? '';

	if (
		env?.TURNSTILE_SECRET_KEY &&
		!(await verifyCfTurnstileResponse(response, env?.TURNSTILE_SECRET_KEY))
	) {
		return respond('captcha-failed', event.request.headers);
	}

	const senderEmail = formData.get('email')?.toString() ?? '';
	const senderName = formData
		.get('name')
		?.toString()
		.replaceAll(/[^A-Za-z- ]/g, '');
	const senderMessage = formData.get('message')?.toString();

	if (!senderEmail || !senderEmail.match(EMAIL_REGEX) || !senderName || !senderMessage) {
		return respond('invalid-form', event.request.headers);
	}

	if (
		!(await sendEmail({
			formrecevrUrl: env?.FORMRECEVR_URL,
			senderEmail,
			senderName,
			senderMessage
		}))
	) {
		return respond('error', event.request.headers);
	}

	return respond('success', event.request.headers);
};
