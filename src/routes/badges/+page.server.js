import { redirect } from '@sveltejs/kit';
import { getSessions, serialize } from '$lib/server/db.js';
import { validateSession } from '$lib/server/auth.js';
import { calculateStats, evaluateBadges } from '$lib/utils/gamification.js';

export const load = async ({ cookies }) => {
		const token = cookies.get('session');
		const session = await validateSession(token).catch(() => null);
		if (!session) throw redirect(302, '/login');

		try {
					const col = await getSessions();
					const docs = await col.find({ userId: session.userId }).toArray();
					const sessions = serialize(docs);
					const stats = calculateStats(sessions);
					const badges = evaluateBadges(stats);
					return { badges, achievedCount: badges.filter((b) => b.achieved).length };
		} catch (err) {
					return { badges: [], achievedCount: 0, dbError: err.message };
		}
};
