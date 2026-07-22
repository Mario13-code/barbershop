<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<nav>
		<a href="/">{data.shopInfo?.shop_name ?? 'Barbershop'}</a>
		<a href="/barbers">Barbers</a>
		<a href="/services">Services</a>
		<a href="/about">About</a>
		<a href="/contact">Contact</a>
		<a href="/gallery">Gallery</a>
	</nav>
	{#if data.shopInfo?.booksy_url}
		<a href={data.shopInfo.booksy_url} target="_blank" rel="noopener noreferrer" class="book-now">
			Book Now
		</a>
	{/if}
</header>

<main>
	{@render children()}
</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		border-bottom: 1px solid #ddd;
	}

	nav {
		display: flex;
		gap: 1.5rem;
	}

	.book-now {
		background: #111;
		color: white;
		padding: 0.5rem 1.25rem;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
	}
</style>
