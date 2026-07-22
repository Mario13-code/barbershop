<script lang="ts">
	import type { ActionData, PageData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	const dayLabels: Record<string, string> = {
		mon: 'Monday',
		tue: 'Tuesday',
		wed: 'Wednesday',
		thu: 'Thursday',
		fri: 'Friday',
		sat: 'Saturday',
		sun: 'Sunday'
	};

	type DayHours = { day: string; open: string; close: string; closed: boolean };

	function parseInitialHours(): DayHours[] {
		const existing: Record<string, string> = data.shopInfo?.hours_json
			? JSON.parse(data.shopInfo.hours_json)
			: {};

		return Object.keys(dayLabels).map((day) => {
			const raw = existing[day];
			if (!raw || raw === 'closed') {
				return { day, open: '09:00', close: '18:00', closed: !raw ? false : true };
			}
			const [open, close] = raw.split('-');
			return { day, open, close, closed: false };
		});
	}

	let hours = $state<DayHours[]>(parseInitialHours());

	let hoursJson = $derived(
		JSON.stringify(
			Object.fromEntries(hours.map((h) => [h.day, h.closed ? 'closed' : `${h.open}-${h.close}`]))
		)
	);
</script>

<h1>Shop Info</h1>

<form method="POST">
	<label>
		Shop Name
		<input type="text" name="shop_name" value={data.shopInfo?.shop_name ?? ''} required />
	</label>

	<label>
		Address
		<input type="text" name="address" value={data.shopInfo?.address ?? ''} />
	</label>

	<label>
		Phone
		<input type="text" name="phone" value={data.shopInfo?.phone ?? ''} />
	</label>

	<label>
		Booksy URL (general/walk-in link)
		<input type="url" name="booksy_url" value={data.shopInfo?.booksy_url ?? ''} />
	</label>

	<fieldset>
		<legend>Hours</legend>
		{#each hours as day}
			<div class="day-row">
				<span class="day-label">{dayLabels[day.day]}</span>
				<label class="closed-check">
					<input type="checkbox" bind:checked={day.closed} />
					Closed
				</label>
				{#if !day.closed}
					<input type="time" bind:value={day.open} />
					<span>to</span>
					<input type="time" bind:value={day.close} />
				{/if}
			</div>
		{/each}
	</fieldset>

	<input type="hidden" name="hours_json" value={hoursJson} />

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<button type="submit">Save Changes</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 560px;
	}
	fieldset {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 1px solid #ddd;
		padding: 1rem;
	}
	.day-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.day-label {
		width: 100px;
	}
	.closed-check {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		width: 90px;
	}
	.error {
		color: #c0392b;
	}
</style>
