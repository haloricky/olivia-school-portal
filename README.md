# 🌸 Olivia's School Portal

A soft, pastel, Duolingo-inspired home-education tracker for Olivia. Papa logs lessons; Olivia sees her progress, a memory wall, and her star total.

Built with **React + Vite + Tailwind CSS + Supabase**.

---

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase URL + anon key
npm run dev
```

## Supabase setup

Run this in the Supabase SQL editor for your project:

```sql
CREATE TABLE lessons (
  id uuid default gen_random_uuid() primary key,
  week int not null,
  month int not null,
  subject text not null,
  topic text not null,
  logged_at timestamptz default now(),
  notes text,
  mood text,
  stars int default 1
);

CREATE TABLE quiz_scores (
  id uuid default gen_random_uuid() primary key,
  subject text not null,
  score int not null,
  total int not null,
  played_at timestamptz default now()
);
```

You will also need to grant the `anon` role insert/select/delete on these tables, or relax RLS for now (single-user, family use).

## Environment variables

| Var | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | The anon/public API key |

## Deploy

Connect the GitHub repo to Vercel. `vercel.json` already handles SPA fallback routing.

## App layout

- **Home** — two big chunky buttons: 👨 Papa / ⭐ Olivia
- **Papa**
  - Log a Lesson (auto-suggests next unlogged topic per subject)
  - Progress (per-subject bars + full list with delete)
- **Olivia**
  - My Map (7 subject cards, expandable)
  - Memory Wall (color-coded lesson cards)
  - My Stars (animated star total)
