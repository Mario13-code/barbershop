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

<section class="hero">
	<div class="hero-text">
		<h1>{data.shopInfo?.shop_name ?? 'Welcome'}</h1>
		{#if data.shopInfo?.about_text}
			<p>{data.shopInfo.about_text}</p>
		{/if}
		<div class="hero-actions">
			<a href="/barbers" class="btn-primary">Meet our barbers</a>
			<a href="/services" class="btn-secondary">View services</a>
		</div>
	</div>
	<div class="hero-graphic">
		<img src="/images/hero-graphic.png" alt="Ascension Dynasty Barber Shop brand graphic" />
	</div>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
	}
	.hero-text {
		background: var(--color-black);
		color: var(--color-white);
		padding: 3rem 1.5rem;
	}
	.hero-text h1 {
		font-size: 3rem;
		color: var(--color-gold);
		margin: 0 0 1rem 0;
		line-height: 1;
	}
	.hero-text p {
		font-size: 1.1rem;
		max-width: 480px;
		margin: 0 0 1.5rem 0;
	}
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.btn-primary,
	.btn-secondary {
		display: inline-block;
		padding: 0.6rem 1.4rem;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
	}
	.btn-primary {
		background: var(--color-gold);
		color: var(--color-black);
	}
	.btn-primary:hover {
		background: var(--color-blue);
		color: var(--color-white);
	}
	.btn-secondary {
		background: transparent;
		color: var(--color-white);
		border: 1px solid var(--color-white);
	}
	.btn-secondary:hover {
		background: var(--color-white);
		color: var(--color-black);
	}
	.hero-graphic {
		background: var(--color-blue);
	}
	.hero-graphic img {
		width: 100%;
		display: block;
	}

	@media (min-width: 768px) {
		.hero {
			flex-direction: row;
			min-height: 480px;
		}
		.hero-text {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 4rem;
		}
		.hero-text h1 {
			font-size: 4.5rem;
		}
		.hero-graphic {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.hero-graphic img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}
</style>
