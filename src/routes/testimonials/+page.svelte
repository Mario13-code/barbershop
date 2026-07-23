<script lang="ts">
	let { data } = $props();
</script>

<h1>What Our Clients Say</h1>

{#if data.testimonials.length === 0}
	<p>No testimonials yet.</p>
{:else}
	{#each data.testimonials as t (t.id)}
		<blockquote>
			<p>"{t.quote}"</p>
			<footer>— {t.client_name}</footer>
		</blockquote>
	{/each}
{/if}

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}
	th,
	td {
		text-align: left;
		padding: 0.5rem;
		border-bottom: 1px solid var(--color-border);
	}
</style>
