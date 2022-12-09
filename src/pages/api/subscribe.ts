import mailchimp, { AddListMemberBody } from '@mailchimp/mailchimp_marketing';
import * as dotenv from 'dotenv';
dotenv.config();

mailchimp.setConfig({
	apiKey: process.env.SECRET_KEY,
	server: process.env.SERVER,
});
const listId = process.env.LISTID || '0';

import { APIRoute } from 'astro';

export const get: APIRoute = () => {
	return {
		body: 'The API server is UP',
	};
};

export const post: APIRoute = async ({ request }) => {
	let _error: unknown;
	let status = '1'; //wow that's bad
	if (request.headers.get('content-type')?.includes('application/json')) {
		try {
			status = '2';
			const body = await request.json();
			const email = body.email;
			const validEmail = validateEmail(email);
			status = '4';
			if (!validEmail) {
				return new Response(null, {
					status: 400,
					statusText: 'Email Invalid',
				});
			}
			const jsonData: AddListMemberBody = {
				email_address: email,
			};
			try {
				const response = await mailchimp.lists.addListMember(listId, jsonData);
				if (response.status != 'subscribed') {
					return new Response(null, {
						status: 400,
						statusText: 'MailChimp error',
					});
				}
				status = '5';
			} catch (error) {
				_error = error;
				return new Response(null, {
					status: 500,
					statusText: 'MailChimp errored with error\n' + error,
				});
			}
			status = '6';
			return new Response(
				JSON.stringify({
					message: 'email subscribed',
				}),
				{
					status: 200,
				}
			);
			status = '7';
		} catch (error) {
			_error = error;
		}
	}
	return new Response(JSON.stringify({ request: request, error: _error, status: status }), { status: 400 });
};

const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
