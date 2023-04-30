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
	senderEmail: string;
	senderName: string;
	senderMessage: string;
}

async function sendEmail(formrecevrUrl: string, form: ContactFormSubmission) {
	let formData = new FormData();
	formData.set('email', form.senderEmail);
	formData.set('name', form.senderName);
	formData.set('message', form.senderMessage);

	let response = await fetch(formrecevrUrl, {
		method: 'POST',
		body: formData,
		headers: { Accept: 'application/json' }
	});

	return response.ok;
}

const validateFormData = async (
	formData: FormData,
	turnstileSecretKey?: string
): Promise<ContactFormSubmission | false> => {
	const turnstileResponse = formData.get('cf-turnstile-response')?.toString() ?? '';
	if (
		turnstileSecretKey &&
		!(await verifyCfTurnstileResponse(turnstileResponse, turnstileSecretKey))
	) {
		return false;
	}

	const senderEmail = formData.get('email')?.toString();
	const senderName = formData
		.get('name')
		?.toString()
		.replaceAll(/[^A-Za-z- ]/g, '');
	const senderMessage = formData.get('message')?.toString();

	if (!senderName || !senderMessage || !senderEmail || !senderEmail.match(EMAIL_REGEX)) {
		return false;
	}

	return {
		senderEmail,
		senderName,
		senderMessage
	};
};

const handleFormSubmission = async (
	formData: FormData,
	env?: { TURNSTILE_SECRET_KEY: string; FORMRECEVR_URL: string }
) => {
	const contactFormSubmission = await validateFormData(formData, env?.TURNSTILE_SECRET_KEY);
	if (!contactFormSubmission) {
		return 'invalid-form';
	}

	if (!env?.FORMRECEVR_URL) {
		return 'error';
	}

	const { senderEmail, senderName, senderMessage } = contactFormSubmission;

	const result = await sendEmail(env?.FORMRECEVR_URL, {
		senderEmail,
		senderName,
		senderMessage
	});

	return result ? 'success' : 'error';
};

export const POST: RequestHandler = async (event) => {
	const formData = await event.request.formData();

	const result = await handleFormSubmission(formData, event.platform?.env);

	return respond(result, event.request.headers);
};
