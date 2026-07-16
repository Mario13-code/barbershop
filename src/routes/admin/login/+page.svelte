<script lang="ts">
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

<h1>Admin Login</h1>

<form method="POST">
	<label>
		Email
		<input type="email" name="email" required />
	</label>

	<label>
		Password
		<input type="password" name="password" required />
	</label>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<button type="submit">Log In</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 320px;
	}

	.error {
		color: #c0392b;
	}
</style>
