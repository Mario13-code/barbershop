import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Barber } from '$lib/types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const db = platform?.env?.DB;
	if (!db) {
		error(500, 'Server error.');
	}

	const barber = await db
		.prepare('SELECT * FROM barbers WHERE id = ?')
		.bind(params.id)
		.first<Barber>();

	if (!barber) {
		error(404, 'Barber not found.');
	}

	return { barber };
};

export const actions: Actions = {
	update: async ({ request, params, platform }) => {
		const db = platform?.env?.DB;
		if (!db) {
			return fail(500, { error: 'Server error. Please try again.' });
		}

		const formData = await request.formData();
		const name = formData.get('name');
		const bio = formData.get('bio');
		const photo_url = formData.get('photo_url');
		const specialty = formData.get('specialty');
		const years_experience = formData.get('years_experience');
		const instagram_url = formData.get('instagram_url');
		const booksy_url = formData.get('booksy_url');
		const sort_order = formData.get('sort_order');

		if (typeof name !== 'string' || name.trim() === '') {
			return fail(400, { error: 'Name is required.' });
		}

		await db
			.prepare(
				`UPDATE barbers
				 SET name = ?, bio = ?, photo_url = ?, specialty = ?, years_experience = ?,
				     instagram_url = ?, booksy_url = ?, sort_order = ?, updated_at = datetime('now')
				 WHERE id = ?`
			)
			.bind(
				name,
				bio || null,
				photo_url || null,
				specialty || null,
				years_experience ? Number(years_experience) : null,
				instagram_url || null,
				booksy_url || null,
				sort_order ? Number(sort_order) : 0,
				params.id
			)
			.run();

		redirect(303, '/admin/barbers');
	},

	delete: async ({ params, platform }) => {
		const db = platform?.env?.DB;
		if (!db) {
			return fail(500, { error: 'Server error. Please try again.' });
		}

		await db.prepare('DELETE FROM barbers WHERE id = ?').bind(params.id).run();

		redirect(303, '/admin/barbers');
	}
};
