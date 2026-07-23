<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>Edit Service</h1>

<form method="POST" action="?/update">
	<label>
		Name
		<input type="text" name="name" value={data.service.name} required />
	</label>

	<label>
		Description
		<textarea name="description">{data.service.description ?? ''}</textarea>
	</label>

	<label>
		Price (USD)
		<input
			type="number"
			name="price"
			step="0.01"
			min="0"
			value={(data.service.price_cents / 100).toFixed(2)}
			required
		/>
	</label>

	<label>
		Duration (minutes)
		<input
			type="number"
			name="duration_minutes"
			min="0"
			value={data.service.duration_minutes ?? ''}
		/>
	</label>

	<label>
		Barber
		<select name="barber_id" value={data.service.barber_id ?? ''}>
			<option value="">Shop-wide (any barber)</option>
			{#each data.barbers as barber (barber.id)}
				<option value={barber.id}>{barber.name}</option>
			{/each}
		</select>
	</label>

	<label>
		Sort Order
		<input type="number" name="sort_order" value={data.service.sort_order} />
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
		if (!confirm('Delete this service? This cannot be undone.')) e.preventDefault();
	}}
>
	<button type="submit" class="delete">Delete Service</button>
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
		color: var(--color-error);
	}
	.delete {
		background: var(--color-error);
		color: var(--color-white);
	}
</style>
