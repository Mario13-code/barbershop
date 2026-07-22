<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>Edit Barber</h1>

<form method="POST" action="?/update">
	<label>
		Name
		<input type="text" name="name" value={data.barber.name} required />
	</label>

	<label>
		Bio
		<textarea name="bio">{data.barber.bio ?? ''}</textarea>
	</label>

	<label>
		Photo path
		<input type="text" name="photo_url" value={data.barber.photo_url ?? ''} />
	</label>

	<label>
		Specialty
		<input type="text" name="specialty" value={data.barber.specialty ?? ''} />
	</label>

	<label>
		Years of Experience
		<input
			type="number"
			name="years_experience"
			min="0"
			value={data.barber.years_experience ?? ''}
		/>
	</label>

	<label>
		Instagram URL
		<input type="url" name="instagram_url" value={data.barber.instagram_url ?? ''} />
	</label>

	<label>
		Personal Booksy URL
		<input type="url" name="booksy_url" value={data.barber.booksy_url ?? ''} />
	</label>

	<label>
		Sort Order
		<input type="number" name="sort_order" value={data.barber.sort_order} />
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
		if (!confirm('Delete this barber? This cannot be undone.')) e.preventDefault();
	}}
>
	<button type="submit" class="delete">Delete Barber</button>
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
