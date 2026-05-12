<script>
	export let data = []; // [{ label, minutes }]
	$: max = Math.max(60, ...data.map((d) => d.minutes));
</script>

<div class="bar-chart" style="--cols: {data.length}">
	{#each data as d}
		{@const pct = (d.minutes / max) * 100}
		<div class="bar-col">
			<div class="bar-fill" class:muted={d.minutes === 0} style="height: {pct}%" title={`${d.label}: ${d.minutes} min`}></div>
			<div class="bar-label">{d.label}</div>
		</div>
	{/each}
</div>
