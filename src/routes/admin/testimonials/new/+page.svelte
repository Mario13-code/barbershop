<script lang="ts">
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

<h1>Add New Testimonial</h1>

<form method="POST">
	<label>
		Client Name
		<input type="text" name="client_name" required />
	</label>

	<label>
		Quote
		<textarea name="quote" required></textarea>
	</label>

	<label>
		Sort Order
		<input type="number" name="sort_order" value="0" />
	</label>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<button type="submit">Create Testimonial</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 480px;
	}
	.error {
		color: var(--color-error);
	}
</style>
