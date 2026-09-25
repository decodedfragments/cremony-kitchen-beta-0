# Hosting Cérémony Kitchen

The site is a Next.js app + PostgreSQL. It seeds its own catalogue the first time
it connects to an empty database, so a fresh deploy needs **no manual data setup**.

## Option 1 — Vercel + Neon (recommended: free, best for Next.js)

1. **Push the repo to GitHub** (`.gitignore` already excludes `.env`).
2. **Create a free Postgres** at [neon.tech](https://neon.tech) (or supabase.com) — copy the connection string.
3. **Import the repo at [vercel.com/new](https://vercel.com/new)** — Vercel detects Next.js automatically.
4. Add one environment variable in the project settings:
   - `DATABASE_URL` = your Neon connection string (append `?sslmode=require` if the pool complains about SSL).
5. Deploy. First request auto-seeds the 58 products (~1–2s).
6. Share the `https://<project>.vercel.app` URL with your client.
7. Optional: add a real domain (free on Vercel) inside Project → Domains.

Cost: **$0** on Vercel Hobby + Neon Free tier. Update: edit content in the DB or
`src/db/catalog.json` and redeploy (push to GitHub redeploys automatically).

## Option 2 — Render (free, no GitHub required)

1. New → Web Service → connect the repo (or upload).
2. Build command: `npm install && npm run build` · Start command: `npm start`.
3. Add env var `DATABASE_URL` from Render's free Postgres (or Neon).
4. Share the `onrender.com` URL.

Note: free instances sleep after inactivity (~50s cold start on first visit).

## Option 3 — Send the live preview link right now

The Arena preview URL from this session is publicly viewable — fine for a quick
look, but it's temporary. Use Option 1 or 2 for a durable client link.

## Before going live (real store)

- Product images hot-link Shopify's CDN — **download and self-host them** before cancelling Shopify.
- Online payments aren't wired up: orders save to the DB and the team confirms payment
  by phone/WhatsApp. Add Razorpay/Stripe checkout when ready.
