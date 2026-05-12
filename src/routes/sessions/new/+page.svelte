<script>
	import { MODULES, DURATION_PRESETS, FOCUS_LABELS } from '$lib/constants.js';
	import { enhance } from '$app/forms';

	export let form;

	let selectedModule = form?.values?.module || '';
	let selectedDuration = form?.values?.duration ? String(form.values.duration) : '';
	let topic = form?.values?.topic || '';
	let focus = form?.values?.focus ? Number(form.values.focus) : 0;
	let notes = form?.values?.notes || '';
	let customDuration = '';
	let date = form?.values?.date || todayISO();
	let submitting = false;

	function todayISO() {
		const d = new Date();
		const yyyy = d.getFullYear();
		const mm = String(d.getMonth() + 1).padStart(2, '0');
		const dd = String(d.getDate()).padStart(2, '0');
		return `${yyyy}-${mm}-${dd}`;
	}

	function pickDuration(val) {
		selectedDuration = String(val);
		customDuration = '';
	}

	$: errors = form?.errors || {};
	$: durationValue = customDuration || selectedDuration;
</script>

<svelte:head>
	<title>Neue Session – StudyStreak</title>
</svelte:head>

<div class="page-content">
	<a href="/" class="btn btn-ghost mb-3" style="padding-left: 0">← Zurück</a>

	<h1>Lernsession erfassen</h1>
	<p class="text-muted">Was hast du gelernt? In 3 Taps eingetragen.</p>

	{#if errors._form}
		<div class="alert alert-error">{errors._form}</div>
	{/if}

	<form method="POST" use:enhance={() => {
		submitting = true;
		return async ({ update }) => { await update(); submitting = false; };
	}}>
		<!-- Modul -->
		<div class="form-group">
			<label class="form-label">Modul</label>
			<div class="chip-row" role="radiogroup" aria-label="Modul auswählen">
				{#each MODULES as m}
					<button
						type="button"
						class="chip chip-mod"
						class:is-active={selectedModule === m.id}
						style:background={selectedModule === m.id ? m.color : ''}
						style:border-color={selectedModule === m.id ? m.color : ''}
						style:color={selectedModule === m.id ? 'white' : ''}
						on:click={() => (selectedModule = m.id)}
						aria-pressed={selectedModule === m.id}
					>
						{m.name}
					</button>
				{/each}
			</div>
			<input type="hidden" name="module" value={selectedModule} />
			{#if errors.module}<span class="form-error">{errors.module}</span>{/if}
		</div>

		<!-- Dauer -->
		<div class="form-group">
			<label class="form-label">Dauer</label>
			<div class="chip-row" role="radiogroup" aria-label="Dauer wählen">
				{#each DURATION_PRESETS as d}
					<button
						type="button"
						class="chip"
						class:is-active={!customDuration && selectedDuration === String(d)}
						on:click={() => pickDuration(d)}
					>{d} min</button>
				{/each}
			</div>
			<div class="mt-2 flex gap-2" style="align-items: center">
				<span class="text-small text-muted">oder eigene Zeit:</span>
				<input
					type="number"
					class="form-input"
					style="max-width: 140px"
					placeholder="z.B. 25"
					min="5" max="600"
					bind:value={customDuration}
					on:input={() => (selectedDuration = '')}
				/>
				<span class="text-small text-muted">min</span>
			</div>
			<input type="hidden" name="duration" value={durationValue} />
			{#if errors.duration}<span class="form-error">{errors.duration}</span>{/if}
		</div>

		<!-- Datum -->
		<div class="form-group">
			<label class="form-label" for="date">Datum</label>
			<input id="date" name="date" type="date" class="form-input" bind:value={date} max={todayISO()} />
			{#if errors.date}<span class="form-error">{errors.date}</span>{/if}
			<span class="form-hint">Standard: heute. Kann angepasst werden, falls du eine vergangene Session nachträgst.</span>
		</div>

		<!-- Thema -->
		<div class="form-group">
			<label class="form-label" for="topic">Thema <span class="text-muted text-small">(optional)</span></label>
			<input id="topic" name="topic" class="form-input" placeholder="z.B. Normalverteilung" bind:value={topic} maxlength="120" />
			{#if errors.topic}<span class="form-error">{errors.topic}</span>{/if}
		</div>

		<!-- Fokus -->
		<div class="form-group">
			<label class="form-label">Fokus <span class="text-muted text-small">(optional)</span></label>
			<div class="star-row" role="radiogroup" aria-label="Fokus-Bewertung">
				{#each [1,2,3,4,5] as v}
					<button
						type="button"
						class="star-btn"
						class:is-active={focus >= v}
						on:click={() => (focus = focus === v ? 0 : v)}
						aria-label={`${v} von 5 – ${FOCUS_LABELS[v]}`}
					>★</button>
				{/each}
			</div>
			{#if focus > 0}
				<span class="form-hint">{focus}/5 – {FOCUS_LABELS[focus]}</span>
			{/if}
			<input type="hidden" name="focus" value={focus || ''} />
			{#if errors.focus}<span class="form-error">{errors.focus}</span>{/if}
		</div>

		<!-- Notizen -->
		<div class="form-group">
			<label class="form-label" for="notes">Notizen <span class="text-muted text-small">(optional)</span></label>
			<textarea id="notes" name="notes" class="form-textarea" placeholder="z.B. Übungsaufgaben 4–8 gelöst" bind:value={notes} maxlength="500"></textarea>
			<span class="form-hint">{notes.length}/500 Zeichen</span>
			{#if errors.notes}<span class="form-error">{errors.notes}</span>{/if}
		</div>

		<button type="submit" class="btn btn-success btn-block btn-lg" disabled={submitting}>
			{submitting ? 'Speichere …' : '💾 Session speichern'}
		</button>
	</form>
</div>
