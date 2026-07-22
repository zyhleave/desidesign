# desidesign.me

Personal website built with Next.js 15 + Supabase (Google OAuth).

## Getting Started

```bash
cp .env.example .env.local  # copy env template first
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

See [`.env.example`](./.env.example) for all required vars:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (publishable) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (→ OAuth redirect) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (optional) |

> **⚠️ The Supabase Site URL must match `NEXT_PUBLIC_SITE_URL`** — otherwise Google OAuth redirects to `localhost`. Set it in Supabase Dashboard → Authentication → URL Configuration.

## Deployment

Deployed on [Vercel](https://vercel.com).

### Vercel Environment Variables (required)

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL from Project Settings → API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon key (use the new `sb_publishable_...` format)
- `NEXT_PUBLIC_SITE_URL` → `https://desidesign.me`
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (server-only)

### Supabase configuration

1. **Authentication → URL Configuration**: Site URL = `https://desidesign.me`
2. **Authentication → Providers → Google**: Enable and fill Client ID / Secret from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
3. **Google Cloud Console**: Add redirect URI: `https://csvlqtrzmscrumeyvqip.supabase.co/auth/v1/callback`

### Troubleshooting

If login redirects to `localhost`:
1. ✅ Verify `NEXT_PUBLIC_SITE_URL` is set in Vercel
2. ✅ Verify Supabase **Site URL** matches (Authentication → URL Configuration)
3. ✅ Verify Google Cloud redirect URI includes the Supabase callback URL

If health check (`/api/check-supabase`) returns `TypeError: fetch failed`:
1. ✅ Verify `NEXT_PUBLIC_SUPABASE_URL` is correct in Vercel
2. ✅ Verify the URL in Supabase Dashboard (Settings → API → Project URL)

## Health Check

```
GET /api/check-supabase
```

Returns connectivity status for Supabase, Google, and GitHub. Useful after deployment.
