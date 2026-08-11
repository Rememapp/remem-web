# remem-web

> **Never repeat yourself.**

Public marketing and product website for [Remem](https://rememapp.uk) — a privacy-first browser memory that fills job application forms from your stored profile, without ever auto-submitting or sending your data to its servers.

This repo is the **marketing surface only**. The browser extension lives in [`remem`](../remem) and the backend API lives in [`remem-api`](../remem-api).

---

## Overview

Remem is a browser extension for job seekers who are tired of retyping the same employment history, education, address, and cover letter material on every ATS platform (Greenhouse, Lever, Workday, Ashby). This website is its public face: it explains what the product does, captures waitlist signups, and links to documentation.

**Primary conversion goal:** waitlist email capture. Every page funnels toward the `WaitlistForm` in the hero and the `#waitlist` final CTA section.

**Key product truths this site must never contradict:**
- Remem never auto-submits — hard-coded, not a setting
- AI is used only for genuinely open-ended answers; deterministic fields are filled from stored memory
- All user data is local-first; no data leaves the device unless the user explicitly opts into backup
- Backup goes to the **user's own Google Drive**, never Remem servers
- Local data is **not** encrypted at rest — the site must never claim otherwise
- The extension currently targets **job applications only** (ATS platforms); government, university, insurance, and healthcare forms are roadmap

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, React Server Components) |
| Language | TypeScript (strict) |
| UI | React 19 |
| Styling | Tailwind CSS v4 (CSS-first config in `src/app/globals.css`) |
| UI Primitives | shadcn-style components in `src/components/ui/` |
| Animation | Motion (`motion/react`) — client-only wrappers in `src/components/motion/` |
| Forms | React Hook Form + Zod |
| Server Actions | `src/actions/` |
| Markdown | `next-mdx-remote-client` + `gray-matter` (changelog entries) |
| Fonts | Outfit (display) + Geist (body) via `next/font/google` |
| Package Manager | **bun** |
| Deployment | Vercel |

---

## Project Structure

```
remem-web/
├── src/
│   ├── app/                        # Next.js App Router routes
│   │   ├── page.tsx                # Homepage (/)
│   │   ├── layout.tsx              # Root layout (JSON-LD, fonts, theme, analytics)
│   │   ├── globals.css             # Tailwind v4 CSS-first config + design tokens
│   │   ├── sitemap.ts              # Dynamic sitemap
│   │   ├── robots.ts               # robots.txt
│   │   ├── manifest.ts             # Web app manifest
│   │   ├── opengraph-image.tsx     # Root OG image
│   │   ├── about/                  # /about
│   │   ├── changelog/              # /changelog (MDX-driven)
│   │   ├── contact/                # /contact
│   │   ├── faq/                    # /faq (FAQPage JSON-LD)
│   │   ├── features/               # /features
│   │   ├── how-it-works/           # /how-it-works
│   │   ├── privacy/                # /privacy
│   │   ├── terms/                  # /terms
│   │   └── waitlist/success/       # Post-signup confirmation
│   │
│   ├── components/
│   │   ├── sections/               # Homepage sections (Hero, Features, Privacy, AI, Browsers, CTA)
│   │   ├── layout/                 # Nav, Footer
│   │   ├── motion/                 # Client-only Reveal wrappers (useReducedMotion)
│   │   ├── ui/                     # shadcn-style primitives (Button, Badge, Input, Card…)
│   │   ├── event-bloom.tsx         # SVG hero "Held Event" detector diagram
│   │   ├── interactive-demo.tsx    # Animated extension-popup demo (state machine)
│   │   ├── feature-explorer.tsx    # Step-switcher for /features
│   │   ├── timeline.tsx            # Step-switcher for /how-it-works
│   │   ├── waitlist-form.tsx       # Email capture form (Zod + honeypot + rate-limit)
│   │   ├── contact-form.tsx        # Contact page form
│   │   ├── faq-list.tsx            # Accordion FAQ list
│   │   ├── page-header.tsx         # Inner-page header
│   │   ├── section-heading.tsx     # Reusable section title
│   │   └── background-fx.tsx       # Fixed detector-field SVG background
│   │
│   ├── actions/
│   │   └── waitlist.ts             # Server Action: Zod validation, honeypot, Resend / local fallback
│   │
│   └── lib/
│       ├── site.ts                 # siteConfig (name, tagline, URL, social links, keywords)
│       ├── features.ts             # Feature data for /features and homepage bento
│       ├── faqs.ts                 # FAQ data (shared across homepage + /faq)
│       ├── changelog.ts            # MDX changelog loader
│       ├── metadata.ts             # Per-page Metadata API helpers
│       ├── og.tsx                  # Dynamic OG image generator (Satori)
│       ├── remem-api.ts            # HTTP client for the remem-api backend
│       ├── analytics.ts            # Analytics stub (Plausible/Umami-agnostic)
│       └── utils.ts                # cn() and misc helpers
│
├── content/
│   └── changelog/                  # Changelog MDX files (frontmatter: version, title, date)
│
├── public/                         # favicon.svg, og-image.png, manifest icons
│
├── AGENTS.md                       # Architecture, design system, and agent rules
├── CLAUDE.md                       # Claude-specific context + sibling repo map
├── PRODUCT.md                      # Product positioning, brand commitments, hard constraints
└── DESIGN.md                       # Full visual design system (The Held Event)
```

