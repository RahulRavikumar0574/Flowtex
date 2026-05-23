# Flowtex — Premium Water Storage Experience

Cinematic, fluid marketing website for Flowtex — India's intelligent water storage solutions brand.

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** — design tokens & responsive layout
- **Lenis** — smooth inertia scrolling
- **GSAP** + **ScrollTrigger** — scroll-driven storytelling
- **Framer Motion** — micro-interactions & UI motion
- **React Three Fiber** + **Drei** — 3D rotating water tank hero

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

### Option A — GitHub (recommended)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects **Vite**. Confirm:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts. For production:

```bash
vercel --prod
```

`vercel.json` in the repo root already sets the Vite build and SPA rewrites.

## Placeholders to Replace

Update `src/data/site.ts` and related sections with real assets:

| Placeholder | Usage |
|-------------|--------|
| `[LOGO]` | Navbar & footer branding |
| `[PRODUCT_IMAGES]` | Product cards, industries, blog |
| `[FACTORY_VIDEO]` | Video experience section |
| `[CUSTOMER_TESTIMONIALS]` | Testimonial copy |
| `[DEALER_LOCATIONS]` | Map & dealer data |
| `[WHATSAPP_NUMBER]` | WhatsApp CTAs |
| `[SOCIAL_LINKS]` | Footer social |
| `[CERTIFICATIONS]` | Why Flowtex section |
| `[PRODUCT_SPECIFICATIONS]` | Product modals |
| `[CASE_STUDIES]` | Installation map |
| `[SEO_CONTENT]` | Meta & knowledge hub |

## Sections

1. **Hero** — 3D tank, particles, stats, parallax, CTAs
2. **Smart Tank Finder** — Step-by-step recommendation engine
3. **Product Showcase** — 3D tilt cards, quick-view modal
4. **Technology** — 6-layer cross-section scroll story
5. **Why Flowtex** — Floating feature cards
6. **Industries** — Horizontal scroll cards
7. **Live Installations** — Interactive India map
8. **Video Experience** — Cinematic video grid
9. **Testimonials** — Drag & auto-slide cards
10. **Knowledge Hub** — Blog cards
11. **Footer** — Animated waves, WhatsApp, links

## Performance Notes

- Three.js canvas uses reduced `dpr` on mobile
- Lazy-load images when replacing placeholders
- ScrollTrigger instances clean up on unmount
- Prefer WebM/MP4 with `poster` for video section

## Brand Colors

Defined in `src/index.css` `@theme`:

- Deep: `#0a1628`
- Navy: `#0d2847`
- Accent: `#2b7fd4`
- Glow: `#4da3ff`

Replace with `[BRAND_COLORS]` when final palette is confirmed.
