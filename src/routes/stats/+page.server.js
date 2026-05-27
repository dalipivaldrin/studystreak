import { redirect } from '@sveltejs/kit';
import { getSessions, getModules, serialize } from '$lib/server/db.js';
import { validateSession } from '$lib/server/auth.js';

export const load = async ({ cookies }) => {
		const token = cookies.get('session');
		const session = await validateSession(token).catch(() => null);
		if (!session) throw redirect(302, '/login');

		try {
				const col = await getSessions();
				const docs = await col
					.find({ userId: session.userId })
					.sort({ date: -1 })
					.toArray();

				let userModules = [];
				try {
					const modCol = await getModules();
					const mods = await modCol.find({ userId: session.userId }).toArray();
					userModules = serialize(mods);
				} catch (e) {
					userModules = [];
				}

				return { sessions: serialize(docs), userModules };
		} catch (err) {
				return { sessions: [], userModules: [], dbError: err.message };
		}
};
