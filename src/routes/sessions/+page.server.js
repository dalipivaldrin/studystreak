import { redirect } from '@sveltejs/kit';
import { getSessions, getModules, serialize } from '$lib/server/db.js';
import { validateSession } from '$lib/server/auth.js';

export async function load({ cookies, url }) {
  	const token = cookies.get('session');
  	const session = await validateSession(token).catch(() => null);
  	if (!session) throw redirect(302, '/login');

	const page = parseInt(url.searchParams.get('page') || '1', 10);
  	const limit = 20;
  	const skip = (page - 1) * limit;

	try {
    		const col = await getSessions();
    		const query = { userId: session.userId };

  		const totalCount = await col.countDocuments(query);
    		const docs = await col
    			.find(query)
    			.sort({ date: -1, createdAt: -1 })
    			.skip(skip)
    			.limit(limit)
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

  		return {
        			sessions: serialize(docs),
        			totalCount,
        			page,
        			totalPages: Math.ceil(totalCount / limit),
        			userModules
      };
  } catch (e) {
    		return { sessions: [], totalCount: 0, page: 1, totalPages: 1, userModules: [] };
  }
}
