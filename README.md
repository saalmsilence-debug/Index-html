# BookPesa (Offline-first PWA)

## Quick start
1. Copy `public/` files to your static host (Netlify / GitHub Pages).
2. Serve the site on HTTPS (Netlify does this by default) for PWA install support.
3. Optional: create a Supabase project and database tables (see instructions below) to enable cloud sync.

## Supabase setup (optional)
- Create project at https://app.supabase.com
- In SQL editor, create tables:

CREATE TABLE transactions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  local_id TEXT UNIQUE,
  date TEXT,
  type TEXT,
  amount NUMERIC,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE debts (...)
CREATE TABLE inventory (...)

- For quick testing, you can disable Row Level Security (RLS) and allow anonymous inserts via anon key.
- For production, secure with RLS policies and users.

## Notes
- App defaults to offline-first using IndexedDB (Dexie).
- Export JSON/CSV regularly to backup.
- Brand: Deep Teal (#0F766E), Icon text: BP, rounded-square icon style.
