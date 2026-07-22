import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform }) => {
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
			.prepare('INSERT INTO testimonials (client_name, quote, sort_order) VALUES (?, ?, ?)')
			.bind(client_name, quote, sort_order ? Number(sort_order) : 0)
			.run();

		redirect(303, '/admin/testimonials');
	}
};
