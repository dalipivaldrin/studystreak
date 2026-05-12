<script>
	import { getModule } from '$lib/constants.js';
	export let session;

	$: mod = getModule(session.module);
	$: date = new Date(session.date);
	$: dateLabel = formatDate(date);

	function formatDate(d) {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const yest = new Date(today); yest.setDate(today.getDate() - 1);
		const sameDay = (a, b) => a.toDateString() === b.toDateString();
		if (sameDay(d, today)) return 'Heute';
		if (sameDay(d, yest)) return 'Gestern';
		return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
	}
</script>

<a class="session-card" href={`/sessions/${session._id}`}>
	<div class="module-stripe" style="background: {mod.color}"></div>
	<div class="session-content">
		<div class="session-title">{mod.name}</div>
		<div class="session-meta">
			{session.duration} min
			{#if session.topic}· {session.topic}{/if}
			{#if session.focus}· Fokus {session.focus}/5{/if}
		</div>
	</div>
	<div class="session-date">{dateLabel}</div>
</a>
