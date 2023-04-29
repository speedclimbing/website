import type { RequestHandler } from './$types';

const redirect = (result: string) => {
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
export const POST: RequestHandler = async (event) => {
	const formData = await event.request.formData();

	const response = formData.get('cf-turnstile-response')?.toString() ?? '';

	if (!(await verifyCfTurnstileResponse(response, '1x0000000000000000000000000000000AA'))) {
		return redirect('captcha-failed');
	}

	return redirect('success');
};
