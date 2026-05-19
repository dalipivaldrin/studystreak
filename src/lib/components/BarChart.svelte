<script>
	export let data = []; // [{ label, minutes }]
	export let labelEvery = 0; // 0 = auto: zeige max ~10 Labels
	$: max = Math.max(60, ...data.map((d) => d.minutes));
	$: step = labelEvery > 0 ? labelEvery : Math.max(1, Math.ceil(data.length / 10));
</script>

<div class="bar-chart" style="--cols: {data.length}">
	{#each data as d, i}
		{@const pct = (d.minutes / max) * 100}
		{@const showLabel = i % step === 0 || i === data.length - 1}
		<div class="bar-col">
			<div class="bar-fill" class:muted={d.minutes === 0} style="height: {pct}%" title={`${d.label}: ${d.minutes} min`}></div>
			<div class="bar-label" style:visibility={showLabel ? 'visible' : 'hidden'}>{d.label}</div>
		</div>
	{/each}
</div>
