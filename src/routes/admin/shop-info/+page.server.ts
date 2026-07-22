import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { ShopInfo } from '$lib/types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;
	if (!db) {
		error(500, 'Server error.');
	}

	const shopInfo = await db.prepare('SELECT * FROM shop_info WHERE id = 1').first<ShopInfo>();

	return { shopInfo };
};

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const db = platform?.env?.DB;
		if (!db) {
			return fail(500, { error: 'Server error. Please try again.' });
		}

		const formData = await request.formData();
		const shop_name = formData.get('shop_name');
		const address = formData.get('address');
		const phone = formData.get('phone');
		const booksy_url = formData.get('booksy_url');
		const hours_json = formData.get('hours_json');

		if (typeof shop_name !== 'string' || shop_name.trim() === '') {
			return fail(400, { error: 'Shop name is required.' });
		}

		await db
			.prepare(
				`INSERT INTO shop_info (id, shop_name, address, phone, booksy_url, hours_json)
				 VALUES (1, ?, ?, ?, ?, ?)
				 ON CONFLICT(id) DO UPDATE SET
				   shop_name = excluded.shop_name,
				   address = excluded.address,
				   phone = excluded.phone,
				   booksy_url = excluded.booksy_url,
				   hours_json = excluded.hours_json`
			)
			.bind(
				shop_name,
				address || null,
				phone || null,
				booksy_url || null,
				typeof hours_json === 'string' ? hours_json : null
			)
			.run();

		redirect(303, '/admin/shop-info');
	}
};
