import { getSessions, serialize } from '$lib/server/db.js';
import { calculateStats, evaluateBadges } from '$lib/utils/gamification.js';

export const load = async () => {
	try {
		const col = await getSessions();
		const docs = await col.find({}).toArray();
		const sessions = serialize(docs);
		const stats = calculateStats(sessions);
		const badges = evaluateBadges(stats);
		return { badges, achievedCount: badges.filter((b) => b.achieved).length };
	} catch (err) {
		return { badges: [], achievedCount: 0, dbError: err.message };
	}
};
