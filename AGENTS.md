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
- MDX blog via `next-mdx-remote-client` + `gray-matter`; content lives in `content/blog` and `content/changelog`
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
  cloud backup optional and E2E-encrypted.

## SEO

Per-page Metadata API with canonical URLs, `sitemap.ts`, `robots.ts`, `manifest.ts`, `rss.xml`
route, JSON-LD (Organization + SoftwareApplication in layout, FAQPage on `/faq`, BlogPosting on
posts), dynamic OG images (`src/lib/og.tsx`, root + per-post). Site URL comes from
`NEXT_PUBLIC_SITE_URL` (defaults to `https://remem.app` — update `src/lib/site.ts` when the real
domain is decided; social links there are placeholders too).

## Structure

- `src/app/` — routes: `/`, `/features`, `/how-it-works`, `/faq`, `/about`, `/contact`, `/blog(/[slug])`,
  `/changelog`, `/privacy`, `/terms`, `/waitlist/success`
- `src/components/sections/` — homepage sections; `src/components/` — shared (Timeline, BrowserMockup,
  WaitlistForm, FaqList, FeatureCard, BlogCard, PageHeader, SectionHeading)
- `src/lib/` — site config, feature/FAQ data, blog/changelog loaders, analytics stub (Plausible/Umami-agnostic)

Future-ready: pricing, docs, dashboard, roadmap/feature voting can be added as new routes without
touching the existing architecture.
