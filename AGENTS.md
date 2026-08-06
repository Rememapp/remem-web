# AGENTS.md

`remem-web` is the public marketing/product website for Remem — a privacy-first browser memory
("Never repeat yourself."). It is its own brand-register surface, distinct from the extension
(see `../remem/PRODUCT.md` for positioning; `../remem/DESIGN.md` is the extension's design system,
which this site draws tokens from but does not copy wholesale).

## Stack

- Next.js 15 (App Router, React Server Components by default), React 19, strict TypeScript
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`), shadcn-style UI primitives in `src/components/ui`
- Motion (Framer Motion successor, `motion/react`) — client-only wrappers in `src/components/motion/reveal.tsx`
- React Hook Form + Zod for forms; Server Actions in `src/actions/`
- Markdown changelog via `next-mdx-remote-client` + `gray-matter`; content lives in `content/changelog`
- Package manager: **bun** (`bun run dev|build|lint|typecheck|format`)

## Conversion goal

One primary goal: **waitlist email capture** (`src/actions/waitlist.ts`). Every page funnels to
`WaitlistForm` (hero + `#waitlist` final CTA). The action validates with Zod, has a honeypot
(`company` field), naive per-email rate limiting, and duplicate handling. Storage backend:
Resend Audiences when `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` are set, else a local
`.data/waitlist.json` fallback for dev. Success redirects to `/waitlist/success`.

## Design decisions

- **Dark mode first** (next-themes, `defaultTheme: 'dark'`), light fully supported.
- Cool grey-blue-lavender neutrals + violet accent (matches `public/favicon.svg` purple, kin to the
  extension's indigo "blurple"). **No gradients anywhere** — color comes from per-feature icon hue tints.
- Fonts: Outfit (display, `font-display`) + Geist (body, `font-sans`) via `next/font/google`.
- Animations: subtle fade/slide/stagger reveals, `useReducedMotion` respected everywhere,
  ease curve `[0.16, 1, 0.3, 1]`.
- Copy register: Linear/Arc — short, confident sentences; no "supercharge/unlock/revolutionize".
- Product truths that copy must never contradict: never auto-submits; AI only writes open-ended
  answers (deterministic fields use deterministic logic); local-first; export/delete anytime;
  backup is optional, off by default, encrypted on-device, and goes to the **user's own Google
  Drive** (never Remem servers). Local data is NOT encrypted at rest — never claim "encrypted
  storage" or "encrypted at rest".
- **Positioning scope**: the extension currently targets job applications only (ATS platforms —
  Greenhouse, Lever, Workday, Ashby). Copy must not claim support for government/university/
  insurance/healthcare/checkout forms — those are roadmap, not product. The homepage is kept
  deliberately lean: Hero (interactive demo) → proof strip → bento features → privacy → AI →
  browsers → CTA; how-it-works and FAQ live only on their own pages. There is no blog (removed
  2026-08; git history has the MDX setup if it ever comes back).

## SEO

Per-page Metadata API with canonical URLs, `sitemap.ts`, `robots.ts`, `manifest.ts`, `rss.xml`
route, JSON-LD (Organization + SoftwareApplication in layout, FAQPage on `/faq`, BlogPosting on
posts), dynamic OG images (`src/lib/og.tsx`, root + per-post). Site URL comes from
`NEXT_PUBLIC_SITE_URL` (defaults to `https://remem.itssvk.dev` for now — update `src/lib/site.ts`
again once a proper domain is bought; social links there are placeholders too).

## Structure

- `src/app/` — routes: `/`, `/features`, `/how-it-works`, `/faq`, `/about`, `/contact`,
  `/changelog`, `/privacy`, `/terms`, `/waitlist/success`
- `src/components/sections/` — homepage sections; `src/components/` — shared (InteractiveDemo,
  Timeline, WaitlistForm, FaqList, FeatureCard, PageHeader, SectionHeading)
- `src/lib/` — site config, feature/FAQ data, blog/changelog loaders, analytics stub (Plausible/Umami-agnostic)

Future-ready: pricing, docs, dashboard, roadmap/feature voting can be added as new routes without
touching the existing architecture.
