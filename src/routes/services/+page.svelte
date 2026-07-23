<script lang="ts">
	let { data } = $props();

	function formatPrice(cents: number): string {
		return `$${(cents / 100).toFixed(2)}`;
	}
</script>

<svelte:head>
	<title>Our Services | Barbershop</title>
	<meta
		name="description"
		content="Browse our full menu of haircuts, beard trims, and grooming services with pricing."
	/>
</svelte:head>

<h1>Our Services</h1>
{#if data.services.length === 0}
	<p>No services found.</p>
{:else}
	<ul>
		{#each data.services as service (service.id)}
			<li>
				<h2>
					{service.name} — {formatPrice(service.price_cents)}
					{#if service.barber_name}
						<span class="barber-tag">with {service.barber_name}</span>
					{/if}
				</h2>
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

<style>
	.barber-tag {
		font-size: 0.85rem;
		font-weight: normal;
		color: #666;
	}
</style>
