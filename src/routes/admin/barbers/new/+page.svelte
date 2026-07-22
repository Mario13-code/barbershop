<script lang="ts">
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

<h1>Add New Barber</h1>

<form method="POST">
	<label>
		Name
		<input type="text" name="name" required />
	</label>

	<label>
		Bio
		<textarea name="bio"></textarea>
	</label>

	<label>
		Photo path (e.g. /images/barbers/jamal.jpg)
		<input type="text" name="photo_url" />
	</label>

	<label>
		Specialty
		<input type="text" name="specialty" />
	</label>

	<label>
		Years of Experience
		<input type="number" name="years_experience" min="0" />
	</label>

	<label>
		Instagram URL
		<input type="url" name="instagram_url" />
	</label>

	<label>
		Personal Booksy URL (leave blank to use shop's general link)
		<input type="url" name="booksy_url" />
	</label>

	<label>
		Sort Order
		<input type="number" name="sort_order" value="0" />
	</label>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<button type="submit">Create Barber</button>
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
