import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { verifyPassword, createSession } from '$lib/server/auth';

export const actions: Actions = {
	default: async ({ request, platform, cookies }) => {
		const db = platform?.env?.DB;
		if (!db) {
			return fail(500, { error: 'Server error. Please try again.' });
		}

		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, { error: 'Invalid email or password.' });
		}

		const user = await db
			.prepare('SELECT id, password_hash FROM admin_users WHERE email = ?')
			.bind(email)
			.first<{ id: number; password_hash: string }>();

		if (!user) {
			return fail(400, { error: 'Invalid email or password.' });
		}

		const isValid = await verifyPassword(password, user.password_hash);

		if (!isValid) {
			return fail(400, { error: 'Invalid email or password.' });
		}

		const sessionId = await createSession(db, user.id);

		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 7 days, matching our session expiration
		});

		redirect(303, '/admin');
	}
};
