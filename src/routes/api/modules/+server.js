import { json } from '@sveltejs/kit';
import { getModules, toObjectId, serialize } from '$lib/server/db.js';
import { validateSession } from '$lib/server/auth.js';

/** GET: Alle Module des eingeloggten Users laden */
export async function GET({ cookies }) {
  const token = cookies.get('session');
  const session = await validateSession(token).catch(() => null);
  if (!session) return json({ error: 'Nicht eingeloggt' }, { status: 401 });

  const col = await getModules();
  const mods = await col.find({ userId: session.userId }).sort({ createdAt: 1 }).toArray();
  return json(serialize(mods));
}

/** POST: Neues Modul hinzufuegen */
export async function POST({ request, cookies }) {
  const token = cookies.get('session');
  const session = await validateSession(token).catch(() => null);
  if (!session) return json({ error: 'Nicht eingeloggt' }, { status: 401 });

  const { fach, studiengang, color } = await request.json();
  if (!fach || !fach.trim()) return json({ error: 'Fach fehlt' }, { status: 400 });

  const col = await getModules();

  // Duplikat-Check
  const existing = await col.findOne({
    userId: session.userId,
    fach: fach.trim(),
    studiengang: studiengang || 'Eigenes Fach'
  });
  if (existing) return json(serialize(existing));

  const doc = {
    userId: session.userId,
    fach: fach.trim(),
    studiengang: studiengang || 'Eigenes Fach',
    color: color || '#6B7280',
    createdAt: new Date()
  };
  const result = await col.insertOne(doc);
  return json({ ...doc, _id: result.insertedId.toString(), createdAt: doc.createdAt.toISOString() });
}

/** DELETE: Modul entfernen */
export async function DELETE({ request, cookies }) {
  const token = cookies.get('session');
  const session = await validateSession(token).catch(() => null);
  if (!session) return json({ error: 'Nicht eingeloggt' }, { status: 401 });

  const { id } = await request.json();
  const col = await getModules();
  await col.deleteOne({ _id: toObjectId(id), userId: session.userId });
  return json({ ok: true });
}
