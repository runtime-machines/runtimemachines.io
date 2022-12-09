import { APIRoute } from 'astro';

export const get: APIRoute = () => {
	return {
		body: 'The API server is UP',
	};
};

export const post: APIRoute = async ({ request }) => {
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
			return new Response(
				JSON.stringify({
					message: 'Your email is' + email,
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
