import { getSessions, serialize } from '$lib/server/db.js';
import { calculateStats } from '$lib/utils/gamification.js';
import { validateSession } from '$lib/server/auth.js';

export const load = async ({ cookies }) => {
  // Session / Auth prüfen
  const token = cookies.get('session');
  const sessionData = await validateSession(token).catch(() => null);
  const user = sessionData ? { name: sessionData.userName } : null;

  try {
    const col = await getSessions();
    const docs = await col.find({}).sort({ date: -1 }).toArray();
    const sessions = serialize(docs);
    const stats = calculateStats(sessions);
    return { stats, dbReady: true, user };
  } catch (err) {
    console.error('[layout] DB-Fehler:', err.message);
    // Graceful fallback wenn DB nicht erreichbar (z.B. fehlende ENV)
    return {
      stats: { totalSessions: 0, totalMinutes: 0, currentStreak: 0, longestStreak: 0, distinctDays: 0, distinctModules: 0, weekMinutes: [] },
      dbReady: false,
      dbError: err.message,
      user
    };
  }
};
