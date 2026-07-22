export interface Barber {
	id: number;
	name: string;
	bio: string | null;
	photo_url: string | null;
	specialty: string | null;
	sort_order: number;
	created_at: string;
	updated_at: string;
	booksy_url: string | null;
	years_experience: number | null;
	instagram_url: string | null;
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
	barber_id: number | null;
}

export interface ServiceWithBarber extends Service {
	barber_name: string | null;
}

export interface ShopInfo {
	id: number;
	shop_name: string;
	address: string | null;
	phone: string | null;
	booksy_url: string | null;
	hours_json: string | null;
	about_text: string | null;
}
