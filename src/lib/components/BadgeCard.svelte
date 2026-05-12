<script>
	export let badge;
</script>

<div class="badge-card" class:locked={!badge.achieved} aria-label={badge.achieved ? 'Erreicht' : 'Noch nicht erreicht'}>
	<div class="badge-icon" aria-hidden="true">{badge.icon}</div>
	<div class="badge-name">{badge.name}</div>
	<div class="badge-desc">{badge.description}</div>
	<div class="mt-2 text-small text-muted">
		{badge.achieved ? '✓ Erreicht' : '🔒 Gesperrt'}
	</div>
</div>
