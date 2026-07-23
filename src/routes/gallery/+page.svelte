<script lang="ts">
	const photos = [
		{ src: 'https://placehold.co/600x400?text=Shop+Photo+1', alt: 'Shop photo 1' },
		{ src: 'https://placehold.co/600x400?text=Shop+Photo+2', alt: 'Shop photo 2' },
		{ src: 'https://placehold.co/600x400?text=Shop+Photo+3', alt: 'Shop photo 3' },
		{ src: 'https://placehold.co/600x400?text=Shop+Photo+4', alt: 'Shop photo 4' }
	];
</script>

<svelte:head>
	<title>Gallery | Barbershop</title>
	<meta
		name="description"
		content="See photos of our shop, our work, and the space where we bring your next cut to life."
	/>
</svelte:head>

<h1>Gallery</h1>
<div class="grid">
	{#each photos as photo}
		<img src={photo.src} alt={photo.alt} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}
	img {
		width: 100%;
		border-radius: 8px;
		display: block;
	}
</style>
