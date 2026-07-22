<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>Add New Service</h1>

<form method="POST">
	<label>
		Name
		<input type="text" name="name" required />
	</label>

	<label>
		Description
		<textarea name="description"></textarea>
	</label>

	<label>
		Price (USD)
		<input type="number" name="price" step="0.01" min="0" required />
	</label>

	<label>
		Duration (minutes)
		<input type="number" name="duration_minutes" min="0" />
	</label>

	<label>
		Barber
		<select name="barber_id">
			<option value="">Shop-wide (any barber)</option>
			{#each data.barbers as barber (barber.id)}
				<option value={barber.id}>{barber.name}</option>
			{/each}
		</select>
	</label>

	<label>
		Sort Order
		<input type="number" name="sort_order" value="0" />
	</label>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<button type="submit">Create Service</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 480px;
	}
	.error {
		color: #c0392b;
	}
</style>
