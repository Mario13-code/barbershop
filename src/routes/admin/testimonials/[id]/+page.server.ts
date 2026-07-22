import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Testimonial } from '$lib/types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const db = platform?.env?.DB;
	if (!db) error(500, 'Server error.');

	const testimonial = await db
		.prepare('SELECT * FROM testimonials WHERE id = ?')
		.bind(params.id)
		.first<Testimonial>();
	if (!testimonial) error(404, 'Testimonial not found.');

	return { testimonial };
};

export const actions: Actions = {
	update: async ({ request, params, platform }) => {
		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'Server error. Please try again.' });

		const formData = await request.formData();
		const client_name = formData.get('client_name');
		const quote = formData.get('quote');
		const sort_order = formData.get('sort_order');

		if (typeof client_name !== 'string' || client_name.trim() === '') {
			return fail(400, { error: 'Client name is required.' });
		}
		if (typeof quote !== 'string' || quote.trim() === '') {
			return fail(400, { error: 'Quote is required.' });
		}

		await db
			.prepare(
				`UPDATE testimonials SET client_name = ?, quote = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
			)
			.bind(client_name, quote, sort_order ? Number(sort_order) : 0, params.id)
			.run();

		redirect(303, '/admin/testimonials');
	},

	delete: async ({ params, platform }) => {
		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'Server error. Please try again.' });

		await db.prepare('DELETE FROM testimonials WHERE id = ?').bind(params.id).run();
		redirect(303, '/admin/testimonials');
	}
};
