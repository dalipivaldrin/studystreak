<script>
	import StatBadge from '$lib/components/StatBadge.svelte';
	import BarChart from '$lib/components/BarChart.svelte';
	import SessionCard from '$lib/components/SessionCard.svelte';
	import { calculateStats, dailyMinutes, weeklyMinutes, minutesByModule, formatMinutes } from '$lib/utils/gamification.js';
	import { getModule } from '$lib/constants.js';

	export let data;
	$: sessions = data.sessions || [];

	let range = 'woche'; // 'woche' | 'monat' | 'gesamt'

	$: filteredSessions = filterByRange(sessions, range);
	// Stats für KPI-Karten: Streak & Level basieren IMMER auf allen Sessions
	// (Streak ist tagebasiert, Level basiert auf gesamtem XP).
	$: allStats = calculateStats(sessions);
	$: rangeSessionCount = filteredSessions.length;

	// Chart-Daten:
	// - Woche: 7 Tages-Balken
	// - Monat: 30 Tages-Balken (Labels werden ueber BarChart.labelEvery ausgeduennt)
	// - Gesamt: 12 Wochen-Balken (KW xx)
	$: chartData =
		range === 'woche'
			? dailyMinutes(sessions, 7)
			: range === 'monat'
				? dailyMinutes(sessions, 30)
				: weeklyMinutes(sessions, 12);
	$: chartLabelEvery = range === 'monat' ? 5 : range === 'gesamt' ? 2 : 1;

	// Modul-Aggregation passt sich an den Range an
	$: moduleDays = range === 'woche' ? 7 : range === 'monat' ? 30 : 365;
	$: byModule = minutesByModule(sessions, moduleDays);

	$: totalRangeMinutes = filteredSessions.reduce((s, x) => s + (x.duration || 0), 0);
	$: maxModMin = Math.max(1, ...byModule.map((m) => m.minutes));

	function filterByRange(all, r) {
		const cutoff = new Date();
		cutoff.setHours(0, 0, 0, 0);
		if (r === 'woche') cutoff.setDate(cutoff.getDate() - 6);
		else if (r === 'monat') cutoff.setDate(cutoff.getDate() - 29);
		else return all;
		return all.filter((s) => new Date(s.date) >= cutoff);
	}

	function rangeLabel(r) {
		if (r === 'woche') return 'diese Woche';
		if (r === 'monat') return 'diesen Monat';
		return 'gesamt';
	}
</script>

<svelte:head>
	<title>Statistik – StudyStreak</title>
</svelte:head>

<div class="page-content">
	<div class="tabs" role="tablist">
		<button class:is-active={range === 'woche'} on:click={() => (range = 'woche')} role="tab" aria-selected={range === 'woche'}>Woche</button>
		<button class:is-active={range === 'monat'} on:click={() => (range = 'monat')} role="tab" aria-selected={range === 'monat'}>Monat</button>
		<button class:is-active={range === 'gesamt'} on:click={() => (range = 'gesamt')} role="tab" aria-selected={range === 'gesamt'}>Gesamt</button>
	</div>

	<div class="kpi-row">
		<StatBadge icon="🔥" value={`${allStats.currentStreak} ${allStats.currentStreak === 1 ? 'Tag' : 'Tage'}`} label="Streak" />
		<StatBadge icon="📚" value={rangeSessionCount} label={`Sessions ${rangeLabel(range)}`} />
		<StatBadge icon="⭐" value={`Level ${allStats.level.level}`} label="Lernender" />
	</div>

	<div class="card mb-4">
		<div class="flex-between mb-2">
			<strong>Lernzeit</strong>
			<span class="text-muted text-small">{formatMinutes(totalRangeMinutes)} {rangeLabel(range)}</span>
		</div>
		{#if chartData.length}
			<BarChart data={chartData} labelEvery={chartLabelEvery} />
		{:else}
			<p class="text-muted text-center">Noch keine Daten.</p>
		{/if}
	</div>

	<div class="card mb-4">
		<h3 class="mb-3">Minuten pro Modul</h3>
		{#if byModule.length === 0}
			<p class="text-muted">Noch keine Sessions im Zeitraum.</p>
		{:else}
			{#each byModule as m}
				{@const mod = getModule(m.module)}
				{@const pct = (m.minutes / maxModMin) * 100}
				<div class="mb-3">
					<div class="flex-between text-small mb-1">
						<span class="text-strong" style:color={mod.color}>{mod.name}</span>
						<span class="text-muted">{formatMinutes(m.minutes)}</span>
					</div>
					<div class="progress-bar">
						<div class="progress-fill" style="width: {pct}%; background: {mod.color}"></div>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<h2 class="mb-3" style="font-size: 1.1rem">Letzte Sessions</h2>
	{#if filteredSessions.length === 0}
		<div class="card text-center text-muted">Noch keine Sessions im Zeitraum.</div>
	{:else}
		<div class="session-list">
			{#each filteredSessions.slice(0, 10) as s (s._id)}
				<SessionCard session={s} />
			{/each}
		</div>
	{/if}
</div>
