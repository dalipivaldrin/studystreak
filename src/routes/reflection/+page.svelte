<script>
	import { MOOD_LABELS } from '$lib/constants.js';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let data;
	export let form;

	$: today = data.today;
	$: errors = form?.errors || {};

	let mood = form?.values?.mood ? Number(form.values.mood) : (today?.mood || 0);
	let wentWell = form?.values?.wentWell ?? (today?.wentWell || '');
	let improve = form?.values?.improve ?? (today?.improve || '');

	$: saved = $page.url.searchParams.get('saved') === '1';

	// Bearbeiten-Modus
	let editingId = null;
	let editMood = 0;
	let editWentWell = '';
	let editImprove = '';

	function startEdit(r) {
		editingId = r._id;
		editMood = r.mood || 0;
		editWentWell = r.wentWell || '';
		editImprove = r.improve || '';
	}

	function cancelEdit() {
		editingId = null;
	}
</script>

<svelte:head><title>Reflexion – StudyStreak</title></svelte:head>

<div class="page-content">
	{#if saved}
		<div class="alert alert-success">✓ Reflexion gespeichert.</div>
	{/if}
	{#if !data.dbReady}
		<div class="alert alert-error">Datenbank nicht erreichbar.</div>
	{/if}

	<div class="card mb-4">
		<h2 class="mb-2">Wie war dein heutiger Lerntag?</h2>
		<p class="text-muted text-small">Maximal ein Eintrag pro Tag – nochmaliges Speichern überschreibt den Eintrag.</p>
		<form method="POST" action="?/save" use:enhance>
			{#if errors._form}<div class="alert alert-error">{errors._form}</div>{/if}
			<div class="form-group">
				<label class="form-label">Stimmung</label>
				<div class="star-row">
					{#each [1,2,3,4,5] as v}
						<button type="button" class="star-btn" class:is-active={mood >= v} on:click={() => (mood = mood === v ? 0 : v)} aria-label={`Stimmung ${v}`}>{v}</button>
					{/each}
				</div>
				{#if mood > 0}<span class="form-hint">{MOOD_LABELS[mood]}</span>{/if}
				<input type="hidden" name="mood" value={mood || ''} />
				{#if errors.mood}<span class="form-error">{errors.mood}</span>{/if}
			</div>
			<div class="form-group">
				<label class="form-label" for="wentWell">Was lief gut?</label>
				<textarea id="wentWell" name="wentWell" class="form-textarea" bind:value={wentWell} maxlength="500"></textarea>
				{#if errors.wentWell}<span class="form-error">{errors.wentWell}</span>{/if}
			</div>
			<div class="form-group">
				<label class="form-label" for="improve">Was will ich verbessern?</label>
				<textarea id="improve" name="improve" class="form-textarea" bind:value={improve} maxlength="500"></textarea>
				{#if errors.improve}<span class="form-error">{errors.improve}</span>{/if}
			</div>
			<button class="btn btn-primary btn-block" type="submit">Reflexion speichern</button>
		</form>
	</div>

	{#if data.recent.length > 0}
		<h2 class="mb-3" style="font-size: 1.1rem">Frühere Reflexionen</h2>
		<div class="flex-col gap-3">
			{#each data.recent as r}
				<div class="card reflection-card">
					{#if editingId === r._id}
						<!-- Bearbeiten-Formular -->
						<form method="POST" action="?/update" use:enhance on:submit={cancelEdit}>
							<input type="hidden" name="id" value={r._id} />
							<div class="form-group">
								<label class="form-label">Stimmung</label>
								<div class="star-row">
									{#each [1,2,3,4,5] as v}
										<button type="button" class="star-btn" class:is-active={editMood >= v} on:click={() => (editMood = editMood === v ? 0 : v)} aria-label={`Stimmung ${v}`}>{v}</button>
									{/each}
								</div>
								{#if editMood > 0}<span class="form-hint">{MOOD_LABELS[editMood]}</span>{/if}
								<input type="hidden" name="mood" value={editMood || ''} />
							</div>
							<div class="form-group">
								<label class="form-label" for="edit-wentWell-{r._id}">Was lief gut?</label>
								<textarea id="edit-wentWell-{r._id}" name="wentWell" class="form-textarea" bind:value={editWentWell} maxlength="500"></textarea>
							</div>
							<div class="form-group">
								<label class="form-label" for="edit-improve-{r._id}">Was will ich verbessern?</label>
								<textarea id="edit-improve-{r._id}" name="improve" class="form-textarea" bind:value={editImprove} maxlength="500"></textarea>
							</div>
							<div class="reflection-actions">
								<button class="btn btn-primary btn-sm" type="submit">Speichern</button>
								<button class="btn btn-ghost btn-sm" type="button" on:click={cancelEdit}>Abbrechen</button>
							</div>
						</form>
					{:else}
						<!-- Anzeige-Modus -->
						<div class="flex-between mb-1">
							<strong>{new Date(r.date).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'long' })}</strong>
							<span class="text-small">{MOOD_LABELS[r.mood]}</span>
						</div>
						{#if r.wentWell}<div class="text-small mt-2"><strong>+</strong> {r.wentWell}</div>{/if}
						{#if r.improve}<div class="text-small mt-1"><strong>↗</strong> {r.improve}</div>{/if}
						<div class="reflection-actions mt-2">
							<button class="btn btn-ghost btn-sm" type="button" on:click={() => startEdit(r)}>✏️ Bearbeiten</button>
							<form method="POST" action="?/delete" use:enhance style="display:inline;">
								<input type="hidden" name="id" value={r._id} />
								<button class="btn btn-danger btn-sm" type="submit" onclick="return confirm('Reflexion wirklich löschen?')">🗑️ Löschen</button>
							</form>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.reflection-card {
		position: relative;
	}
	.reflection-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}
	.btn-sm {
		padding: 0.2rem 0.65rem;
		font-size: 0.8rem;
		border-radius: var(--radius-sm, 8px);
		cursor: pointer;
		font-weight: 500;
		transition: all 0.15s;
		border: 1.5px solid transparent;
	}
	.btn-ghost {
		background: transparent;
		border-color: var(--c-border, #E5E7EB);
		color: var(--c-text-muted, #6B7280);
	}
	.btn-ghost:hover {
		background: var(--c-primary-light, #e8edfa);
		border-color: var(--c-primary, #3A5ACC);
		color: var(--c-primary, #3A5ACC);
	}
	.btn-danger {
		background: transparent;
		border-color: var(--c-danger, #DC3545);
		color: var(--c-danger, #DC3545);
	}
	.btn-danger:hover {
		background: var(--c-danger-light, #fbe6e8);
	}
</style>
