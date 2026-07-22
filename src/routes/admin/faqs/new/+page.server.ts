import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform }) => {
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
			.prepare('INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)')
			.bind(question, answer, sort_order ? Number(sort_order) : 0)
			.run();

		redirect(303, '/admin/faqs');
	}
};
