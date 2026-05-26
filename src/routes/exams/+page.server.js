import { fail, redirect } from '@sveltejs/kit';
import { getDb, serialize, toObjectId } from '$lib/server/db.js';
import { validateSession } from '$lib/server/auth.js';

async function getExams() {
  const db = await getDb();
    return db.collection('exams');
    }

    export async function load({ cookies }) {
      const token = cookies.get('session');
        const session = await validateSession(token).catch(() => null);
          if (!session) throw redirect(302, '/login');

            try {
                const col = await getExams();
                    const now = new Date();
                        now.setHours(0, 0, 0, 0);

                            const all = await col
                                  .find({ userId: session.userId })
                                        .sort({ examDate: 1 })
                                              .toArray();

                                                  const upcoming = all.filter(e => new Date(e.examDate) >= now);
                                                      const past = all.filter(e => new Date(e.examDate) < now);

                                                          return {
                                                                upcoming: serialize(upcoming),
                                                                      past: serialize(past)
                                                                          };
                                                                            } catch (e) {
                                                                                return { upcoming: [], past: [] };
                                                                                  }
                                                                                  }

                                                                                  export const actions = {
                                                                                    create: async ({ request, cookies }) => {
                                                                                        const token = cookies.get('session');
                                                                                            const session = await validateSession(token).catch(() => null);
                                                                                                if (!session) throw redirect(302, '/login');

                                                                                                    const formData = await request.formData();
                                                                                                        const subject = formData.get('subject')?.toString().trim();
                                                                                                            const examDate = formData.get('examDate')?.toString();
                                                                                                                const location = formData.get('location')?.toString().trim() || '';
                                                                                                                    const notes = formData.get('notes')?.toString().trim() || '';
                                                                                                                    
                                                                                                                        const errors = {};
                                                                                                                            if (!subject) errors.subject = 'Fach / Modul ist erforderlich.';
                                                                                                                                if (!examDate) errors.examDate = 'Prüfungsdatum ist erforderlich.';
                                                                                                                                    else {
                                                                                                                                          const d = new Date(examDate);
                                                                                                                                                if (isNaN(d.getTime())) errors.examDate = 'Ungültiges Datum.';
                                                                                                                                                    }
                                                                                                                                                    
                                                                                                                                                        if (Object.keys(errors).length > 0) {
                                                                                                                                                              return fail(400, { errors, values: Object.fromEntries(formData) });
                                                                                                                                                                  }
                                                                                                                                                                  
                                                                                                                                                                      try {
                                                                                                                                                                            const col = await getExams();
                                                                                                                                                                                  const now = new Date();
                                                                                                                                                                                        await col.insertOne({
                                                                                                                                                                                                userId: session.userId,
                                                                                                                                                                                                        subject,
                                                                                                                                                                                                                examDate: new Date(examDate),
                                                                                                                                                                                                                        location,
                                                                                                                                                                                                                                notes,
                                                                                                                                                                                                                                        createdAt: now,
                                                                                                                                                                                                                                                updatedAt: now
                                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                                            throw redirect(303, '/exams');
                                                                                                                                                                                                                                                                } catch (err) {
                                                                                                                                                                                                                                                                      if (err?.status === 303) throw err;
                                                                                                                                                                                                                                                                            return fail(500, {
                                                                                                                                                                                                                                                                                    errors: { _form: 'Speichern fehlgeschlagen: ' + err.message },
                                                                                                                                                                                                                                                                                            values: Object.fromEntries(formData)
                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                          delete: async ({ request, cookies }) => {
                                                                                                                                                                                                                                                                                                              const token = cookies.get('session');
                                                                                                                                                                                                                                                                                                                  const session = await validateSession(token).catch(() => null);
                                                                                                                                                                                                                                                                                                                      if (!session) throw redirect(302, '/login');
                                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                          const formData = await request.formData();
                                                                                                                                                                                                                                                                                                                              const id = formData.get('id')?.toString();
                                                                                                                                                                                                                                                                                                                                  const oid = toObjectId(id);
                                                                                                                                                                                                                                                                                                                                      if (!oid) return fail(400, { errors: { _form: 'Ungültige ID.' } });
                                                                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                                          try {
                                                                                                                                                                                                                                                                                                                                                const col = await getExams();
                                                                                                                                                                                                                                                                                                                                                      await col.deleteOne({ _id: oid, userId: session.userId });
                                                                                                                                                                                                                                                                                                                                                            throw redirect(303, '/exams');
                                                                                                                                                                                                                                                                                                                                                                } catch (err) {
                                                                                                                                                                                                                                                                                                                                                                      if (err?.status === 303) throw err;
                                                                                                                                                                                                                                                                                                                                                                            return fail(500, { errors: { _form: 'Löschen fehlgeschlagen.' } });
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                  };
