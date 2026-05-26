<script>
	/**
	 * SessionCard – zeigt eine Lernsession als klickbare Karte an.
	 * Unterstuetzt sowohl statische Module (via moduleLabel/moduleColor Props)
	 * als auch dynamische Module (via modules-Array oder session.moduleName).
	 */
	export let session;
	// Optionale Module-Liste fuer Namensaufloesung
	export let modules = [];

	$: modName = resolveModuleName(session, modules);
	$: modColor = resolveModuleColor(session, modules);

	function resolveModuleName(s, mods) {
		// 1. Session hat direkt moduleName gespeichert
		if (s.moduleName) return s.moduleName;
		// 2. In uebergebener modules-Liste suchen
		if (mods && mods.length > 0) {
			const found = mods.find(m => (m._id || m.id) === s.module);
			if (found) return found.fach || found.name || s.module;
		}
		// 3. Kurz-Anzeige: erstes Segment der ID oder Rohdaten
		return s.module || '–';
	}

	function resolveModuleColor(s, mods) {
		if (s.moduleColor) return s.moduleColor;
		if (mods && mods.length > 0) {
			const found = mods.find(m => (m._id || m.id) === s.module);
			if (found && found.color) return found.color;
		}
		return '#6B7280';
	}

	$: date = new Date(session.date);
	$: dateLabel = formatDate(date);

	function formatDate(d) {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const yest = new Date(today);
		yest.setDate(today.getDate() - 1);
		const sameDay = (a, b) => a.toDateString() === b.toDateString();
		if (sameDay(d, today)) return 'Heute';
		if (sameDay(d, yest)) return 'Gestern';
		return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
	}
</script>

<a class="session-card" href={`/sessions/${session._id}`}>
	<div class="module-stripe" style="background: {modColor}"></div>
	<div class="session-content">
		<div class="session-title">{modName}</div>
		<div class="session-meta">
			{session.duration} min
			{#if session.topic}· {session.topic}{/if}
			{#if session.focus}· Fokus {session.focus}/5{/if}
		</div>
	</div>
	<div class="session-date">{dateLabel}</div>
</a>
