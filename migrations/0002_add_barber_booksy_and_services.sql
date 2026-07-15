-- Migration number: 0002 	 2026-07-15T18:37:14.244Z
ALTER TABLE barbers ADD COLUMN booksy_url TEXT;
ALTER TABLE services ADD COLUMN barber_id INTEGER REFERENCES barbers(id);