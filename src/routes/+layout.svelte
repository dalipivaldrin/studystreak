<script>
  import '../app.css';
  import { page } from '$app/stores';
  import BottomNav from '$lib/components/BottomNav.svelte';
  import StreakDisplay from '$lib/components/StreakDisplay.svelte';

  export let data;

  // Pfade ohne Header (z.B. Detailansicht hat eigene Header)
  $: showHeader = !$page.url.pathname.startsWith('/sessions/') && $page.url.pathname !== '/login';
  $: user = data.user;
</script>

<div class="app-shell">
  {#if showHeader}
    <header class="app-header">
      <div class="brand-row">
        <a class="brand" href="/">
          <span aria-hidden="true">📚</span>
          StudyStreak
        </a>
        <StreakDisplay days={data.stats.currentStreak} />
        <div class="header-user">
          {#if user}
            <div class="user-info">
              <span class="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
              <span class="user-name">{user.name}</span>
            </div>
            <form method="POST" action="/login?/logout" style="margin: 0;">
              <button type="submit" class="logout-btn" title="Abmelden">Abmelden</button>
            </form>
          {:else}
            <a href="/login" class="login-link">Anmelden</a>
          {/if}
        </div>
      </div>
      {#if $page.url.pathname === '/'}
        <div class="greeting">👋 Hallo, {user ? user.name : 'Lernender'}!</div>
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

  {#if showHeader}
    <BottomNav />
  {/if}
</div>

<style>
  .brand-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .header-user {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--c-primary, #3A5ACC);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .user-name {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--c-text, #111827);
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .logout-btn {
    background: none;
    border: 1.5px solid var(--c-border, #E5E7EB);
    color: var(--c-text-muted, #6B7280);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-sm, 8px);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .logout-btn:hover {
    border-color: var(--c-danger, #DC3545);
    color: var(--c-danger, #DC3545);
  }

  .login-link {
    background: var(--c-primary, #3A5ACC);
    color: #fff;
    padding: 0.35rem 0.9rem;
    border-radius: var(--radius-sm, 8px);
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s;
  }

  .login-link:hover {
    background: var(--c-primary-hover, #2d47a8);
  }
</style>
