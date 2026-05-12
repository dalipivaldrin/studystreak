import { getSessions, serialize } from '$lib/server/db.js';

export const load = async () => {
	try {
		const col = await getSessions();
		const docs = await col.find({}).sort({ date: -1, createdAt: -1 }).limit(5).toArray();
		return { recentSessions: serialize(docs) };
	} catch (err) {
		return { recentSessions: [], dbError: err.message };
	}
};
