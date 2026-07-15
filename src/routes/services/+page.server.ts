import type { PageServerLoad } from './$types';
import type { Service } from '$lib/types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;

	if (!db) {
		return { services: [] };
	}

	const result = await db.prepare('SELECT * FROM services ORDER BY sort_order ASC').all<Service>();

	return {
		services: result.results
	};
};
