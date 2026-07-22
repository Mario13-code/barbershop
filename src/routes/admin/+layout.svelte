<script lang="ts">
	let { children } = $props();
</script>

<nav class="admin-nav">
	<a href="/admin">Dashboard</a>
	<a href="/admin/barbers">Barbers</a>
	<a href="/admin/services">Services</a>
	<a href="/admin/shop-info">Shop Info</a>
	<a href="/admin/faqs">FAQs</a>
	<a href="/admin/testimonials">Testimonials</a>
</nav>

{@render children()}

<style>
	.admin-nav {
		display: flex;
		gap: 1.5rem;
		padding: 1rem 2rem;
		background: #f4f4f4;
		border-bottom: 1px solid #ddd;
	}
</style>
