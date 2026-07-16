import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { validateSession } from '$lib/server/auth';

export const load: LayoutServerLoad = async ({ cookies, platform, url }) => {
	const db = platform?.env?.DB;
	const sessionId = cookies.get('session');
	const isLoginPage = url.pathname === '/admin/login';

	const userId = sessionId && db ? await validateSession(db, sessionId) : null;

	if (!userId && !isLoginPage) {
		redirect(303, '/admin/login');
	}

	if (userId && isLoginPage) {
		redirect(303, '/admin');
	}

	return {};
};
