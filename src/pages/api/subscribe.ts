import mailchimp, { AddListMemberBody, MemberErrorResponse } from '@mailchimp/mailchimp_marketing';
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
	if (request.headers.get('content-type')?.includes('application/json')) {
		try {
			const body = await request.json();
			const email = body.email;
			const validEmail = validateEmail(email);
			if (!validEmail) {
				return new Response('Email Invalid', {
					status: 400,
				});
			}
			const jsonData: AddListMemberBody = {
				email_address: email,
				status: 'pending',
			};
			try {
				const response = await mailchimp.lists.addListMember(listId, jsonData);
				if (response.status != 'subscribed' && response.status != 'pending') {
					return new Response('MailChimp error', {
						status: 400,
					});
				}
			} catch (error: unknown) {
				try {
					const x = error as MailChimpErrorResponse;
					return new Response(x.response.text, {
						status: 400,
					});
				} catch (error) {
					console.log(error);
					return new Response('internal server error', {
						status: 500,
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
				}
			);
		} catch (error) {
			console.log(error);
		}
	}
	return new Response(null, { status: 400 });
};

const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
