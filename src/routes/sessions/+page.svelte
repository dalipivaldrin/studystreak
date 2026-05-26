<script>
  import SessionCard from '$lib/components/SessionCard.svelte';
  export let data;

$: sessions = data.sessions || [];
  $: totalCount = data.totalCount || 0;
  $: page = data.page || 1;
  $: totalPages = data.totalPages || 1;
  $: userModules = data.userModules || [];

  // Group sessions by month
function groupByMonth(sessions) {
  const groups = {};
  for (const s of sessions) {
    const d = new Date(s.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
    if (!groups[key]) groups[key] = { label, sessions: [] };
    groups[key].sessions.push(s);
  }
    return Object.values(groups);
}

  $: grouped = groupByMonth(sessions);
  </script>

  <svelte:head>
    <title>Alle Sessions – StudyStreak</title>
  </svelte:head>

  <div class="page-content">
      <div class="page-header-row">
            <a href="/" class="btn btn-ghost" style="padding-left:0">← Zurück</a>
                  <h1>Lernsessions</h1>
                  <a href="/sessions/new" class="btn btn-primary btn-sm">+ Neu</a>
                      </div>

                    {#if totalCount > 0}
                      <p class="text-muted text-small mb-3">{totalCount} Sessions insgesamt</p>
                        {/if}

                        {#if sessions.length === 0}
                              <div class="card text-center text-muted" style="padding: 2rem">
                                      <div style="font-size:2rem;margin-bottom:0.5rem">📚</div>
                                      <p>Noch keine Sessions erfasst.</p>
                                      <a href="/sessions/new" class="btn btn-primary mt-2">Erste Session erfassen</a>
                                            </div>
                                        {:else}
                                        {#each grouped as group}
                                                <div class="session-month-group">
                                                  <div class="month-label">{group.label}</div>
                                                            <div class="session-list">
                                                              {#each group.sessions as s (s._id)}
                                                              <SessionCard session={s} modules={userModules} />
                                                              {/each}
                                                                      </div>
                                                                    </div>
                                                              {/each}

                                                              {#if totalPages > 1}
                                                                      <div class="pagination-row">
                                                                        {#if page > 1}
                                                                          <a href="?page={page - 1}" class="btn btn-ghost btn-sm">← Vorherige</a>
                                                                            {:else}
                                                                                        <span></span>
                                                                            {/if}
                                                                              <span class="text-muted text-small">Seite {page} / {totalPages}</span>
                                                                                {#if page < totalPages}
                                                                                  <a href="?page={page + 1}" class="btn btn-ghost btn-sm">Nächste →</a>
                                                                                    {:else}
                                                                                                <span></span>
                                                                                    {/if}
                                                                                            </div>
                                                                                    {/if}
                                                                                    {/if}
                                                                                      </div>

                                                                                      <style>
                                                                                      .page-header-row {
                                                                                            display: flex;
                                                                                            align-items: center;
                                                                                            justify-content: space-between;
                                                                                            margin-bottom: 0.5rem;
                                                                                      }
                                                                                      .page-header-row h1 {
                                                                                            margin: 0;
                                                                                            font-size: 1.25rem;
                                                                                      }
                                                                                      .session-month-group {
                                                                                            margin-bottom: 1.5rem;
                                                                                      }
                                                                                      .month-label {
                                                                                            font-size: 0.8rem;
                                                                                            font-weight: 700;
                                                                                            text-transform: uppercase;
                                                                                            letter-spacing: 0.08em;
                                                                                        color: var(--c-text-muted);
                                                                                            margin-bottom: 0.5rem;
                                                                                            padding-bottom: 0.25rem;
                                                                                        border-bottom: 1px solid var(--c-border);
                                                                                      }
                                                                                      .pagination-row {
                                                                                            display: flex;
                                                                                            align-items: center;
                                                                                            justify-content: space-between;
                                                                                            margin-top: 1.5rem;
                                                                                            padding-top: 1rem;
                                                                                        border-top: 1px solid var(--c-border);
                                                                                      }
                                                                                      .btn-sm {
                                                                                            font-size: 0.85rem;
                                                                                            padding: 0.35rem 0.75rem;
                                                                                      }
                                                                                      </style>
