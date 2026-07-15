<script lang="ts">
	let { data } = $props();

	function formatPrice(cents: number): string {
		return `$${(cents / 100).toFixed(2)}`;
	}
</script>

<h1>Our Services</h1>

{#if data.services.length === 0}
	<p>No services found.</p>
{:else}
	<ul>
		{#each data.services as service (service.id)}
			<li>
				<h2>{service.name} — {formatPrice(service.price_cents)}</h2>
				{#if service.duration_minutes}
					<p>{service.duration_minutes} minutes</p>
				{/if}
				{#if service.description}
					<p>{service.description}</p>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
