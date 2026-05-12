/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const start = Date.now();
	const response = await resolve(event);
	const ms = Date.now() - start;
	if (event.url.pathname !== '/favicon.svg') {
		console.log(`${event.request.method} ${event.url.pathname} → ${response.status} (${ms}ms)`);
	}
	return response;
};
