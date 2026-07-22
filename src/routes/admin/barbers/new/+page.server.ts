import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform }) => {
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
				`INSERT INTO barbers (name, bio, photo_url, specialty, years_experience, instagram_url, booksy_url, sort_order)
				 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
			)
			.bind(
				name,
				bio || null,
				photo_url || null,
				specialty || null,
				years_experience ? Number(years_experience) : null,
				instagram_url || null,
				booksy_url || null,
				sort_order ? Number(sort_order) : 0
			)
			.run();

		redirect(303, '/admin/barbers');
	}
};
