<script lang="ts">
	let { data } = $props();

	function formatPrice(cents: number): string {
		return `$${(cents / 100).toFixed(2)}`;
	}
</script>

<h1>Manage Services</h1>

<a href="/admin/services/new">+ Add New Service</a>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Price</th>
			<th>Barber</th>
			<th>Sort Order</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each data.services as service (service.id)}
			<tr>
				<td>{service.name}</td>
				<td>{formatPrice(service.price_cents)}</td>
				<td>{service.barber_name ?? 'Shop-wide'}</td>
				<td>{service.sort_order}</td>
				<td><a href="/admin/services/{service.id}">Edit</a></td>
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
		border-bottom: 1px solid #ddd;
	}
</style>
