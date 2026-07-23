<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Testimonials | Barbershop</title>
	<meta
		name="description"
		content="Read what our clients have to say about their experience at our shop."
	/>
</svelte:head>

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
	blockquote {
		margin: 0 0 1.5rem 0;
		padding-left: 1rem;
		border-left: 3px solid var(--color-gold);
	}
	footer {
		margin-top: 0.5rem;
		font-weight: 600;
	}
</style>
