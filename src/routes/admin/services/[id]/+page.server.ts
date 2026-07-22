import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Barber, Service } from '$lib/types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const db = platform?.env?.DB;
	if (!db) {
		error(500, 'Server error.');
	}

	const service = await db
		.prepare('SELECT * FROM services WHERE id = ?')
		.bind(params.id)
		.first<Service>();

	if (!service) {
		error(404, 'Service not found.');
	}

	const barbersResult = await db
		.prepare('SELECT * FROM barbers ORDER BY sort_order ASC')
		.all<Barber>();

	return { service, barbers: barbersResult.results };
};

export const actions: Actions = {
	update: async ({ request, params, platform }) => {
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
				`UPDATE services
				 SET name = ?, description = ?, price_cents = ?, duration_minutes = ?,
				     sort_order = ?, barber_id = ?, updated_at = datetime('now')
				 WHERE id = ?`
			)
			.bind(
				name,
				description || null,
				price_cents,
				duration_minutes ? Number(duration_minutes) : null,
				sort_order ? Number(sort_order) : 0,
				barber_id && barber_id !== '' ? Number(barber_id) : null,
				params.id
			)
			.run();

		redirect(303, '/admin/services');
	},

	delete: async ({ params, platform }) => {
		const db = platform?.env?.DB;
		if (!db) {
			return fail(500, { error: 'Server error. Please try again.' });
		}

		await db.prepare('DELETE FROM services WHERE id = ?').bind(params.id).run();
		redirect(303, '/admin/services');
	}
};
