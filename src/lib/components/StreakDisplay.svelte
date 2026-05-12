<script>
	export let days = 0;
</script>

<span class="streak-pill" title="Aktueller Streak: Tage in Folge mit mindestens einer Session">
	<span aria-hidden="true">🔥</span>
	<span>{days} {days === 1 ? 'Tag' : 'Tage'}</span>
</span>
