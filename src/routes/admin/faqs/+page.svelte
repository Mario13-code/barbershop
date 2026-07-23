<script lang="ts">
	let { data } = $props();
</script>

<h1>Manage FAQs</h1>

<a href="/admin/faqs/new">+ Add New FAQ</a>

<table>
	<thead>
		<tr>
			<th>Question</th>
			<th>Sort Order</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each data.faqs as faq (faq.id)}
			<tr>
				<td>{faq.question}</td>
				<td>{faq.sort_order}</td>
				<td><a href="/admin/faqs/{faq.id}">Edit</a></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}
	th,
	td {
		text-align: left;
		padding: 0.5rem;
		border-bottom: 1px solid var(--color-border);
	}
</style>
