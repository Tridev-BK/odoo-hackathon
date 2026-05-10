CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');
CREATE TYPE activity_category AS ENUM ('FOOD', 'CULTURE', 'ADVENTURE', 'NATURE', 'SHOPPING', 'NIGHTLIFE', 'WELLNESS', 'TRANSPORT', 'OTHER');
CREATE TYPE packing_category AS ENUM ('CLOTHING', 'DOCUMENTS', 'TOILETRIES', 'TECH', 'HEALTH', 'MISC');

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'USER',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE trips (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  cover_image_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  share_slug TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  latitude NUMERIC(9, 6),
  longitude NUMERIC(9, 6),
  cost_index INTEGER NOT NULL DEFAULT 50,
  popularity_score INTEGER NOT NULL DEFAULT 50,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT cities_name_country_unique UNIQUE (name, country)
);

CREATE TABLE trip_stops (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  city_id TEXT NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE activities (
  id TEXT PRIMARY KEY,
  city_id TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category activity_category NOT NULL DEFAULT 'OTHER',
  estimated_cost NUMERIC(10, 2) NOT NULL DEFAULT 0,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  image_url TEXT,
  popularity_score INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE trip_activities (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  activity_id TEXT NOT NULL REFERENCES activities(id) ON DELETE RESTRICT,
  scheduled_at TIMESTAMPTZ,
  custom_cost NUMERIC(10, 2),
  position INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE packing_items (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  category packing_category NOT NULL DEFAULT 'MISC',
  is_packed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  body TEXT NOT NULL,
  day_date TIMESTAMPTZ,
  reminder TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX trips_user_updated_idx ON trips(user_id, updated_at);
CREATE INDEX trips_public_share_idx ON trips(is_public, share_slug);
CREATE INDEX cities_country_idx ON cities(country);
CREATE INDEX cities_popularity_idx ON cities(popularity_score);
CREATE INDEX trip_stops_trip_position_idx ON trip_stops(trip_id, position);
CREATE INDEX trip_stops_city_idx ON trip_stops(city_id);
CREATE INDEX activities_city_category_idx ON activities(city_id, category);
CREATE INDEX activities_popularity_idx ON activities(popularity_score);
CREATE INDEX trip_activities_trip_scheduled_idx ON trip_activities(trip_id, scheduled_at);
CREATE INDEX trip_activities_activity_idx ON trip_activities(activity_id);
CREATE INDEX packing_items_trip_category_idx ON packing_items(trip_id, category);
CREATE INDEX packing_items_trip_packed_idx ON packing_items(trip_id, is_packed);
CREATE INDEX notes_trip_day_idx ON notes(trip_id, day_date);
CREATE INDEX notes_user_created_idx ON notes(user_id, created_at);
