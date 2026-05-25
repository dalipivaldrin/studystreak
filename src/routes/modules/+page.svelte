<script>
  import { STUDIENGAENGE_KATALOG } from '$lib/modulkatalog.js';
  export let data;
  let userModules = data.userModules;
  let selectedStudiengang = '';
  let customFach = '';
  let customColor = '#8B5CF6';
  let saving = false;
  let msg = '';
  const studiengaenge = [...new Set(STUDIENGAENGE_KATALOG.map(m => m.studiengang))].sort();
  $: katalogFaecher = selectedStudiengang ? STUDIENGAENGE_KATALOG.filter(m => m.studiengang === selectedStudiengang) : [];
  $: addedKeys = new Set(userModules.map(m => m.fach + '|' + m.studiengang));
  const COLORS = ['#8B5CF6','#10B981','#F59E0B','#EF4444','#3B82F6','#EC4899','#14B8A6','#F97316'];
  let ci = 0;
  function nextColor() { return COLORS[(ci++) % COLORS.length]; }
  async function addFromKatalog(item) {
    if (addedKeys.has(item.fach+'|'+item.studiengang) || saving) return;
    saving = true;
    const res = await fetch('/api/modules', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ fach: item.fach, studiengang: item.studiengang, color: nextColor() }) });
    userModules = [...userModules, await res.json()];
    msg = item.fach + ' hinzugefuegt!'; setTimeout(() => msg = '', 2000);
    saving = false;
  }
  async function addCustom() {
    if (!customFach.trim() || saving) return;
    saving = true;
    const res = await fetch('/api/modules', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ fach: customFach.trim(), studiengang: 'Eigenes Fach', color: customColor }) });
    userModules = [...userModules, await res.json()];
    customFach = '';
    msg = 'Fach hinzugefuegt!'; setTimeout(() => msg = '', 2000);
    saving = false;
  }
  async function remove(id) {
    await fetch('/api/modules', { method: 'DELETE', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id }) });
    userModules = userModules.filter(m => m._id !== id);
  }
</script>
<svelte:head><title>Meine Faecher – StudyStreak</title></svelte:head>
<div class="page-content">
  <a href="/" class="btn btn-ghost mb-3" style="padding-left:0">← Zurueck</a>
  <h1>Meine Faecher</h1>
  <p class="text-muted">Waehle deinen Studiengang oder fuege eigene Faecher hinzu.</p>
  {#if msg}<div class="alert alert-success" style="margin-bottom:1rem">{msg}</div>{/if}
  <div class="card mb-4">
    <h2 style="font-size:1rem;font-weight:700;margin-bottom:0.75rem">Aus Studiengang hinzufuegen</h2>
    <div class="form-group">
      <label class="form-label">Studiengang</label>
      <select class="form-input" bind:value={selectedStudiengang}>
        <option value="">— Studiengang waehlen —</option>
        {#each studiengaenge as sg}<option value={sg}>{sg}</option>{/each}
      </select>
    </div>
    {#if katalogFaecher.length > 0}
      <div class="chip-row" style="flex-wrap:wrap;gap:0.5rem;margin-top:0.5rem">
        {#each katalogFaecher as item}
          {@const added = addedKeys.has(item.fach+'|'+item.studiengang)}
          <button class="chip chip-mod" class:is-active={added}
            style={added ? 'background:#10B981;border-color:#10B981;color:white;cursor:default' : ''}
            on:click={() => addFromKatalog(item)} disabled={added||saving} title="{item.semester} | {item.jahr}">
            {item.fach}{added ? ' ✓' : ' +'}
          </button>
        {/each}
      </div>
    {/if}
  </div>
  <div class="card mb-4">
    <h2 style="font-size:1rem;font-weight:700;margin-bottom:0.75rem">Eigenes Fach hinzufuegen</h2>
    <div style="display:flex;gap:0.75rem;align-items:flex-end;flex-wrap:wrap">
      <div class="form-group" style="flex:1;min-width:160px;margin:0">
        <label class="form-label">Fachname</label>
        <input class="form-input" bind:value={customFach} placeholder="z.B. Machine Learning" maxlength="60" on:keydown={(e) => e.key==='Enter' && addCustom()} />
      </div>
      <div class="form-group" style="margin:0">
        <label class="form-label">Farbe</label>
        <input type="color" bind:value={customColor} style="height:42px;width:56px;border-radius:8px;border:1px solid var(--c-border);cursor:pointer;padding:2px" />
      </div>
      <button class="btn btn-primary" on:click={addCustom} disabled={saving||!customFach.trim()}>{saving?'...':'Hinzufuegen'}</button>
    </div>
  </div>
  <div class="card">
    <h2 style="font-size:1rem;font-weight:700;margin-bottom:0.75rem">Meine Faecher ({userModules.length})</h2>
    {#if userModules.length === 0}
      <p class="text-muted">Noch keine Faecher hinzugefuegt.</p>
    {:else}
      <div class="chip-row" style="flex-wrap:wrap;gap:0.5rem">
        {#each userModules as m (m._id)}
          <div class="chip is-active" style="background:{m.color};border-color:{m.color};color:white;display:flex;align-items:center;gap:6px;padding:6px 10px">
            <span style="font-size:0.8rem;font-weight:600">{m.fach}</span>
            <button style="background:none;border:none;color:white;cursor:pointer;font-size:16px;padding:0;line-height:1;opacity:0.8" on:click={() => remove(m._id)} title="Entfernen">×</button>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
