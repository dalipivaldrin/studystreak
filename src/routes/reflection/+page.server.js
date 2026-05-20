import { fail, redirect } from '@sveltejs/kit';
import { getReflections, serialize } from '$lib/server/db.js';
import { validateReflection } from '$lib/utils/validation.js';

function todayKey() {
		const d = new Date();
		d.setHours(0, 0, 0, 0);
		return d.toISOString().slice(0, 10);
}

export const load = async () => {
		try {
					const col = await getReflections();
					const today = todayKey();
					const todayDoc = await col.findOne({ dateKey: today });
					const recent = await col.find({}).sort({ dateKey: -1 }).limit(5).toArray();
					return {
									today: serialize(todayDoc),
									recent: serialize(recent),
									dbReady: true
					};
		} catch (err) {
					return { today: null, recent: [], dbReady: false, dbError: err.message };
		}
};

export const actions = {
		save: async ({ request }) => {
					const formData = await request.formData();
					const { valid, errors, data } = validateReflection(formData);
					if (!valid) return fail(400, { errors, values: Object.fromEntries(formData) });

			try {
							const col = await getReflections();
							const dateKey = data.date.toISOString().slice(0, 10);
							await col.updateOne(
								{ dateKey },
								{
														$set: {
																					...data,
																					dateKey,
																					updatedAt: new Date()
														},
														$setOnInsert: { createdAt: new Date() }
								},
								{ upsert: true }
											);
							throw redirect(303, '/reflection?saved=1');
			} catch (err) {
							if (err?.status === 303) throw err;
							return fail(500, { errors: { _form: 'Speichern fehlgeschlagen: ' + err.message } });
			}
		},

		delete: async ({ request }) => {
					const formData = await request.formData();
					const id = formData.get('id');
					if (!id) return fail(400, { errors: { _form: 'Keine ID angegeben.' } });

			try {
							const { ObjectId } = await import('mongodb');
							const col = await getReflections();
							await col.deleteOne({ _id: new ObjectId(id) });
							throw redirect(303, '/reflection');
			} catch (err) {
							if (err?.status === 303) throw err;
							return fail(500, { errors: { _form: 'Löschen fehlgeschlagen: ' + err.message } });
			}
		},

		update: async ({ request }) => {
					const formData = await request.formData();
					const id = formData.get('id');
					if (!id) return fail(400, { errors: { _form: 'Keine ID angegeben.' } });

			const { valid, errors, data } = validateReflection(formData);
					if (!valid) return fail(400, { errors, values: Object.fromEntries(formData) });

			try {
							const { ObjectId } = await import('mongodb');
							const col = await getReflections();
							await col.updateOne(
								{ _id: new ObjectId(id) },
								{
														$set: {
																					...data,
																					updatedAt: new Date()
														}
								}
											);
							throw redirect(303, '/reflection?saved=1');
			} catch (err) {
							if (err?.status === 303) throw err;
							return fail(500, { errors: { _form: 'Bearbeiten fehlgeschlagen: ' + err.message } });
			}
		}
};