---

## Getting Started

### Prerequisites

- **Bun** ≥ 1.0 — [bun.sh](https://bun.sh)
- **Node.js** 20+ (required by Next.js)

### Install & Run

```bash
# Clone
git clone https://github.com/Rememapp/remem-web.git
cd remem-web

# Install dependencies
bun install

# Copy environment template
cp .env.example .env.local

# Start the dev server
bun run dev        # http://localhost:3000
```

---

## Scripts

```bash
bun run dev        # Start dev server (Turbopack)
bun run build      # Production build
bun run start      # Serve the production build locally
bun run lint       # ESLint
bun run typecheck  # tsc --noEmit
bun run format     # Prettier
```

---

## Environment Variables

Copy `.env.example` to `.env.local`. All variables are optional in development — the site runs without them, falling back to safe local defaults.

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (sitemap, OG, RSS) | `https://rememapp.uk` |
| `NEXT_PUBLIC_REMEM_API_URL` | remem-api endpoint for waitlist / contact forms | `https://api.rememapp.uk` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public key for bot protection | Widget skipped if unset |

> **Local full-stack:** Run `bun run server:dev` in `../remem-api` and set `NEXT_PUBLIC_REMEM_API_URL=http://localhost:8787`.

---

## Content Management

### Changelog

Add a new `.md` file to `content/changelog/`:

```
content/changelog/
└── 2026-08-11.md
```

**Frontmatter shape:**

```yaml
---
version: "0.4.2"
title: "Field detection improvements"
date: "2026-08-11"
---
```

Body is standard Markdown. Files appear automatically at `/changelog` in reverse-chronological order — no code changes needed.

---

## Design System

The site is built around a concept called **"The Held Event"** — the visual language of a particle-detector event display, where a page scan produces classified signal tracks that are held still for review before anything moves. Every visual element maps to a real product concept: facts, AI writing, and the submit boundary.

### Color Classification

Color meaning is fixed everywhere on the site and must never be repurposed:

| Color | Role | Usage |
|---|---|---|
| **Signal Violet** `oklch(0.67 0.19 293)` | Identity / brand accent | Name, email, address facts; primary buttons; links; focus rings |
| **Track Cyan** `oklch(0.75 0.12 225)` | Career facts | Employment, education fact chips |
| **Draft Amber** `oklch(0.8 0.14 85)` | AI-drafted answers only | AI channel header, open-ended answer chips — nowhere else |
| **Boundary Red** `oklch(0.66 0.21 25)` | Submit boundary | "Remem never auto-submits" callout — never for generic errors |
| **Vacuum Ground** `oklch(0.158 0.014 255)` | Page background | Dark mode native |
| **Panel** `oklch(0.198 0.02 253)` | Cards and panels | One hairline border, no ambient shadow at rest |

**Hard rules:**
- No color gradients anywhere — backgrounds, text, buttons, or borders
- No pill-shaped buttons or badges (`rounded-md` / `rounded-sm` only)
- No eyebrow/kicker labels above headings — banned, not discouraged
- Square status indicators (`size-1.5 bg-{color}`), never dots

### Typography

- **Display:** Chakra Petch 700, uppercase, tight tracking (`-0.02em`) — instrument-panel lettering
- **Body:** Geist 400, 1.6 line-height
- **Labels / readouts:** Geist Mono, uppercase, tabular numerals via `.readout` / `.tnum` — every value, id, count, date, or status

### Motion

CSS-only by default (content is never blank pre-hydration; `prefers-reduced-motion` respected):
- `.enter` / `.enter-down` — one-shot rise/fade on load (hero, page headers)
- `.scroll-reveal` — native `animation-timeline: view()` scroll reveal, no JS or IntersectionObserver

`motion/react` (Framer Motion) is reserved for three authored moments only: the hero `EventBloom` draw-in, the `InteractiveDemo` state machine (scan → fill → review → submit), and the step-switcher pattern used by `Timeline` and `FeatureExplorer`.

---

## SEO

- Per-page `Metadata` API with canonical URLs
- `sitemap.ts` — dynamic, covers all routes + changelog entries
- `robots.ts` — standard crawler rules
- `manifest.ts` — PWA web app manifest
- JSON-LD: `Organization` + `SoftwareApplication` in root layout; `FAQPage` on `/faq`
- Dynamic OG images via `src/lib/og.tsx` (Satori)
- `rss.xml` route for the changelog feed

---

## Waitlist Form

The waitlist Server Action (`src/actions/waitlist.ts`) handles:

- **Zod validation** — email format checked server-side
- **Honeypot** — hidden `company` field; bots that fill it are silently rejected
- **Per-email rate limiting** — naive dedup to prevent repeated submissions
- **Duplicate handling** — graceful response if email already exists in the audience

On success, the user is redirected to `/waitlist/success`.

---

## Sibling Repositories

This repo is one of three that make up the Remem ecosystem, checked out as siblings:

```
projects/
├── remem/          # Closed-source browser extension (WXT, React, Dexie, Tailwind v4)
├── remem-api/      # Closed-source backend (Hono on Cloudflare Workers)
└── remem-web/      # This repo — marketing/product website
```

| Repo | Description | Visibility |
|---|---|---|
| [`remem`](../remem) | Chrome MV3 extension — Memory Builder + ATS autofill. `PRODUCT.md` and `DESIGN.md` there are the source of truth for positioning and visual language. | Closed source (open-source planned) |
| [`remem-api`](../remem-api) | Hono API on Cloudflare Workers — AI answer generation, Google OAuth, session management. Relevant when this site needs to hit a live endpoint. | Closed source |

---

## Future Routes (pre-wired)

The architecture supports these additions without touching existing pages:

- `/pricing` — when pricing tiers are decided
- `/docs` — documentation site
- `/dashboard` — user dashboard
- `/roadmap` — public roadmap / feature voting

---

## Contact

- **Site:** [rememapp.uk](https://rememapp.uk)
- **Email:** hello@rememapp.uk
- **GitHub:** [github.com/Rememapp](https://github.com/Rememapp)

---

**Status:** Pre-launch · waitlist open · extension in development.

See [AGENTS.md](AGENTS.md) for full architecture and design-system decisions.
