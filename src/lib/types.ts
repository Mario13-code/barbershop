export interface Barber {
	id: number;
	name: string;
	bio: string | null;
	photo_url: string | null;
	specialty: string | null;
	sort_order: number;
	created_at: string;
	updated_at: string;
}

export interface Service {
	id: number;
	name: string;
	description: string | null;
	price_cents: number;
	duration_minutes: number | null;
	sort_order: number;
	created_at: string;
	updated_at: string;
}
