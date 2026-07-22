<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>Edit FAQ</h1>

<form method="POST" action="?/update">
	<label>
		Question
		<input type="text" name="question" value={data.faq.question} required />
	</label>

	<label>
		Answer
		<textarea name="answer" required>{data.faq.answer}</textarea>
	</label>

	<label>
		Sort Order
		<input type="number" name="sort_order" value={data.faq.sort_order} />
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
		if (!confirm('Delete this FAQ? This cannot be undone.')) e.preventDefault();
	}}
>
	<button type="submit" class="delete">Delete FAQ</button>
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
