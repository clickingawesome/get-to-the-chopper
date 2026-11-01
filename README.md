# Get to the Chopper — promo site

Promotional website for the cookbook **Get to the Chopper** by Nick Irmo:
116 no-cook chopped recipes made with a knife, a board and a bowl. The book is
coming soon on Amazon (KDP); the site has no buy link yet, just a
"Coming soon on Amazon" badge.

Built with Next.js (App Router, TypeScript, Tailwind v4), exported as a fully
static site (`output: 'export'`) for Netlify.

## Pages

- `/` — hero, "what is a chop" explainer, chapter tiles, featured recipes, lifestyle stills, author blurb
- `/recipes/` — all 116 recipe titles by chapter, 30 featured with photos
- `/recipes/<slug>/` — 30 full recipe pages (lineup, steps, the move, extras, JSON-LD)
- `/chapters/` — the ten chapters with opener art
- `/sitemap.xml`, `/robots.txt`

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npx serve out      # preview the export
```

Fonts (Anton, Nunito Sans, Patrick Hand, Stardos Stencil) are bundled from
`@fontsource` packages, so the build needs no access to Google Fonts.

## Deploy to Netlify

1. Push this folder to a GitHub repo.
2. In Netlify, "Add new site" → import the repo. `netlify.toml` already sets
   the build command (`npm run build`) and publish directory (`out`).
3. Set the environment variable `NEXT_PUBLIC_SITE_URL` to the final URL
   (e.g. `https://gettothechopper.com`) so the sitemap, robots and Open Graph
   tags use the right domain. Until then a placeholder Netlify URL is used.

## Updating content and images

Recipe data and web images are generated from the book source
(`/home/claude/book` by default; override with `BOOK_DIR=...`):

```bash
python3 scripts/prepare_assets.py
```

It writes `data/site.json` and the resized JPEGs in `public/img/` (max 1200 px,
480 px thumbs, ~7 MB total). Which recipes are featured is the `FEATURED`
dict at the top of that script. Chapters 8 and 9 (salsas, dressings) are
listed by title only because their recipe text is not final yet.

## Notes

- No film references, no QR codes, no real faces anywhere on the site.
- Favicon and mascot are crops of the cartoon helicopter.
- The cover shown is `cover-01` with the placeholder title lines cleaned off and the title set in type over it.

`scripts/screenshot.js` is a dev-only helper (needs `playwright` installed
globally) that serves `out/` and captures mobile and desktop screenshots.
