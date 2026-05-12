<script>
	import '../app.css';
	import { page } from '$app/stores';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import StreakDisplay from '$lib/components/StreakDisplay.svelte';

	export let data;

	// Pfade ohne Header (z.B. Detailansicht hat eigene Header)
	$: showHeader = !$page.url.pathname.startsWith('/sessions/');
</script>

<div class="app-shell">
	{#if showHeader}
		<header class="app-header">
			<div class="brand-row">
				<a class="brand" href="/">
					<span aria-hidden="true">🎯</span>
					StudyStreak
				</a>
				<StreakDisplay days={data.stats.currentStreak} />
			</div>
			{#if $page.url.pathname === '/'}
				<div class="greeting">👋 Hallo, Valdrin!</div>
			{:else if $page.url.pathname === '/stats'}
				<div class="subtitle">Statistik &amp; Auswertung</div>
			{:else if $page.url.pathname === '/badges'}
				<div class="subtitle">Deine Auszeichnungen</div>
			{:else if $page.url.pathname === '/reflection'}
				<div class="subtitle">Tägliche Reflexion</div>
			{/if}
		</header>
	{/if}

	<slot />

	<BottomNav />
</div>
