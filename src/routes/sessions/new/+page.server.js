import { fail, redirect } from '@sveltejs/kit';
import { getSessions, getModules, serialize } from '$lib/server/db.js';
import { validateSession } from '$lib/server/auth.js';
import { validateSession as validateFormSession } from '$lib/utils/validation.js';

export async function load({ cookies }) {
  const token = cookies.get('session');
  const session = await validateSession(token).catch(() => null);
  if (!session) throw redirect(302, '/login');

  try {
    const col = await getModules();
    const userModules = await col
      .find({ userId: session.userId })
      .sort({ createdAt: 1 })
      .toArray();
    return { userModules: serialize(userModules) };
  } catch(e) {
    return { userModules: [] };
  }
}

export const actions = {
  default: async ({ request, cookies }) => {
    const token = cookies.get('session');
    const session = await validateSession(token).catch(() => null);

    const formData = await request.formData();
    const { valid, errors, data } = validateFormSession(formData);

    if (!valid) {
      const values = Object.fromEntries(formData);
      return fail(400, { errors, values });
    }

    try {
      const col = await getSessions();
      const now = new Date();
      const insertData = { ...data };
      if (session) insertData.userId = session.userId;
      const result = await col.insertOne({
        ...insertData,
        createdAt: now,
        updatedAt: now
      });
      throw redirect(303, `/sessions/${result.insertedId.toString()}?created=1`);
    } catch (err) {
      if (err?.status === 303) throw err;
      console.error('[sessions/new] DB-Fehler:', err.message);
      return fail(500, {
        errors: { _form: 'Speichern fehlgeschlagen: ' + err.message },
        values: Object.fromEntries(formData)
      });
    }
  }
};
