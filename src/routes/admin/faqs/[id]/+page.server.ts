import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Faq } from '$lib/types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const db = platform?.env?.DB;
	if (!db) error(500, 'Server error.');

	const faq = await db.prepare('SELECT * FROM faqs WHERE id = ?').bind(params.id).first<Faq>();
	if (!faq) error(404, 'FAQ not found.');

	return { faq };
};

export const actions: Actions = {
	update: async ({ request, params, platform }) => {
		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'Server error. Please try again.' });

		const formData = await request.formData();
		const question = formData.get('question');
		const answer = formData.get('answer');
		const sort_order = formData.get('sort_order');

		if (typeof question !== 'string' || question.trim() === '') {
			return fail(400, { error: 'Question is required.' });
		}
		if (typeof answer !== 'string' || answer.trim() === '') {
			return fail(400, { error: 'Answer is required.' });
		}

		await db
			.prepare(
				`UPDATE faqs SET question = ?, answer = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
			)
			.bind(question, answer, sort_order ? Number(sort_order) : 0, params.id)
			.run();

		redirect(303, '/admin/faqs');
	},

	delete: async ({ params, platform }) => {
		const db = platform?.env?.DB;
		if (!db) return fail(500, { error: 'Server error. Please try again.' });

		await db.prepare('DELETE FROM faqs WHERE id = ?').bind(params.id).run();
		redirect(303, '/admin/faqs');
	}
};
