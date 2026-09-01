# VIP Salons — Landing Page

A premium, mobile-first landing page for **VIP Salons** (Multi Award-Winning
Salons). Visitors choose their nearest salon location to receive the correct,
verified booking links, or call the salon when online booking is unavailable.

Built with **Vite + React + TypeScript**. Static, no backend, no analytics
provider. Deployable to Vercel, Netlify or Cloudflare Pages.

---

## Getting started

Prerequisites: Node.js 18+ and npm.

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
```

## Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Start the Vite dev server                        |
| `npm run build`    | Type-check + create a production build in `dist` |
| `npm run preview`  | Preview the production build locally             |
| `npm run images`   | Regenerate optimized images from source files    |
| `npm run lint`     | Run ESLint                                       |
| `npm run format`   | Format source files with Prettier                |
| `npm run typecheck`| Run the TypeScript type checker                  |
| `npm test`         | Run the Vitest test suite                        |

## Where the business information lives

All editable business and location data is in a single file:

```
src/data/locations.ts
```

- `business` — name, tagline, telephone (and `tel:` URI), payment message.
- `locations` — the six salon locations and their booking options.

There is nothing to edit outside this file for day-to-day updates unless you
are changing visuals or copy.

## How to add or replace a booking URL

In `src/data/locations.ts`, edit the `bookingOptions` array for a location.
Each option is `{ label, url }`.

- **Duke Street** currently has two options (Booksy + Treatwell) because the
  client has not yet confirmed a preferred provider.
- A location with an **empty `bookingOptions` array** renders “Online booking
  coming soon” plus a “Call to book” button (`tel:+447477535775`). It will
  never link to another salon’s booking page.

To enable booking for Marbella, Hillfoot Business Hub, or Sword Street Head
SPA, add a verified `{ label, url }` entry to that location.

## How to replace images

1. Place new/updated source images (do not modify the originals) and update
   the `ASSETS` map in `scripts/img.mjs` with the source filename, target
   path under `public/images/<category>/`, and desired widths/formats.
2. Run `npm run images`. This rebuilds WebP/JPEG (and AVIF for the hero)
   responsive files into `public/images/` and regenerates `public/favicon.png`.
   Source files in `~/Downloads` are never modified.
3. Update the `<img>`/`<picture>` references in the relevant component under
   `src/components/`.

Image categories: `brand/`, `hair/`, `salons/`, `spa/`.

## Locations still missing booking links

These locations have no verified online booking URL yet, so they show
“Online booking coming soon” + a call button:

- **Marbella**
- **Hillfoot Business Hub**
- **Sword Street Head SPA**

## Excluded image (pending consent)

The image `495864789_1253604760108189...n.jpg` shows identifiable
skincare-treatment progress and is **intentionally excluded** from the site.
Publish it only after the client grants explicit consent for website use.

## Analytics

No analytics provider is installed. The markup exposes provider-neutral hooks:

```html
data-event="location_selected" data-location="duke-street"
data-event="booking_clicked"  data-location="duke-street" data-booking-provider="booksy"
data-event="telephone_clicked" data-location="..." data-context="..."
```

Wire these up to your analytics provider later if required.

## Deploying

The project is a static Vite build. Output lands in `dist/`.

**Vercel:** Import the repo → framework preset “Vite” → build command
`npm run build` → output `dist`.

**Netlify:** Build command `npm run build`, publish directory `dist`.

**Cloudflare Pages:** Build command `npm run build`, output directory `dist`.

### Canonical URL, OG images and sitemap

- A `canonical` link placeholder is documented in `index.html`. Set it to the
  production domain before launch.
- `public/robots.txt` is included.
- `public/sitemap.xml` is **not** shipped because no production domain has
  been confirmed. Once a domain is known, add:

  ```xml
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://YOUR-DOMAIN/</loc>
      <lastmod>2026-01-01</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>
  ```

  to `public/sitemap.xml`.

## URL behaviour

Locations can be preselected with a query parameter:

```
?location=duke-street
?location=marbella
?location=cumbernauld
?location=hillfoot-business-hub
?location=knightswood
?location=sword-street-head-spa
```

A valid parameter preselects the location and reveals its booking panel on
load. An invalid one safely does nothing. Selecting a location updates the
URL (no full reload) and browser back/forward works via `popstate`.

## Accessibility

The page targets WCAG 2.1 AA: semantic landmarks, one logical H1, keyboard
focus indicators, 44px touch targets, `aria-live` on the booking panel,
`aria-pressed` + a visible indicator on selected cards, a skip-to-content
link, and `prefers-reduced-motion` support.

## Pre-launch checklist (client items)

- [ ] Confirm Duke Street’s preferred booking provider (Booksy vs Treatwell)
- [ ] Obtain **Marbella** booking URL
- [ ] Obtain **Hillfoot Business Hub** booking URL
- [ ] Obtain **Sword Street Head SPA** booking URL
- [ ] Confirm usage rights for all supplied images
- [ ] Confirm whether individual salon images can be assigned to specific
      locations
- [ ] Obtain verified addresses and opening hours if they should appear
- [ ] Obtain verified Instagram or other social links if required
- [ ] Confirm production domain (set canonical URL + sitemap)
- [ ] Add a privacy page before introducing analytics or forms
