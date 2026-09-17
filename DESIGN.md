# DESIGN.md — Viajes Alkoste (Luz & Cielo)

Durable visual system for the React/Vite/Tailwind site. This world REPLACES the previous
dark "Cinematic Editorial" world. Product truth and content are preserved.

## Thesis
"Luz y cielo." A bright, airy, editorial travel site built on generous white space, where
cyan is the single confident accent and one cinematic video (an airplane window over the
clouds) opens the journey. Clean and modern — cleanliness reads as trust. Refuses both the
old dark theme and the busy Elementor icon-card template.

## World / palette
- **Ground:** white `#ffffff` as the dominant field; alternating sections use a barely-there
  cyan mist `mist #f4f9fc`. Whitespace is a material, not a gap.
- **Accent:** Alkoste brand cyan `cyan-500 #00a8e8` → `cyan-400 #22bcea`. Committed to CTAs,
  active states, icon chips, underlines, and one hero gradient. Never drift to teal/green.
- **Ink:** headings `ink #0d1b26`; body `#33454f`; muted `#5b6b76` (tinted slate, not flat gray).
- **Lines & depth:** hairline `line #e4eef4`; soft shadows with real offset + blur
  (`shadow-soft`, `shadow-lift`) — depth from light, never a flat halo.

## Type
- **Display:** "Sora" — thick geometric sans (600–800). Clean, modern, confident headlines.
- **UI/Body:** "Manrope" — humanist geometric, excellent at text sizes.
- Weight and size carry emphasis. Never gradient text.

## Composition
- **Hero:** full-bleed autoplay/muted/looping video (airplane window, `public/videos/hero-avion.mp4`)
  with a soft scrim for legibility, white headline, and a floating WHITE glass search card.
  Poster + reduced-motion fallback image; the video is the only dark moment, then white takes over.
- Light destination cards with high-res imagery, soft shadow, hover lift.
- Services as clean cards / interactive index on white.
- Animated counters, Google-review marquee, cinematic CTA band.
- **Instagram section:** modern feed grid pulled from an adapter (`src/lib/instagram.js`) —
  Instagram-gradient ring on the heading, rounded tiles, hover zoom + caption/overlay, a
  "Ver en Instagram" CTA. Ready for the real Graph API token via `VITE_INSTAGRAM_TOKEN`.

## Motion (unique, alive)
Each key section gets ONE signature, orchestrated motion (Framer Motion), exponential
ease-out from a visible default, `prefers-reduced-motion` respected:
- Hero: video parallax + staggered word reveal + floating card + animated dashed flight path (SVG).
- Destinations: horizontal snap rail with hover lift.
- Stats: count-up on view.
- Services: staggered card rise + icon pop on hover.
- Instagram: tiles stagger in, hover zoom, gradient sheen.
- Reviews: continuous marquee (pauses on hover).

## Non-negotiables
- Contrast ≥ 4.5: dark ink on white; white text over video only with scrim.
- Whitespace generous; more space above a heading than below it.
- Mobile-first: hero, card, rails and Instagram grid recompose to one column.
- Keep the cyan brand identity.
