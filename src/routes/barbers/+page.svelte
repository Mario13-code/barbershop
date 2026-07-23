<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Our Barbers | Barbershop</title>
	<meta
		name="description"
		content="Meet our team of barbers — view specialties, experience, and book your next appointment."
	/>
</svelte:head>

<h1>Our Barbers</h1>

{#if data.barbers.length === 0}
	<p>No barbers found.</p>
{:else}
	<ul>
		{#each data.barbers as barber (barber.id)}
			<li>
				<h2><a href="/barbers/{barber.id}">{barber.name}</a></h2>
				{#if barber.specialty}
					<p><strong>{barber.specialty}</strong></p>
				{/if}
				{#if barber.bio}
					<p>{barber.bio}</p>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
