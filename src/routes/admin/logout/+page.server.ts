import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, platform }) => {
		const db = platform?.env?.DB;
		const sessionId = cookies.get('session');

		if (sessionId && db) {
			await db.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
		}

		cookies.delete('session', { path: '/' });
		redirect(303, '/admin/login');
	}
};
