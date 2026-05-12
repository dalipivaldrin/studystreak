<script>
	import SessionCard from '$lib/components/SessionCard.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import { formatMinutes } from '$lib/utils/gamification.js';

	export let data;

	$: stats = data.stats;
	$: recentSessions = data.recentSessions || [];
	$: weeklyGoalDays = 5; // Beispielziel: 5 Lerntage pro Woche
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

	<h2 class="mb-3" style="font-size: 1.1rem">Letzte Sessions</h2>
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
