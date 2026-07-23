<script lang="ts">
	let { data } = $props();
</script>

<h1>Manage Testimonials</h1>

<a href="/admin/testimonials/new">+ Add New Testimonial</a>

<table>
	<thead>
		<tr>
			<th>Client</th>
			<th>Quote</th>
			<th>Sort Order</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each data.testimonials as t (t.id)}
			<tr>
				<td>{t.client_name}</td>
				<td>{t.quote.slice(0, 60)}{t.quote.length > 60 ? '…' : ''}</td>
				<td>{t.sort_order}</td>
				<td><a href="/admin/testimonials/{t.id}">Edit</a></td>
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
