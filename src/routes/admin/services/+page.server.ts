import type { PageServerLoad } from './$types';
import type { ServiceWithBarber } from '$lib/types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) {
		return { services: [] };
	}

	const result = await db
		.prepare(
			`SELECT services.*, barbers.name AS barber_name
			 FROM services
			 LEFT JOIN barbers ON services.barber_id = barbers.id
			 ORDER BY services.sort_order ASC`
		)
		.all<ServiceWithBarber>();

	return { services: result.results };
};
