import type { PageServerLoad } from './$types';
import type { Barber } from '$lib/types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;

	if (!db) {
		return { barbers: [] };
	}

	const result = await db.prepare('SELECT * FROM barbers ORDER BY sort_order ASC').all<Barber>();

	return {
		barbers: result.results
	};
};
