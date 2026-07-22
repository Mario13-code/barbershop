<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>Edit Testimonial</h1>

<form method="POST" action="?/update">
	<label>
		Client Name
		<input type="text" name="client_name" value={data.testimonial.client_name} required />
	</label>

	<label>
		Quote
		<textarea name="quote" required>{data.testimonial.quote}</textarea>
	</label>

	<label>
		Sort Order
		<input type="number" name="sort_order" value={data.testimonial.sort_order} />
	</label>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<button type="submit">Save Changes</button>
</form>

<form
	method="POST"
	action="?/delete"
	onsubmit={(e) => {
		if (!confirm('Delete this testimonial? This cannot be undone.')) e.preventDefault();
	}}
>
	<button type="submit" class="delete">Delete Testimonial</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 480px;
		margin-bottom: 1.5rem;
	}
	.error {
		color: #c0392b;
	}
	.delete {
		background: #c0392b;
		color: white;
	}
</style>
