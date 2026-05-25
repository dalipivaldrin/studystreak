<script>
  import { DURATION_PRESETS, FOCUS_LABELS } from '$lib/constants.js';
  import { enhance } from '$app/forms';
  export let data;
  export let form;

  // Dynamische Module des Users – Fallback auf leeres Array
  $: MODULES = (data.userModules || []).map(m => ({ id: m._id, name: m.fach, color: m.color }));

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
      <label class="form-label">Modul / Fach</label>
      {#if MODULES.length === 0}
        <p class="text-muted" style="font-size:0.85rem">
          Noch keine Fächer eingerichtet. <a href="/modules">Jetzt Fächer hinzufügen →</a>
        </p>
      {:else}
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
        <a href="/modules" class="form-hint" style="display:inline-block;margin-top:4px">+ Weitere Fächer verwalten</a>
      {/if}
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
      <span class="form-hint">Standard: heute.</span>
    </div>

    <!-- Thema -->
    <div class="form-group">
      <label class="form-label" for="topic">Thema <span class="text-muted text-small">(optional)</span></label>
      <input id="topic" name="topic" class="form-input" placeholder="z.B. Normalverteilung" bind:value={topic} maxlength="120" />
      {#if errors.topic}<span class="form-error">{errors.topic}</span>{/if}
    </div>

    <!-- Fokus -->
    <div class="form-group">
      <label class="form-label">Fokus-Level <span class="text-muted text-small">(optional)</span></label>
      <div class="chip-row">
        {#each Object.entries(FOCUS_LABELS) as [val, label]}
          <button
            type="button"
            class="chip"
            class:is-active={focus === Number(val)}
            on:click={() => focus = Number(val)}
          >{label}</button>
        {/each}
      </div>
      <input type="hidden" name="focus" value={focus} />
    </div>

    <!-- Notizen -->
    <div class="form-group">
      <label class="form-label" for="notes">Notizen <span class="text-muted text-small">(optional)</span></label>
      <textarea id="notes" name="notes" class="form-input" rows="3" placeholder="Was war wichtig? Was ist noch unklar?" bind:value={notes} maxlength="500"></textarea>
    </div>

    <button type="submit" class="btn btn-primary btn-full" disabled={submitting}>
      {submitting ? 'Wird gespeichert...' : 'Session speichern'}
    </button>
  </form>
</div>
