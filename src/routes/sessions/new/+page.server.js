import { fail, redirect } from '@sveltejs/kit';
import { getSessions } from '$lib/server/db.js';
import { validateSession } from '$lib/utils/validation.js';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const { valid, errors, data } = validateSession(formData);

		if (!valid) {
			const values = Object.fromEntries(formData);
			return fail(400, { errors, values });
		}

		try {
			const col = await getSessions();
			const now = new Date();
			const result = await col.insertOne({
				...data,
				createdAt: now,
				updatedAt: now
			});
			throw redirect(303, `/sessions/${result.insertedId.toString()}?created=1`);
		} catch (err) {
			if (err?.status === 303) throw err;
			console.error('[sessions/new] DB-Fehler:', err.message);
			return fail(500, {
				errors: { _form: 'Speichern fehlgeschlagen: ' + err.message },
				values: Object.fromEntries(formData)
			});
		}
	}
};
