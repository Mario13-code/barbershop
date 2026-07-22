<script lang="ts">
	let { data } = $props();
</script>

<h1>Manage Barbers</h1>

<a href="/admin/barbers/new">+ Add New Barber</a>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Specialty</th>
			<th>Years Exp.</th>
			<th>Sort Order</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each data.barbers as barber (barber.id)}
			<tr>
				<td>{barber.name}</td>
				<td>{barber.specialty ?? '—'}</td>
				<td>{barber.years_experience ?? '—'}</td>
				<td>{barber.sort_order}</td>
				<td><a href="/admin/barbers/{barber.id}">Edit</a></td>
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
