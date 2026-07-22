<script lang="ts">
	let { data } = $props();

	function formatPrice(cents: number): string {
		return `$${(cents / 100).toFixed(2)}`;
	}
</script>

<a href="/barbers">&larr; Back to Barbers</a>

<h1>{data.barber.name}</h1>

{#if data.barber.photo_url}
	<img src={data.barber.photo_url} alt={data.barber.name} />
{/if}

{#if data.barber.specialty}
	<p><strong>{data.barber.specialty}</strong></p>
{/if}

{#if data.barber.years_experience}
	<p>{data.barber.years_experience} years of experience</p>
{/if}

{#if data.barber.bio}
	<p>{data.barber.bio}</p>
{/if}

{#if data.barber.instagram_url}
	<p><a href={data.barber.instagram_url} target="_blank" rel="noopener noreferrer">Instagram</a></p>
{/if}

{#if data.barber.booksy_url}
	<a href={data.barber.booksy_url} target="_blank" rel="noopener noreferrer" class="book-now">
		Book Appointment
	</a>
{:else}
	<p class="walk-in">Walk-ins Welcome</p>
{/if}

{#if data.services.length > 0}
	<h2>Services with {data.barber.name}</h2>
	<ul>
		{#each data.services as service (service.id)}
			<li>{service.name} — {formatPrice(service.price_cents)}</li>
		{/each}
	</ul>
{/if}

<style>
	img {
		max-width: 300px;
		border-radius: 8px;
	}
	.book-now {
		display: inline-block;
		background: #111;
		color: white;
		padding: 0.5rem 1.25rem;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
	}
	.walk-in {
		font-weight: 600;
		color: #2e7d32;
	}
</style>
