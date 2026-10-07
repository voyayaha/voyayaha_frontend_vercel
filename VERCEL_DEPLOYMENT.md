# Voyayaha — Vercel deployment

This package is prepared for Vercel instead of Cloudflare Workers. The browser uses same-origin `/api/*` routes. TanStack Start + Nitro turns those server routes into Vercel Functions.

## 1. Vercel project

Import the `voyayaha_frontend_stable` folder/repository into Vercel. If you upload the outer ZIP, set **Root Directory** to `voyayaha_frontend_stable`.

Use:

- Framework Preset: **TanStack Start**
- Node.js: **22.x**
- Install Command: **npm ci**
- Build Command: **npm run build**
- Do not use Bun.
- Do not add `SKIP_DEPENDENCY_INSTALL=1`.

`vercel.json` already declares the TanStack Start framework and npm build settings.

## 2. Environment variable

In Vercel → Project → Settings → Environment Variables, add for **Production** (and Preview if desired):

```text
TRAVEL_API_BASE_URL=https://voyayaha-backend-stable.onrender.com
```

This is intentionally **not** prefixed with `VITE_`: it is a server-side value used by the Vercel Functions. The code keeps a VITE fallback for local compatibility.

You do not need `VITE_TRAVEL_API_BASE_URL` for Vercel production if `TRAVEL_API_BASE_URL` is set.

## 3. API proxy conversion

These TanStack Start server routes are included and are deployed through Nitro as Vercel Functions:

- `/api/social-discovery`
- `/api/hidden-experiences`
- `/api/social-hidden`
- `/api/travel-memories`
- `/api/travel-memory`
- `/api/travel-intel`
- `/api/village-experiences`
- `/api/itinerary`

The browser calls `/api/...` on the Vercel domain. The Vercel Function then calls `https://voyayaha-backend-stable.onrender.com` server-to-server. This avoids browser-to-Render CORS for these calls.

## 4. Deploy

With Git connected, click **Deploy** in Vercel. Vercel will install with npm, run `npm run build`, and deploy the Nitro server output as Vercel Functions.

If deploying from a terminal instead, use:

```text
npm install
npm run build
npx vercel
```

Do not run `wrangler deploy`; that is for the old Cloudflare Workers deployment.

## 5. Test before changing Wix DNS

First test the Vercel deployment URL. Check:

1. Home page
2. Hidden Places
3. Travel Memories
4. Travel Memory submission
5. Village Tourism / Travel Intel if used

Open browser DevTools → Network. API calls should go to the Vercel domain, for example:

```text
https://YOUR-PROJECT.vercel.app/api/social-discovery?...
https://YOUR-PROJECT.vercel.app/api/travel-memories?per_page=100
```

They should **not** be direct browser calls to `voyayaha-backend-stable.onrender.com`.

## 6. Connect voyayaha.com

After the Vercel deployment works:

1. Vercel → Project → Settings → Domains
2. Add `voyayaha.com`
3. Also add `www.voyayaha.com` if you want the www hostname.
4. Vercel will show the DNS record(s) required.
5. Add those records in Wix DNS.
6. Do **not** change Wix nameservers.

Keep existing Wix MX/TXT records unless Vercel explicitly asks for a change to the website A/CNAME record.
