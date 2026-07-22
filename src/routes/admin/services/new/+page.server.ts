import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Barber } from '$lib/types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) {
		return { barbers: [] };
	}

	const result = await db.prepare('SELECT * FROM barbers ORDER BY sort_order ASC').all<Barber>();

	return { barbers: result.results };
};

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const db = platform?.env?.DB;
		if (!db) {
			return fail(500, { error: 'Server error. Please try again.' });
		}

		const formData = await request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const price = formData.get('price');
		const duration_minutes = formData.get('duration_minutes');
		const sort_order = formData.get('sort_order');
		const barber_id = formData.get('barber_id');

		if (typeof name !== 'string' || name.trim() === '') {
			return fail(400, { error: 'Name is required.' });
		}
		if (typeof price !== 'string' || price.trim() === '' || isNaN(parseFloat(price))) {
			return fail(400, { error: 'A valid price is required.' });
		}

		const price_cents = Math.round(parseFloat(price) * 100);

		await db
			.prepare(
				`INSERT INTO services (name, description, price_cents, duration_minutes, sort_order, barber_id)
				 VALUES (?, ?, ?, ?, ?, ?)`
			)
			.bind(
				name,
				description || null,
				price_cents,
				duration_minutes ? Number(duration_minutes) : null,
				sort_order ? Number(sort_order) : 0,
				barber_id && barber_id !== '' ? Number(barber_id) : null
			)
			.run();

		redirect(303, '/admin/services');
	}
};
