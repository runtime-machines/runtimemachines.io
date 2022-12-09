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
	if (request.headers.get('content-type')?.includes('application/json')) {
		try {
			const body = await request.json();
			const email = body.email;
			const validEmail = validateEmail(email);
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
			} catch (error) {
				_error = error;
				return new Response(null, {
					status: 500,
					statusText: 'MailChimp errored with error\n' + error,
				});
			}
			return new Response(
				JSON.stringify({
					message: 'email subscribed',
				}),
				{
					status: 200,
				}
			);
		} catch (error) {
			_error = error;
		}
	}
	return new Response(JSON.stringify({ request: request, error: _error }), { status: 400 });
};

const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
