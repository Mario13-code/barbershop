import type { PageServerLoad } from './$types';
import type { Faq } from '$lib/types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) return { faqs: [] };

	const result = await db.prepare('SELECT * FROM faqs ORDER BY sort_order ASC').all<Faq>();
	return { faqs: result.results };
};
