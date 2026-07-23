<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.shopInfo?.shop_name ?? 'Barbershop'}</title>
	<meta
		name="description"
		content="{data.shopInfo?.shop_name ??
			'Our barbershop'} — book your next haircut, browse our barbers and services."
	/>
</svelte:head>

<h1>{data.shopInfo?.shop_name ?? 'Welcome'}</h1>

{#if data.shopInfo?.about_text}
	<p>{data.shopInfo.about_text}</p>
{/if}

<p><a href="/barbers">Meet our barbers</a> or <a href="/services">view our services</a>.</p>
