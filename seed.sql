DELETE FROM barbers;
DELETE FROM services;
DELETE FROM shop_info;

INSERT INTO barbers (name, bio, specialty, sort_order) VALUES
  ('Jamal', 'Fades specialist with 8 years of experience.', 'Fades & Tapers', 0),
  ('Marcus', 'Old-school barber known for precision beard work.', 'Beard Grooming', 1),
  ('Tony', 'Specializes in classic cuts and hot towel shaves.', 'Classic Cuts', 2);

INSERT INTO services (name, description, price_cents, duration_minutes, sort_order) VALUES
  ('Haircut', 'Classic haircut, tailored to your style.', 3000, 30, 0),
  ('Beard Trim', 'Precision beard shaping and lineup.', 1500, 15, 1),
  ('Haircut + Beard', 'Full haircut and beard trim combo.', 4000, 45, 2),
  ('Hot Towel Shave', 'Traditional straight razor hot towel shave.', 2500, 30, 3);

INSERT INTO services (name, description, price_cents, duration_minutes, sort_order, barber_id) VALUES
  ('Premium Fade + Design', 'Custom design fade, appointment only with Jamal.', 6000, 60, 4,
    (SELECT id FROM barbers WHERE name = 'Jamal'));

INSERT INTO shop_info (id, shop_name, booksy_url) VALUES
  (1, 'Ascension Dynasty Barber Shop', 'https://booksy.com/en-us/114918_ascension-dynasty_barber-shop_14795_tucson');