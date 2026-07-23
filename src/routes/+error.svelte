<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Page Not Found | Barbershop</title>
</svelte:head>

<div class="error-page">
	<h1>{page.status}</h1>
	<p>{page.error?.message ?? 'Something went wrong.'}</p>
	<a href="/" class="home-link">Back to Home</a>
</div>

<style>
	.error-page {
		text-align: center;
		padding: 4rem 1rem;
	}
	h1 {
		font-size: 4rem;
		color: var(--color-gold);
		margin: 0;
	}
	.home-link {
		display: inline-block;
		margin-top: 1.5rem;
		background: var(--color-black);
		color: var(--color-white);
		padding: 0.5rem 1.25rem;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
	}
</style>
