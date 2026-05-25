import { redirect } from '@sveltejs/kit';
import { getModules, serialize } from '$lib/server/db.js';
import { validateSession } from '$lib/server/auth.js';

export async function load({ cookies }) {
  const token = cookies.get('session');
  const session = await validateSession(token).catch(() => null);
  if (!session) throw redirect(302, '/login');

  const col = await getModules();
  const userModules = await col
    .find({ userId: session.userId })
    .sort({ createdAt: 1 })
    .toArray();

  return { userModules: serialize(userModules) };
}
