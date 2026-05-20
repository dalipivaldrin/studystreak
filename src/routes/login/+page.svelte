<script>
  import { enhance } from '$app/forms';

  export let form;

  let mode = form?.mode || 'login';
  let loading = false;

  function switchMode(newMode) {
    mode = newMode;
  }
</script>

<svelte:head>
  <title>{mode === 'login' ? 'Anmelden' : 'Registrieren'} – StudyStreak</title>
</svelte:head>

<div class="auth-page">
  <div class="auth-card">
    <div class="auth-logo">
      <span class="logo-emoji">📚</span>
      <h1 class="logo-title">StudyStreak</h1>
      <p class="logo-sub">Dein persönlicher Lernbegleiter</p>
    </div>

    <div class="auth-tabs">
      <button
        class="tab-btn"
        class:active={mode === 'login'}
        on:click={() => switchMode('login')}
        type="button"
      >
        Anmelden
      </button>
      <button
        class="tab-btn"
        class:active={mode === 'register'}
        on:click={() => switchMode('register')}
        type="button"
      >
        Registrieren
      </button>
    </div>

    {#if form?.error}
      <div class="auth-error">
        <span>⚠️ {form.error}</span>
      </div>
    {/if}

    {#if mode === 'login'}
      <form
        method="POST"
        action="?/login"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            loading = false;
            await update();
          };
        }}
        class="auth-form"
      >
        <div class="form-group">
          <label for="login-email">E-Mail</label>
          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="deine@email.de"
            required
            autocomplete="email"
          />
        </div>
        <div class="form-group">
          <label for="login-password">Passwort</label>
          <input
            id="login-password"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            autocomplete="current-password"
          />
        </div>
        <button type="submit" class="auth-submit" disabled={loading}>
          {loading ? 'Anmelden...' : 'Anmelden'}
        </button>
      </form>
      <p class="auth-switch">
        Noch kein Konto?
        <button type="button" class="link-btn" on:click={() => switchMode('register')}>
          Jetzt registrieren
        </button>
      </p>
    {:else}
      <form
        method="POST"
        action="?/register"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            loading = false;
            await update();
          };
        }}
        class="auth-form"
      >
        <div class="form-group">
          <label for="reg-name">Vollständiger Name</label>
          <input
            id="reg-name"
            type="text"
            name="name"
            placeholder="Max Mustermann"
            required
            autocomplete="name"
          />
        </div>
        <div class="form-group">
          <label for="reg-email">E-Mail</label>
          <input
            id="reg-email"
            type="email"
            name="email"
            placeholder="deine@email.de"
            required
            autocomplete="email"
          />
        </div>
        <div class="form-group">
          <label for="reg-password">Passwort</label>
          <input
            id="reg-password"
            type="password"
            name="password"
            placeholder="Mindestens 6 Zeichen"
            required
            minlength="6"
            autocomplete="new-password"
          />
        </div>
        <div class="form-group">
          <label for="reg-confirm">Passwort bestätigen</label>
          <input
            id="reg-confirm"
            type="password"
            name="confirmPassword"
            placeholder="Passwort wiederholen"
            required
            autocomplete="new-password"
          />
        </div>
        <button type="submit" class="auth-submit" disabled={loading}>
          {loading ? 'Registrieren...' : 'Konto erstellen'}
        </button>
      </form>
      <p class="auth-switch">
        Bereits registriert?
        <button type="button" class="link-btn" on:click={() => switchMode('login')}>
          Jetzt anmelden
        </button>
      </p>
    {/if}
  </div>
</div>

<style>
  .auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--c-bg, #F7F8FB);
    padding: 1rem;
  }

  .auth-card {
    background: var(--c-surface, #FFFFFF);
    border-radius: var(--radius-lg, 16px);
    box-shadow: 0 4px 24px rgba(58, 90, 204, 0.10);
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 420px;
  }

  .auth-logo {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .logo-emoji {
    font-size: 2.5rem;
  }

  .logo-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--c-primary, #3A5ACC);
    margin: 0.25rem 0 0;
  }

  .logo-sub {
    font-size: 0.875rem;
    color: var(--c-text-muted, #6B7280);
    margin: 0.25rem 0 0;
  }

  .auth-tabs {
    display: flex;
    background: var(--c-bg, #F7F8FB);
    border-radius: var(--radius-md, 12px);
    padding: 4px;
    margin-bottom: 1.5rem;
    gap: 4px;
  }

  .tab-btn {
    flex: 1;
    padding: 0.5rem;
    border: none;
    background: transparent;
    border-radius: var(--radius-sm, 8px);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--c-text-muted, #6B7280);
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab-btn.active {
    background: var(--c-primary, #3A5ACC);
    color: #fff;
    box-shadow: 0 2px 8px rgba(58, 90, 204, 0.25);
  }

  .auth-error {
    background: var(--c-danger-light, #fbe6e8);
    color: var(--c-danger, #DC3545);
    border-radius: var(--radius-sm, 8px);
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--c-text, #111827);
  }

  .form-group input {
    padding: 0.625rem 0.875rem;
    border: 1.5px solid var(--c-border, #E5E7EB);
    border-radius: var(--radius-sm, 8px);
    font-size: 0.95rem;
    color: var(--c-text, #111827);
    background: var(--c-surface, #FFFFFF);
    transition: border-color 0.2s;
    outline: none;
    font-family: inherit;
  }

  .form-group input:focus {
    border-color: var(--c-primary, #3A5ACC);
    box-shadow: 0 0 0 3px rgba(58, 90, 204, 0.12);
  }

  .auth-submit {
    margin-top: 0.5rem;
    padding: 0.75rem;
    background: var(--c-primary, #3A5ACC);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm, 8px);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, opacity 0.2s;
  }

  .auth-submit:hover:not(:disabled) {
    background: var(--c-primary-hover, #2d47a8);
  }

  .auth-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .auth-switch {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.875rem;
    color: var(--c-text-muted, #6B7280);
  }

  .link-btn {
    background: none;
    border: none;
    color: var(--c-primary, #3A5ACC);
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    font-size: inherit;
    text-decoration: underline;
  }
</style>
