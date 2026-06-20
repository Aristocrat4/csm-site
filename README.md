# Gala D. — Customer Success Manager landing page

A fast, static, single-page site to land a first Customer Success Manager role.
Built with Next.js (App Router) + TypeScript + Tailwind v4, designed for Google
Ads traffic from English-speaking countries.

Public display name is **“Gala D.”** — the full name appears on the downloadable
CV only. No LinkedIn link is shown (by design).

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run cv       # regenerate the CV PDF into /public
```

## Configuration

Copy `.env.example` to `.env.local` and fill in what you have. **Everything is
optional** — the site builds and runs without any of it, and each integration
stays dormant until configured.

| Variable | What it does | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (set to the real domain before ads) | your domain |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Makes the contact form deliver to your inbox | [web3forms.com](https://web3forms.com) (free) |
| `NEXT_PUBLIC_CALENDLY_URL` | “Book a call” buttons open your scheduler | [calendly.com](https://calendly.com) (free) |
| `NEXT_PUBLIC_VIDEO_ID` + `NEXT_PUBLIC_VIDEO_HOST` | Loads your 60-sec intro (host = `youtube` or `vimeo`) | the video URL |
| `NEXT_PUBLIC_GA_ID` | Enables GA4 + shows the cookie banner | Google Analytics |
| `NEXT_PUBLIC_ADS_CONVERSION_ID` + `NEXT_PUBLIC_ADS_CONVERSION_LABEL` | Fires a Google Ads conversion on form submit / booking | Google Ads |

Graceful fallbacks when unset:

- **No Web3Forms key** → the form validates and, on submit, tells the visitor to
  email you directly.
- **No Calendly URL** → “Book a call” scrolls to the contact section instead.
- **No video ID** → a branded “Intro video — coming soon” poster shows.
- **No GA ID** → no cookies are set, so **no cookie banner appears** (correct —
  nothing to consent to).

## Assets to provide

- [ ] **Headshot** → save as `public/headshot.jpg` (~800×800, square). It is
      auto-detected; until then a “GD” monogram placeholder shows in the hero.
- [ ] **Intro video** → record ~60s (script in the project plan), upload, set
      `NEXT_PUBLIC_VIDEO_ID`.
- [ ] **Calendly URL**, **Web3Forms key**, **GA4 / Ads IDs** → see the table above.
- [ ] **Custom domain** → attach in Vercel **before** running ads.
- [ ] **CV gaps** → edit `scripts/generate-cv.mjs` to fill the `[bracketed]`
      placeholders (current role + dates, TBC dates, education/certifications,
      extra languages), then run `npm run cv`.

## Deploy

1. Push to a Git repo and import into [Vercel](https://vercel.com) (zero config).
2. Add the env vars in the Vercel dashboard.
3. Attach the custom domain, then set up the Google Ads campaign pointing at it.

## Structure

```
app/            routes, metadata, robots/sitemap/manifest, icons, OG image
components/     header, footer, homepage sections, contact form, consent
lib/            site config (env), shared UI classes, analytics helper
scripts/        generate-cv.mjs (builds the CV PDF)
public/         CV PDF, headshot.jpg (you add)
```

Design tokens (cool paper + cool ink + deep-emerald accent) and fonts
(Source Serif 4 headings + Inter body) live in `app/globals.css`.
