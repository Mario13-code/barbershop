import type { LayoutServerLoad } from './$types';
import type { ShopInfo } from '$lib/types';

export const load: LayoutServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;

	if (!db) {
		return { shopInfo: null };
	}

	const shopInfo = await db.prepare('SELECT * FROM shop_info WHERE id = 1').first<ShopInfo>();

	return { shopInfo };
};
