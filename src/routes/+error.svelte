<script>
	import { page } from '$app/stores';
</script>

<svelte:head><title>Fehler – StudyStreak</title></svelte:head>

<div class="page-content">
	<div class="card text-center">
		<h1>😕 {$page.status}</h1>
		<p class="text-muted">{$page.error?.message || 'Etwas ist schiefgelaufen.'}</p>
		<a href="/" class="btn btn-primary mt-3">Zurück zum Dashboard</a>
	</div>
</div>
