import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import type { RequestHandler } from './$types';
import nodemailer from 'nodemailer';

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

async function sendEmail(
	options: SMTPTransport.Options,
	senderEmail: string,
	senderName: string,
	senderMessage: string,
	fromEmail: string,
	toEmail: string
) {
	let transporter = nodemailer.createTransport(options);

	const info = await transporter.sendMail({
		from: `"${senderName}" <${fromEmail}>`,
		to: toEmail,
		subject: 'speedclimbing.ord contact form submission',
		replyTo: `"${senderName}" <${senderEmail}>`,
		text: senderMessage
	});

	return info.accepted;
}

export const POST: RequestHandler = async (event) => {
	const env = event.platform?.env;

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
		.replace(/[^A-Za-z- ]/, '');
	const senderMessage = formData.get('message')?.toString();

	if (!senderEmail || !senderEmail.match(EMAIL_REGEX) || !senderName || !senderMessage) {
		return respond('invalid-form', event.request.headers);
	}

	if (!env) {
		return respond('error', event.request.headers);
	}

	const options = {
		host: env.EMAIL_HOST,
		port: parseInt(env.EMAIL_PORT),
		secure: env.EMAIL_SSL === 'true',
		requireTLS: env.EMAIL_TLS === 'true',
		auth: {
			user: env.EMAIL_USER,
			pass: env.EMAIL_PASSWORD
		},
		logger: false
	};

	if (
		!(await sendEmail(
			options,
			senderEmail,
			senderName,
			senderMessage,
			env.EMAIL_FROM,
			env.EMAIL_TO
		))
	) {
		return respond('error', event.request.headers);
	}

	return respond('success', event.request.headers);
};
