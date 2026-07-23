
## Biryani House — Website Plan

A warm, appetite-led, mobile-first restaurant site for Biryani House (Jauharabad). Uses the exact palette and Playfair Display + Inter typography specified. All business-specific claims stay as clearly-marked editable placeholders; only verified facts (name, address, phone, hours, 3.9 rating) are hard-coded.

### Routes (TanStack Start file-based)
- `/` (rewrite `src/routes/index.tsx`) — Home
- `/menu` — Menu
- `/about` — About
- `/gallery` — Gallery
- `/reviews` — Reviews
- `/faq` — FAQ
- `/contact` — Contact & Location

Each leaf route gets its own `head()` with unique title, description, og:title, og:description. Root keeps sitewide defaults + LocalBusiness JSON-LD (Restaurant type with NAP + hours + 3.9 rating). Home og:image points at the hero image once generated.

### Design system (`src/styles.css`)
- Load Playfair Display + Inter via `<link>` in `__root.tsx` head (never `@import` URLs).
- Replace default oklch tokens with the exact hex palette converted to oklch:
  - `--background` #F8F4EE, `--card` #FFFDFC, `--foreground` #1F1A17, `--muted-foreground` #6E6259, `--border` #E6D9CC
  - `--primary` #8C1D18 (hover #731813), `--secondary` #C97A1F (hover #A86217), `--accent` #2F6B3B
- Add `--font-display` (Playfair) and `--font-sans` (Inter) in `@theme`.
- Fluid type scale utilities matching the spec (H1 60→40, H2 40→32, etc.).
- Keep dark tokens intact but site renders light-only (warm background is the identity).

### Brand assets (generated with imagegen)
- Horizontal wordmark logo (Playfair "Biryani House" + steaming handi emblem, deep red / saffron / charcoal) → `src/assets/logo.svg`-style PNG, transparent bg.
- Square app-icon variant → `public/favicon.png`; delete `public/favicon.ico`; wire in `__root.tsx` links.
- Hero food image (overhead chicken biryani in copper handi, warm lighting) → `src/assets/hero-biryani.jpg`.
- 6 signature dish images (chicken biryani, mutton biryani, beef biryani, chicken karahi, raita/salan combo, kheer) for menu preview + menu page.
- 8 gallery images (food close-ups, interior seating, service, exterior/local Main Bazar feel — generic warm restaurant scenes, no real-business imitation).

### Reusable components (`src/components/`)
`AnnouncementBar`, `SiteHeader` (sticky, mobile drawer), `SiteFooter`, `MobileActionBar` (fixed bottom: Call / WhatsApp / Directions), `Button` variants (primary/secondary/ghost with hover states), `SectionHeader`, `DishCard`, `FeatureCard`, `ReviewCard` (with `data-editable` marker), `FaqAccordion` (Radix), `GalleryGrid` (masonry-ish, lightbox optional/simple), `ContactBlock`, `MapEmbed` (iframe with the address query), `TrustStrip`, `PlaceholderBadge` (small chip marking editable content).

### Home page sections (in order)
1. Announcement bar — hours · Main Bazar, Jauharabad · click-to-call
2. Sticky nav with Call to Order CTA
3. Hero — headline "Fresh, Flavorful Biryani in the Heart of Jauharabad", sub-copy, primary Call + secondary Directions, hero image right/bg
4. Trust strip — 3.9★ · Daily 8am–11pm · Main Bazar location · wheelchair-accessible seating
5. Signature menu preview — 6 editable dish cards
6. Why choose us — 4 tiles (local, direct ordering, dine-in & takeaway, fresh daily)
7. About preview
8. Gallery preview (4–6 tiles → link to /gallery)
9. Reviews section — big 3.9 summary + Google profile button + 3 placeholder review cards marked editable
10. FAQ preview (5 items)
11. Contact + map
12. Footer

### Other pages
- **Menu**: featured biryani grid + category sections (Biryani, Karahi & BBQ, Sides & Breads, Drinks & Desserts) with editable item rows (name, description, price all `[placeholder]`), "Call to order" button per category.
- **About**: local-presence narrative with editable owner story block, values, hours card.
- **Gallery**: full grid, category filters (Food / Interior / Service), placeholder chips visible.
- **Reviews**: large rating hero, "View on Google" button (link placeholder), grid of editable review cards.
- **FAQ**: full accordion (hours, dine-in, takeaway, ordering, directions, parking, group seating, halal — phrased as editable Q&A).
- **Contact**: click-to-call, WhatsApp button (placeholder wa.me link), Directions button (Google Maps address query), embedded map iframe, hours table, enquiry form (name/phone/message — client-side only, submits to a `mailto:` placeholder, no backend).

### Interactions
- Framer Motion for fade-up on scroll, hover lift on cards, mobile menu slide, FAQ accordion (Radix). All wrapped to respect `prefers-reduced-motion`.
- Smooth scroll via `scroll-behavior: smooth` on html.
- Sticky header shadow on scroll.

### SEO / metadata
- Home title: "Biryani House | Biryani Restaurant in Jauharabad"
- Meta description mentions Jauharabad, Main Bazar, hours, phone.
- Restaurant JSON-LD in `__root.tsx` scripts (name, address, telephone, openingHours "Mo-Su 08:00-23:00", aggregateRating 3.9, servesCuisine Pakistani/Biryani).
- Alt text on every image referencing dish/interior/Jauharabad.
- Relative canonicals per route.

### Non-fabrication guardrails
- No invented reviews, awards, years, branches, delivery claims, owner bio.
- Placeholder text wrapped in `[…]` and visually tagged with a small "Editable" chip on About story, review quotes, and any menu prices.

### Technical notes
- No backend / Lovable Cloud needed — pure marketing site.
- Add `framer-motion` via `bun add`.
- Preserve TanStack router bootstrap; `<Outlet />` stays in `__root.tsx`.
- No `og:image` on root; leaf routes with hero images set their own.

### Out of scope
- Real ordering/checkout, online payments, reservation system, CMS, i18n, dark mode toggle, actual Google Places API integration.
