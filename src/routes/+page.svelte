<script>
  import SessionCard from '$lib/components/SessionCard.svelte';
  import StatBadge from '$lib/components/StatBadge.svelte';
  import { formatMinutes } from '$lib/utils/gamification.js';
  export let data;
  $: stats = data.stats;
  $: recentSessions = data.recentSessions || [];
  $: upcomingExams = data.upcomingExams || [];
  $: weeklyGoalDays = 5;
  $: weeklyGoalReached = Math.min(weeklyGoalDays, stats.distinctDays || 0);
  $: weeklyGoalPct = Math.min(100, (weeklyGoalReached / weeklyGoalDays) * 100);
  $: hasLearnedToday = checkLearnedToday(recentSessions);

  function checkLearnedToday(sessions) {
    if (!sessions || sessions.length === 0) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return sessions.some((s) => {
      const d = new Date(s.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });
  }

  function daysUntil(dateStr) {
    const d = new Date(dateStr);
    d.setHours(0,0,0,0);
    const now = new Date();
    now.setHours(0,0,0,0);
    return Math.round((d - now) / (1000 * 60 * 60 * 24));
  }

  function examUrgencyColor(days) {
    if (days <= 3) return 'var(--c-danger)';
    if (days <= 7) return 'var(--c-streak)';
    return 'var(--c-success)';
  }
</script>

<svelte:head>
  <title>Home – StudyStreak</title>
</svelte:head>

<div class="page-content">
  {#if !data.dbReady}
    <div class="alert alert-error">
      <strong>Datenbank nicht erreichbar.</strong>
      <p class="text-small mt-1" style="margin-bottom: 0">
        Bitte <code>MONGODB_URI</code> in der <code>.env</code>-Datei prüfen.
      </p>
    </div>
  {/if}

  {#if !hasLearnedToday}
    <div class="hero-cta">
      <div class="hero-title">Heute noch nichts gelernt –</div>
      <div class="hero-action">starte jetzt deine Session! 💪</div>
    </div>
  {:else}
    <div class="hero-cta">
      <div class="hero-title">Du warst heute fleissig!</div>
      <div class="hero-action">Weiter so – noch eine Session? ✨</div>
    </div>
  {/if}

  <div class="kpi-row">
    <StatBadge icon="🔥" value="{stats.currentStreak} {stats.currentStreak === 1 ? 'Tag' : 'Tage'}" label="Streak" />
    <StatBadge icon="📚" value={stats.totalSessions} label="Sessions gesamt" />
    <StatBadge icon="⭐" value={`Level ${stats.level.level}`} label="Lernender" />
  </div>

  <div class="progress-card">
    <div class="progress-header">
      <strong>Wochenziel: 5 Lerntage</strong>
      <span class="text-muted text-small">{weeklyGoalReached} / {weeklyGoalDays}</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" class:success={weeklyGoalReached >= weeklyGoalDays} style="width: {weeklyGoalPct}%"></div>
    </div>
    <p class="text-small text-muted mt-1" style="margin-bottom: 0">
      Diese Woche {formatMinutes(stats.weekMinutes)} gelernt.
    </p>
  </div>

  {#if upcomingExams.length > 0}
    <div class="section-header-row">
      <h2 style="font-size: 1.1rem; margin: 0">Nächste Prüfungen</h2>
      <a href="/exams" class="text-small" style="color: var(--c-primary)">Alle anzeigen →</a>
    </div>
    <div class="exam-preview-list">
      {#each upcomingExams.slice(0, 3) as exam}
        {@const days = daysUntil(exam.examDate)}
        <a href="/exams" class="exam-preview-item">
          <div class="exam-preview-dot" style="background: {examUrgencyColor(days)}"></div>
          <div class="exam-preview-info">
            <span class="exam-preview-subject">{exam.subject}</span>
            <span class="exam-preview-days">
              {#if days === 0}Heute!{:else if days === 1}Morgen{:else}in {days} Tagen{/if}
            </span>
          </div>
        </a>
      {/each}
    </div>
  {/if}

  <div class="section-header-row">
    <h2 style="font-size: 1.1rem; margin: 0">Letzte Sessions</h2>
    <a href="/sessions" class="text-small" style="color: var(--c-primary)">Alle anzeigen →</a>
  </div>

  {#if recentSessions.length === 0}
    <div class="card text-center text-muted">
      Noch keine Sessions erfasst. Tippe unten auf <strong>„+ Lernsession erfassen"</strong>.
    </div>
  {:else}
    <div class="session-list">
      {#each recentSessions as s (s._id)}
        <SessionCard session={s} />
      {/each}
    </div>
  {/if}

  <a href="/sessions/new" class="btn btn-primary btn-block btn-lg cta-bottom">
    <span aria-hidden="true">+</span> Lernsession erfassen
  </a>
</div>

<style>
  .section-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1.25rem 0 0.6rem;
  }
  .exam-preview-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }
  .exam-preview-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--c-surface);
    border-radius: var(--radius-sm);
    padding: 0.6rem 0.75rem;
    text-decoration: none;
    border: 1px solid var(--c-border);
    transition: background 0.15s;
  }
  .exam-preview-item:hover { background: var(--c-primary-light); }
  .exam-preview-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .exam-preview-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    gap: 0.5rem;
  }
  .exam-preview-subject { font-weight: 600; font-size: 0.9rem; color: var(--c-text); }
  .exam-preview-days { font-size: 0.82rem; color: var(--c-text-muted); }
</style>
