-- Migration number: 0004 	 2026-07-19T22:07:15.000Z
ALTER TABLE barbers ADD COLUMN years_experience INTEGER;
ALTER TABLE barbers ADD COLUMN instagram_url TEXT;