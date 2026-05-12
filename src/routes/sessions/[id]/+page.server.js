import { error, fail, redirect } from '@sveltejs/kit';
import { getSessions, toObjectId, serialize } from '$lib/server/db.js';
import { validateSession } from '$lib/utils/validation.js';

export const load = async ({ params }) => {
	const oid = toObjectId(params.id);
	if (!oid) throw error(404, 'Session nicht gefunden');

	try {
		const col = await getSessions();
		const doc = await col.findOne({ _id: oid });
		if (!doc) throw error(404, 'Session nicht gefunden');
		return { session: serialize(doc) };
	} catch (err) {
		if (err?.status) throw err;
		throw error(500, 'Datenbank-Fehler: ' + err.message);
	}
};

export const actions = {
	update: async ({ request, params }) => {
		const oid = toObjectId(params.id);
		if (!oid) return fail(404, { errors: { _form: 'Session nicht gefunden' } });

		const formData = await request.formData();
		const { valid, errors, data } = validateSession(formData);

		if (!valid) {
			return fail(400, { errors, values: Object.fromEntries(formData) });
		}

		try {
			const col = await getSessions();
			await col.updateOne(
				{ _id: oid },
				{ $set: { ...data, updatedAt: new Date() } }
			);
			throw redirect(303, `/sessions/${params.id}?updated=1`);
		} catch (err) {
			if (err?.status === 303) throw err;
			return fail(500, { errors: { _form: 'Speichern fehlgeschlagen: ' + err.message } });
		}
	},
	delete: async ({ params }) => {
		const oid = toObjectId(params.id);
		if (!oid) return fail(404, { errors: { _form: 'Session nicht gefunden' } });
		try {
			const col = await getSessions();
			await col.deleteOne({ _id: oid });
			throw redirect(303, '/?deleted=1');
		} catch (err) {
			if (err?.status === 303) throw err;
			return fail(500, { errors: { _form: 'Löschen fehlgeschlagen: ' + err.message } });
		}
	}
};
