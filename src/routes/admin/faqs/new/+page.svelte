<script lang="ts">
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

<h1>Add New FAQ</h1>

<form method="POST">
	<label>
		Question
		<input type="text" name="question" required />
	</label>

	<label>
		Answer
		<textarea name="answer" required></textarea>
	</label>

	<label>
		Sort Order
		<input type="number" name="sort_order" value="0" />
	</label>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<button type="submit">Create FAQ</button>
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
