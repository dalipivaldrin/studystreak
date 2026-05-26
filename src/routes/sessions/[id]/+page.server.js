import { error, fail, redirect } from '@sveltejs/kit';
import { getSessions, getModules, toObjectId, serialize } from '$lib/server/db.js';
import { validateSession as validateAuthSession } from '$lib/server/auth.js';
import { validateSession as validateFormSession } from '$lib/utils/validation.js';

export const load = async ({ params, cookies }) => {
		const token = cookies.get('session');
		const authSession = await validateAuthSession(token).catch(() => null);
		if (!authSession) throw redirect(302, '/login');

		const oid = toObjectId(params.id);
		if (!oid) throw error(404, 'Session nicht gefunden');

		try {
					const col = await getSessions();
					const doc = await col.findOne({ _id: oid, userId: authSession.userId });
					if (!doc) throw error(404, 'Session nicht gefunden');

			let userModules = [];
					try {
									const modCol = await getModules();
									const mods = await modCol.find({ userId: authSession.userId }).sort({ createdAt: 1 }).toArray();
									userModules = serialize(mods);
					} catch (e) {
									userModules = [];
					}

			return { session: serialize(doc), userModules };
		} catch (err) {
					if (err?.status) throw err;
					throw error(500, 'Datenbank-Fehler: ' + err.message);
		}
};

export const actions = {
		update: async ({ request, params, cookies }) => {
					const token = cookies.get('session');
					const authSession = await validateAuthSession(token).catch(() => null);
					if (!authSession) throw redirect(302, '/login');

			const oid = toObjectId(params.id);
					if (!oid) return fail(404, { errors: { _form: 'Session nicht gefunden' } });

			const formData = await request.formData();
					const { valid, errors, data } = validateFormSession(formData);

			if (!valid) {
							return fail(400, { errors, values: Object.fromEntries(formData) });
			}

			try {
							const col = await getSessions();
							await col.updateOne(
								{ _id: oid, userId: authSession.userId },
								{ $set: { ...data, updatedAt: new Date() } }
											);
							throw redirect(303, `/sessions/${params.id}?updated=1`);
			} catch (err) {
							if (err?.status === 303) throw err;
							return fail(500, { errors: { _form: 'Speichern fehlgeschlagen: ' + err.message } });
			}
		},
		delete: async ({ params, cookies }) => {
					const token = cookies.get('session');
					const authSession = await validateAuthSession(token).catch(() => null);
					if (!authSession) throw redirect(302, '/login');

			const oid = toObjectId(params.id);
					if (!oid) return fail(404, { errors: { _form: 'Session nicht gefunden' } });
					try {
									const col = await getSessions();
									await col.deleteOne({ _id: oid, userId: authSession.userId });
									throw redirect(303, '/?deleted=1');
					} catch (err) {
									if (err?.status === 303) throw err;
									return fail(500, { errors: { _form: 'Löschen fehlgeschlagen: ' + err.message } });
					}
		}
};
