<script lang="ts">
	let { data } = $props();

	const dayLabels: Record<string, string> = {
		mon: 'Monday',
		tue: 'Tuesday',
		wed: 'Wednesday',
		thu: 'Thursday',
		fri: 'Friday',
		sat: 'Saturday',
		sun: 'Sunday'
	};

	let hours: [string, string][] = $derived(
		data.shopInfo?.hours_json
			? Object.entries(JSON.parse(data.shopInfo.hours_json)).map(
					([day, value]) =>
						[dayLabels[day], value === 'closed' ? 'Closed' : value] as [string, string]
				)
			: []
	);
</script>

<svelte:head>
	<title>Contact & Hours | Barbershop</title>
	<meta
		name="description"
		content="Find our address, phone number, hours, and how to book your next appointment."
	/>
</svelte:head>

<h1>Contact & Hours</h1>
{#if data.shopInfo?.address}
	<p>{data.shopInfo.address}</p>
{/if}
{#if data.shopInfo?.phone}
	<p>{data.shopInfo.phone}</p>
{/if}
{#if hours.length > 0}
	<h2>Hours</h2>
	<ul>
		{#each hours as [label, value]}
			<li>{label}: {value}</li>
		{/each}
	</ul>
{/if}
{#if data.shopInfo?.booksy_url}
	<a href={data.shopInfo.booksy_url} target="_blank" rel="noopener noreferrer">Book Now</a>
{/if}
