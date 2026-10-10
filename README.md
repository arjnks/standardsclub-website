# VIT Standards Club Website

The website for the VIT Standards Club, built with Next.js, React, TypeScript, and Tailwind CSS. The repository includes local website data and Supabase integration for event and team-member records.

- **Source code:** https://github.com/arjnks/standardsclub-website
- **Live site:** https://standardsclub-website.vercel.app

## Tech stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- Supabase JavaScript client
- ESLint

## Project structure

- `src/app/` — Next.js application routes and layouts
- `src/components/` — reusable UI components
- `src/data/websiteData.json` — local website content and structured data
- `src/lib/` — shared application utilities
- `sync.js` — script that copies local team and event data to Supabase

Check the current source tree before relying on this overview if the project structure changes.

## Run locally

### Requirements

- Node.js compatible with the version of Next.js in `package.json`
- npm

### Setup

```bash
git clone https://github.com/arjnks/standardsclub-website.git
cd standardsclub-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The data-management scripts expect a `.env.local` file in the repository root. Configure the Supabase project URL and anon/publishable key required by your setup:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit `.env.local`, credentials, service-role keys, or other secrets. A key prefixed with `NEXT_PUBLIC_` is exposed to browser code if referenced by client-side code. Configure appropriate Row Level Security (RLS) policies in Supabase.

## Available commands

```bash
npm run dev    # Start the local development server
npm run build  # Build for production
npm run start  # Start the production server
npm run lint   # Run ESLint
```

## Important: review `sync.js` before running it

The current `sync.js` implementation deletes existing rows from the Supabase `team_members` and `events` tables before inserting replacement data from `src/data/websiteData.json`.

**Do not run this script against production until you have verified the target Supabase project, backed up the affected tables, and reviewed the deletion and insertion behavior.** The script currently logs insert errors but can still print `Sync Complete!`, so that message should not be treated as proof that every record was synchronized successfully.

Before making this workflow production-safe, confirm the database schema and unique constraints. Prefer a transaction or an idempotent upsert strategy with explicit error handling and a preview/dry-run option. Do not replace the delete-and-reinsert logic with an assumed upsert key until the table constraints have been checked.

## Deployment

The project has been associated with Vercel. Confirm the current Vercel project settings and connected branch before relying on automatic deployments.

## Contributing

1. Create a branch for your change.
2. Install dependencies with `npm install`.
3. Run `npm run lint` and `npm run build`.
4. Open a pull request describing the change and its testing.
