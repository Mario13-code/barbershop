const ITERATIONS = 100_000;

async function deriveKey(password: string, salt: Uint8Array): Promise<ArrayBuffer> {
	const encoder = new TextEncoder();
	const passwordKey = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		'PBKDF2',
		false,
		['deriveBits']
	);

	return crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			salt,
			iterations: ITERATIONS,
			hash: 'SHA-256'
		},
		passwordKey,
		256
	);
}

function toHex(buffer: ArrayBuffer | Uint8Array): string {
	const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
	return Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

function fromHex(hex: string): Uint8Array {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
	}
	return bytes;
}

export async function hashPassword(password: string): Promise<string> {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const derivedBits = await deriveKey(password, salt);
	return `${toHex(salt)}:${toHex(derivedBits)}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
	const [saltHex, hashHex] = storedHash.split(':');
	const salt = fromHex(saltHex);
	const derivedBits = await deriveKey(password, salt);
	return toHex(derivedBits) === hashHex;
}

export function generateSessionId(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(32));
	return toHex(bytes);
}

export async function createSession(db: D1Database, userId: number): Promise<string> {
	const sessionId = generateSessionId();
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

	await db
		.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)')
		.bind(sessionId, userId, expiresAt.toISOString())
		.run();

	return sessionId;
}

export async function validateSession(db: D1Database, sessionId: string): Promise<number | null> {
	const session = await db
		.prepare('SELECT user_id, expires_at FROM sessions WHERE id = ?')
		.bind(sessionId)
		.first<{ user_id: number; expires_at: string }>();

	if (!session) return null;
	if (new Date(session.expires_at) < new Date()) {
		await db.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
		return null;
	}

	return session.user_id;
}
