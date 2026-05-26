import { getSessions, getModules, getDb, serialize } from '$lib/server/db.js';
import { validateSession } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
  	const token = cookies.get('session');
  	const session = await validateSession(token).catch(() => null);
  	if (!session) throw redirect(302, '/login');

  	try {
      		const col = await getSessions();
      		const docs = await col
      			.find({ userId: session.userId })
      			.sort({ date: -1, createdAt: -1 })
      			.limit(5)
      			.toArray();

  		// Lade User-Module fuer Namensaufloesung in SessionCard
  		let userModules = [];
      		try {
            			const modCol = await getModules();
            			const mods = await modCol.find({ userId: session.userId }).toArray();
            			userModules = serialize(mods);
          } catch (e) {
            			userModules = [];
          }

  		// Naechste Pruefungen
  		const now = new Date();
      		now.setHours(0, 0, 0, 0);
      		let upcomingExams = [];
      		try {
            			const db = await getDb();
            			const examCol = db.collection('exams');
            			const exams = await examCol
            				.find({ userId: session.userId, examDate: { $gte: now } })
            				.sort({ examDate: 1 })
            				.limit(3)
            				.toArray();
            			upcomingExams = serialize(exams);
          } catch (e) {
            			upcomingExams = [];
          }

  		return {
        			recentSessions: serialize(docs),
        			upcomingExams,
        			userModules
      };
    } catch (err) {
      		return { recentSessions: [], upcomingExams: [], userModules: [], dbError: err.message };
    }
};
