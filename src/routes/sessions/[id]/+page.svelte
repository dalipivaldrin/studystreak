<script>
	import { MODULES, DURATION_PRESETS, FOCUS_LABELS, getModule } from '$lib/constants.js';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let data;
	export let form;

	$: session = data.session;
	$: mod = getModule(session.module);

	let editing = false;

	// Form state (init aus session)
	$: selectedModule = form?.values?.module ?? session.module;
	$: selectedDuration = String(form?.values?.duration ?? session.duration);
	$: topic = form?.values?.topic ?? (session.topic || '');
	$: focus = Number(form?.values?.focus || session.focus || 0);
	$: notes = form?.values?.notes ?? (session.notes || '');
	$: dateValue = (form?.values?.date) ?? toISO(session.date);
	$: errors = form?.errors || {};
	$: createdLabel = formatDateTime(session.createdAt);

	function toISO(d) {
		return new Date(d).toISOString().slice(0, 10);
	}

	function formatDateTime(d) {
		return new Date(d).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' });
	}

	function pickDuration(val) {
		selectedDuration = String(val);
	}

	function confirmDelete(e) {
		if (!confirm('Diese Session wirklich löschen?')) e.preventDefault();
	}
</script>

<svelte:head>
	<title>Session – StudyStreak</title>
</svelte:head>

<header class="page-header">
	<a href="/" class="back-link">← Zurück</a>
	<h1>Session-Details</h1>
	<button class="btn btn-ghost" on:click={() => (editing = !editing)}>
		{editing ? 'Ansicht' : '✏️ Bearbeiten'}
	</button>
</header>

<div class="page-content">
	{#if $page.url.searchParams.get('created') === '1'}
		<div class="alert alert-success">
			<strong>🎉 Gespeichert!</strong> Deine Session ist erfasst.
<div class="alert-cta"><a href="/" class="btn btn-primary">→ Zum Dashboard</a></div>
		</div>
	{/if}
	{#if $page.url.searchParams.get('updated') === '1'}
		<div class="alert alert-success">Session aktualisiert.</div>
	{/if}

	{#if !editing}
		<div class="card">
			<div class="flex-between mb-2">
				<span class="chip" style:background={mod.color} style:color="white" style:border-color={mod.color}>{mod.name}</span>
				<strong>{session.duration} min</strong>
			</div>
			<div class="text-muted text-small">{new Date(session.date).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</div>
			{#if session.topic}
				<h3 class="mt-3" style="margin-bottom: 4px">{session.topic}</h3>
			{/if}
			{#if session.focus}
				<div class="mt-2 text-small">
					Fokus: <strong>{session.focus}/5</strong> – {FOCUS_LABELS[session.focus]}
				</div>
			{/if}
			{#if session.notes}
				<div class="mt-3">
					<div class="text-small text-muted">Notizen</div>
					<div style="white-space: pre-wrap">{session.notes}</div>
				</div>
			{/if}
			<div class="text-subtle text-small mt-4">Erfasst: {createdLabel}</div>
		</div>

		<form method="POST" action="?/delete" use:enhance class="mt-4" on:submit={confirmDelete}>
			<button class="btn btn-danger btn-block" type="submit">🗑️ Session löschen</button>
		</form>
		<a href="/sessions/new" class="btn btn-secondary btn-block mt-3">+ Neue Session</a>
	{:else}
		<form method="POST" action="?/update" use:enhance>
			{#if errors._form}<div class="alert alert-error">{errors._form}</div>{/if}

			<div class="form-group">
				<label class="form-label">Modul</label>
				<div class="chip-row">
					{#each MODULES as m}
						<button
							type="button"
							class="chip chip-mod"
							class:is-active={selectedModule === m.id}
							style:background={selectedModule === m.id ? m.color : ''}
							style:border-color={selectedModule === m.id ? m.color : ''}
							style:color={selectedModule === m.id ? 'white' : ''}
							on:click={() => (selectedModule = m.id)}
						>{m.name}</button>
					{/each}
				</div>
				<input type="hidden" name="module" value={selectedModule} />
				{#if errors.module}<span class="form-error">{errors.module}</span>{/if}
			</div>

			<div class="form-group">
				<label class="form-label">Dauer</label>
				<div class="chip-row">
					{#each DURATION_PRESETS as d}
						<button type="button" class="chip" class:is-active={selectedDuration === String(d)} on:click={() => pickDuration(d)}>{d} min</button>
					{/each}
				</div>
				<div class="mt-2">
					<input type="number" class="form-input" style="max-width: 160px" min="5" max="600" bind:value={selectedDuration} />
				</div>
				<input type="hidden" name="duration" value={selectedDuration} />
				{#if errors.duration}<span class="form-error">{errors.duration}</span>{/if}
			</div>

			<div class="form-group">
				<label class="form-label" for="date">Datum</label>
				<input id="date" name="date" type="date" class="form-input" bind:value={dateValue} />
				{#if errors.date}<span class="form-error">{errors.date}</span>{/if}
			</div>

			<div class="form-group">
				<label class="form-label" for="topic">Thema</label>
				<input id="topic" name="topic" class="form-input" bind:value={topic} maxlength="120" />
			</div>

			<div class="form-group">
				<label class="form-label">Fokus</label>
				<div class="star-row">
					{#each [1,2,3,4,5] as v}
						<button type="button" class="star-btn" class:is-active={focus >= v} on:click={() => (focus = focus === v ? 0 : v)} aria-label={`${v} Sterne`}>★</button>
					{/each}
				</div>
				<input type="hidden" name="focus" value={focus || ''} />
			</div>

			<div class="form-group">
				<label class="form-label" for="notes">Notizen</label>
				<textarea id="notes" name="notes" class="form-textarea" bind:value={notes} maxlength="500"></textarea>
				<span class="form-hint">{notes.length}/500</span>
			</div>

			<div class="flex gap-2">
				<button type="button" class="btn btn-secondary" on:click={() => (editing = false)}>Abbrechen</button>
				<button type="submit" class="btn btn-success" style="flex: 1">💾 Änderungen speichern</button>
			</div>
		</form>
	{/if}
</div>
