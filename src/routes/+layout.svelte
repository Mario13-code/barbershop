<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	let { data, children } = $props();
	let mobileMenuOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<div class="header-bar">
		<a href="/" class="brand">{data.shopInfo?.shop_name ?? 'Barbershop'}</a>

		<button
			class="menu-toggle"
			aria-label="Toggle menu"
			aria-expanded={mobileMenuOpen}
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>

		<nav class:open={mobileMenuOpen}>
			<a href="/barbers" onclick={() => (mobileMenuOpen = false)}>Barbers</a>
			<a href="/services" onclick={() => (mobileMenuOpen = false)}>Services</a>
			<a href="/about" onclick={() => (mobileMenuOpen = false)}>About</a>
			<a href="/contact" onclick={() => (mobileMenuOpen = false)}>Contact</a>
			<a href="/gallery" onclick={() => (mobileMenuOpen = false)}>Gallery</a>
			<a href="/faq" onclick={() => (mobileMenuOpen = false)}>FAQ</a>
			<a href="/testimonials" onclick={() => (mobileMenuOpen = false)}>Testimonials</a>
			{#if data.shopInfo?.booksy_url}
				<a
					href={data.shopInfo.booksy_url}
					target="_blank"
					rel="noopener noreferrer"
					class="book-now">Book Now</a
				>
			{/if}
		</nav>
	</div>
</header>

<main>
	{@render children()}
</main>

<style>
	header {
		border-bottom: 1px solid var(--color-border);
	}
	.header-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		position: relative;
	}
	.brand {
		color: var(--color-black);
		text-decoration: none;
		font-weight: 700;
		font-size: 1.1rem;
	}
	.menu-toggle {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 32px;
		height: 32px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}
	.menu-toggle span {
		display: block;
		height: 2px;
		background: var(--color-black);
		border-radius: 2px;
	}
	nav {
		display: none;
		flex-direction: column;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: var(--color-white);
		border-bottom: 1px solid var(--color-border);
		padding: 1rem 1.5rem;
		gap: 1rem;
	}
	nav.open {
		display: flex;
	}
	nav a {
		color: var(--color-black);
		text-decoration: none;
		font-weight: 500;
	}
	nav a:hover {
		color: var(--color-blue);
	}
	.book-now {
		background: var(--color-gold);
		color: var(--color-black);
		padding: 0.5rem 1.25rem;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
		text-align: center;
	}
	.book-now:hover {
		background: var(--color-blue);
		color: var(--color-white);
	}

	@media (min-width: 768px) {
		.menu-toggle {
			display: none;
		}
		nav {
			display: flex;
			flex-direction: row;
			position: static;
			border-bottom: none;
			padding: 0;
			gap: 1.5rem;
			align-items: center;
			background: none;
		}
		.book-now {
			margin-left: 0.5rem;
		}
	}
</style>
