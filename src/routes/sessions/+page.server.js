import { fail, redirect } from '@sveltejs/kit';
import { getSessions, serialize } from '$lib/server/db.js';
import { validateSession } from '$lib/server/auth.js';

export async function load({ cookies, url }) {
  const token = cookies.get('session');
    const session = await validateSession(token).catch(() => null);
      if (!session) throw redirect(302, '/login');

        const filter = url.searchParams.get('filter') || 'all'; // 'all' | 'past' | 'upcoming'
          const page = parseInt(url.searchParams.get('page') || '1', 10);
            const limit = 20;
              const skip = (page - 1) * limit;

                try {
                    const col = await getSessions();
                        const now = new Date();
                            now.setHours(0, 0, 0, 0);

                                let query = { userId: session.userId };

                                    const totalCount = await col.countDocuments(query);
                                        const docs = await col
                                              .find(query)
                                                    .sort({ date: -1, createdAt: -1 })
                                                          .skip(skip)
                                                                .limit(limit)
                                                                      .toArray();

                                                                          return {
                                                                                sessions: serialize(docs),
                                                                                      totalCount,
                                                                                            page,
                                                                                                  totalPages: Math.ceil(totalCount / limit),
                                                                                                        filter
                                                                                                            };
                                                                                                              } catch (e) {
                                                                                                                  return { sessions: [], totalCount: 0, page: 1, totalPages: 1, filter };
                                                                                                                    }
                                                                                                                    }
