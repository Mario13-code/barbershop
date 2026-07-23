<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>About Us | Barbershop</title>
	<meta
		name="description"
		content="Learn about our shop, our story, and what makes our barbers different."
	/>
</svelte:head>

<h1>About {data.shopInfo?.shop_name ?? 'Us'}</h1>
{#if data.shopInfo?.about_text}
	<p>{data.shopInfo.about_text}</p>
{:else}
	<p>More about our shop coming soon.</p>
{/if}
