import type { PageServerLoad } from './$types';
import type { Testimonial } from '$lib/types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) return { testimonials: [] };

	const result = await db
		.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC')
		.all<Testimonial>();
	return { testimonials: result.results };
};
