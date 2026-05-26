import { getSessions, serialize } from '$lib/server/db.js';
import { calculateStats } from '$lib/utils/gamification.js';
import { validateSession } from '$lib/server/auth.js';

export const load = async ({ cookies }) => {
  const token = cookies.get('session');
  const sessionData = await validateSession(token).catch(() => null);
  const user = sessionData ? { name: sessionData.userName } : null;

  try {
    const col = await getSessions();
    const query = sessionData ? { userId: sessionData.userId } : {};
    const docs = await col.find(query).sort({ date: -1 }).toArray();
    const sessions = serialize(docs);
    const stats = calculateStats(sessions);
    return { stats, dbReady: true, user };
  } catch (err) {
    console.error('[layout] DB-Fehler:', err.message);
    return {
      stats: { totalSessions: 0, totalMinutes: 0, currentStreak: 0, longestStreak: 0, distinctDays: 0, distinctModules: 0, weekMinutes: [], level: { level: 1 } },
      dbReady: false,
      dbError: err.message,
      user
    };
  }
};
