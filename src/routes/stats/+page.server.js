import { getSessions, serialize } from '$lib/server/db.js';

export const load = async () => {
	try {
		const col = await getSessions();
		const docs = await col.find({}).sort({ date: -1 }).toArray();
		return { sessions: serialize(docs) };
	} catch (err) {
		return { sessions: [], dbError: err.message };
	}
};
