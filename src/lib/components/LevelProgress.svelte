<script>
	export let level;
	// level = { level, xpInLevel, xpPerLevel, progressPct, xpToNext }
</script>

<div class="progress-card">
	<div class="progress-header">
		<strong>Level {level.level} – Lernender</strong>
		<span class="text-muted text-small">{level.xpInLevel} / {level.xpPerLevel} XP</span>
	</div>
	<div class="progress-bar">
		<div class="progress-fill" style="width: {level.progressPct}%"></div>
	</div>
	<p class="text-small text-muted mt-1" style="margin-bottom: 0">
		Noch {level.xpToNext} XP bis Level {level.level + 1}.
	</p>
</div>
