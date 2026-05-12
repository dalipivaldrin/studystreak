<script>
	import { page } from '$app/stores';

	const items = [
		{ href: '/', icon: '🏠', label: 'Home' },
		{ href: '/stats', icon: '📊', label: 'Stats' },
		{ href: '/badges', icon: '🏅', label: 'Badges' },
		{ href: '/reflection', icon: '📝', label: 'Reflexion' }
	];

	$: pathname = $page.url.pathname;

	function isActive(href) {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}
</script>

<nav class="bottom-nav" aria-label="Hauptnavigation">
	{#each items as it}
		<a href={it.href} class:is-active={isActive(it.href)} aria-current={isActive(it.href) ? 'page' : undefined}>
			<span class="nav-icon" aria-hidden="true">{it.icon}</span>
			<span>{it.label}</span>
		</a>
	{/each}
</nav>
