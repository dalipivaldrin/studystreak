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
        {#if user}
          <div class="header-user">
            <div class="user-info">
              <span class="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
              <span class="user-name">{user.name}</span>
            </div>
            <form method="POST" action="/login?/logout" style="margin: 0;">
              <button type="submit" class="logout-btn" title="Abmelden">Abmelden</button>
            </form>
          </div>
        {:else}
          <div class="header-user">
            <a href="/login" class="login-link">Anmelden</a>
          </div>
        {/if}
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
  /* ===== App Header ===== */
  .app-header {
    background: var(--c-primary);
    color: #fff;
    padding: 0.875rem 1rem 0.875rem;
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  .brand-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    flex-wrap: nowrap;
    min-width: 0;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .brand:hover { text-decoration: none; opacity: 0.9; }

  /* StreakDisplay bleibt in der Mitte / links */
  :global(.streak-display) {
    flex-shrink: 0;
  }

  /* User-Bereich ganz rechts, INNERHALB des Headers */
  .header-user {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    min-width: 0;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.8rem;
    flex-shrink: 0;
    border: 2px solid rgba(255,255,255,0.5);
  }

  .user-name {
    font-weight: 600;
    font-size: 0.85rem;
    color: #fff;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .logout-btn {
    background: rgba(255, 255, 255, 0.15);
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    color: #fff;
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-sm, 8px);
    font-size: 0.75rem;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .logout-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: #fff;
  }

  .login-link {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    border: 1.5px solid rgba(255,255,255,0.5);
    padding: 0.2rem 0.75rem;
    border-radius: var(--radius-sm, 8px);
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
  }
  .login-link:hover { background: rgba(255,255,255,0.3); text-decoration: none; }

  .greeting {
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.92);
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255,255,255,0.2);
  }

  .subtitle {
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    margin-top: 0.4rem;
  }

  /* ===== Responsive: PC / Tablet / Mobile ===== */

  /* Mobile-first: Standard-Layout (bis 640px) */
  :global(body) {
    overflow-x: hidden;
  }

  /* Tablet (641px – 1024px) */
  @media (min-width: 641px) {
    :global(.app-shell) {
      max-width: 720px;
    }
    .brand {
      font-size: 1.2rem;
    }
    .user-name {
      max-width: 130px;
    }
    .logout-btn {
      padding: 0.25rem 0.75rem;
      font-size: 0.8rem;
    }
  }

  /* Desktop (ab 1025px) */
  @media (min-width: 1025px) {
    :global(.app-shell) {
      max-width: 900px;
    }

    .brand {
      font-size: 1.3rem;
    }
    .user-name {
      max-width: 160px;
      font-size: 0.9rem;
    }
    .user-avatar {
      width: 34px;
      height: 34px;
      font-size: 0.85rem;
    }
    .logout-btn {
      padding: 0.3rem 0.9rem;
      font-size: 0.82rem;
    }
    .app-header {
      padding: 1rem 1.5rem;
    }
  }
</style>
