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

interface MailChimpErrorResponse {
	status: number;
	response: {
		req: Request;
		status: number;
		text: string;
	};
}

export const post: APIRoute = async ({ request }) => {
	const headers = new Headers();
	headers.set('Access-Control-Allow-Origin', '*');
	if (request.headers.get('content-type')?.includes('application/json')) {
		try {
			const body = await request.json();
			const email = body.email;
			const validEmail = validateEmail(email);
			if (!validEmail) {
				return new Response('Email Invalid', {
					status: 400,
					headers: headers,
				});
			}
			const jsonData: AddListMemberBody = {
				email_address: email,
				status: 'subscribed',
			};
			try {
				const response = await mailchimp.lists.addListMember(listId, jsonData);
				if (response.status != 'subscribed' && response.status != 'pending') {
					return new Response('MailChimp error', {
						status: 400,
						headers: headers,
					});
				}
			} catch (error: unknown) {
				try {
					console.log(error);
					const x = error as MailChimpErrorResponse;
					return new Response(x.response.text, {
						status: 400,
						headers: headers,
					});
				} catch (error) {
					console.log(error);
					return new Response('internal server error', {
						status: 500,
						headers: headers,
					});
				}
			}
			console.log('Subscribed user ', email);
			return new Response(
				JSON.stringify({
					message: 'email subscribed',
				}),
				{
					status: 200,
					headers: headers,
				}
			);
		} catch (error) {
			console.log(error);
		}
	}
	return new Response(null, { status: 400, headers: headers });
};

const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
