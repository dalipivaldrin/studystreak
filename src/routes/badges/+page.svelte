<script>
	import BadgeCard from '$lib/components/BadgeCard.svelte';
	export let data;
</script>

<svelte:head><title>Badges – StudyStreak</title></svelte:head>

<div class="page-content">
	<div class="card mb-4 text-center">
		<div style="font-size: 2rem">🏅</div>
		<h2>{data.achievedCount} / {data.badges.length} Badges</h2>
		<p class="text-muted text-small" style="margin-bottom: 0">
			Erreiche alle Auszeichnungen, indem du regelmässig lernst.
		</p>
	</div>

	<div class="badge-grid">
		{#each data.badges as badge (badge.id)}
			<BadgeCard {badge} />
		{/each}
	</div>
</div>
