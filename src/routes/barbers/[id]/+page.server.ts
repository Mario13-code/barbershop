import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Barber, Service } from '$lib/types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const db = platform?.env?.DB;
	if (!db) {
		error(500, 'Server error.');
	}

	const barber = await db
		.prepare('SELECT * FROM barbers WHERE id = ?')
		.bind(params.id)
		.first<Barber>();

	if (!barber) {
		error(404, 'Barber not found.');
	}

	const servicesResult = await db
		.prepare('SELECT * FROM services WHERE barber_id = ? ORDER BY sort_order ASC')
		.bind(params.id)
		.all<Service>();

	return {
		barber,
		services: servicesResult.results
	};
};
