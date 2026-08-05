---
name: Remem
description: Never repeat yourself — a private, local-first memory for job applications.
colors:
  primary: "oklch(0.67 0.19 293)"
  primary-foreground: "oklch(0.145 0.03 293)"
  track-career: "oklch(0.75 0.12 225)"
  track-answer: "oklch(0.8 0.14 85)"
  boundary: "oklch(0.66 0.21 25)"
  steel: "oklch(0.52 0.05 250)"
  background: "oklch(0.158 0.014 255)"
  foreground: "oklch(0.93 0.006 250)"
  card: "oklch(0.198 0.02 253)"
  secondary: "oklch(0.245 0.022 253)"
  muted-foreground: "oklch(0.68 0.025 250)"
  border: "oklch(0.72 0.04 250 / 18%)"
typography:
  display:
    fontFamily: "Chakra Petch, Geist, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.02em"
    lineHeight: 1.05
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontWeight: 600
    letterSpacing: "0.14em"
    fontFeature: "tabular-nums"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
spacing:
  section-y: "6rem"
  section-y-lg: "8rem"
  panel-p: "1.75rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.5rem"
  badge-accent:
    backgroundColor: "{colors.card}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.625rem"
---

# Design System: Remem — The Held Event

## Overview

**Creative North Star: "The Held Event"**

Remem's site is built as one frozen collision, in the visual language of a particle-detector event display: a page scan lands, and its results curve out of a vertex as classified signal tracks, held still long enough to review before anything moves. The metaphor is literal to the product's core mechanism — a form scan produces facts, each fact belongs to a type, and every one of them is shown to you, at rest, before it goes anywhere. Nothing here is decorative sci-fi; every visual element maps to a real product concept the moment you ask "what does this represent."

The palette is a classification system, not a mood board. Violet identifies you (name, email, addresses — deterministic memory, and the brand's own color). Cyan identifies your career facts (employment, education). Amber marks AI-drafted answers — and only those; amber never appears anywhere else, because conflating "AI wrote this" with "this is a fact" is the one confusion the product is built to prevent. Red is reserved, without exception, for the submit boundary: the one thing Remem never crosses. Steel is structure — rings, hairlines, grid, chrome — and carries no meaning of its own.

The site refuses two defaults on sight: the ambient particle-and-glow background common to privacy-tool marketing pages (replaced by a fixed, legible detector cross-section — architecture, not atmosphere), and the bento icon-card grid (replaced everywhere by ledgers, panels, and readouts that read like instrument output). Dark is the native mode — a vacuum ground the tracks glow against; light mode is "the printed event plot," the same diagram on white paper, ink instead of phosphor.

**Key Characteristics:**
- Fact-type color classification (violet/cyan/amber/red) that never wavers in meaning across the whole site
- Machined, square-cornered surfaces; mono-caps readout labels; tabular numerals wherever data appears
- A fixed SVG detector-field background — geometry, not particles or gradients
- No eyebrows/kickers above headings; headings carry their own weight, closed with a violet square full stop
- CSS-only entrance motion by default; framer-motion reserved for the one authored moment (the hero event) plus the interactive demo and the step-switcher pattern (timeline, feature explorer)

## Colors

The palette classifies facts, not screens. A color's meaning is fixed everywhere it appears — a component may not borrow amber or red for anything outside their assigned role.

### Primary
- **Signal Violet** (`oklch(0.67 0.19 293)` dark / `oklch(0.5 0.24 293)` light): Identity facts (name, email, addresses), the brand accent, primary buttons, links, focus rings, and the caret/selection color. The signature `SquareDot` full stop after headings is always this color.

### Secondary
- **Track Cyan** (`--track-career`, `oklch(0.75 0.12 225)` dark / `oklch(0.55 0.12 230)` light): Career facts — employment, education, experience. Used on the "Matching" feature channel, career-side data in the AI-clarity panel accents, and career fact chips in the hero event.

### Tertiary
- **Draft Amber** (`--track-answer`, `oklch(0.8 0.14 85)` dark / `oklch(0.6 0.13 80)` light): AI-drafted answers only — never a fact, never a status, never decoration. Marks the "AI writing" channel, the AI-channel header bar, and the dashed AI track in the hero event.
- **Boundary Red** (`--boundary`, `oklch(0.66 0.21 25)` dark / `oklch(0.55 0.22 27)` light): The submit boundary exclusively — "Remem never auto-submits." Used for the `form.submit` chip, the calorimeter wall in the hero event, and the Control feature channel. Never used for generic errors or destructive actions elsewhere.

### Neutral
- **Vacuum Ground** (`--background`, `oklch(0.158 0.014 255)` dark / `oklch(0.977 0.004 240)` light): Page background.
- **Panel** (`--card`, `oklch(0.198 0.02 253)` dark / `oklch(1 0 0)` light): Card, panel, and popover surfaces.
- **Steel** (`--steel`, `oklch(0.52 0.05 250)` dark / `oklch(0.62 0.04 250)` light): Structural ink — detector rings, dot-grid lattice, scrollbar thumb, dividers, ghost/synonym tracks. Carries no semantic meaning.
- **Muted Ink** (`--muted-foreground`, `oklch(0.68 0.025 250)` dark / `oklch(0.48 0.03 252)` light): Secondary text, captions, mono meta labels.
- **Border** (`--border`, `oklch(0.72 0.04 250 / 18%)` dark / `oklch(0.88 0.015 248)` light): Hairline dividers and panel edges.

### Named Rules
**The Classification Rule.** Violet, cyan, amber, and red each mean exactly one thing (identity, career, AI draft, submit boundary) everywhere on the site. A component reaching for one of these colors without that meaning has broken the system, not decorated it.

**The No-Gradient Rule.** No color gradients anywhere, on anything — a hard brand commitment carried from PRODUCT.md. Depth comes from opacity, layering, and glow (`drop-shadow`), never from a gradient stop.

## Typography

**Display Font:** Chakra Petch (weights 500/600/700), with Geist and system-ui fallback
**Body Font:** Geist, with system-ui fallback
**Label/Mono Font:** Geist Mono, with ui-monospace fallback

**Character:** Chakra Petch's engineered, slightly technical geometric caps read as instrument-panel lettering without tipping into a costume font; Geist keeps body prose calm and readable; Geist Mono carries every piece of "data" on the page (readout labels, control text, field ids, timestamps) with tabular figures so numbers align like a real console.

### Hierarchy
- **Display** (700 weight, `text-4xl`–`text-7xl`, tight/`-0.02em` tracking, uppercase): Page and section headings (`h1`, `h2`). Always closed with the violet `SquareDot` (a `0.13em` square, inline after the last word) as the world's signature full stop. Uppercase is load-bearing — it's what makes Chakra Petch read as instrument lettering rather than a generic display face.
- **Body** (400 weight, `text-base`–`text-lg`, 1.6 line-height): Paragraph copy, 65–75ch measure via `max-w-xl`/`max-w-2xl` containers.
- **Label/Readout** (600 weight, 10–11px, `0.12em`–`0.18em` tracking, uppercase, tabular numerals via the `.readout` utility): Nav links, button text, badges, field labels, channel ids (`memory.profile`), and every status chip (`ACTIVE`, `NEVER`, `LOCAL`). This is the control voice of the whole site — buttons and badges are mono-caps, not sentence-case.

### Named Rules
**The No-Eyebrow Rule.** No kicker/eyebrow label sits above any heading (`SectionHeading` and `PageHeader` never render one). The heading carries its own weight; a small caps label above it was judged to be padding, not information.

**The Readout Rule.** Any text presenting a value, id, count, date, or status is set in Geist Mono with tabular numerals (the `.tnum` utility) — never in the body sans. If it looks like data, it must read like data.

## Layout

Content sits in a `max-w-6xl` centered container (`container-page` utility, `px-6 md:px-8`). Sections run `py-24 md:py-32` (`py-32 md:py-36` for the final CTA); the hero is the exception at `pt-32 pb-20 md:pt-40`. The homepage alternates centered and left-aligned section heads on purpose (Features/Browsers/CTA centered; Privacy/AI-clarity left-aligned against their full-width panels) so the scroll doesn't flatten into one repeated composition. Feature and channel panels use CSS grid with `items-start` and no forced equal heights — a panel is exactly as tall as its content, never stretched to match a sibling. Mobile collapses multi-column grids to a single column at `md`/`lg` breakpoints; the nav collapses to a slide-down sheet under `md`.

## Elevation & Depth

Flat by default — panels are one hairline border (`border-border`) on the card surface color, no ambient drop shadow at rest. Depth is expressed three other ways: (1) layering — the fixed detector-field background sits behind all content at `-z-10`; (2) glow — active/hover states and the hero event's main signal tracks use `drop-shadow`/`box-shadow` tinted from the element's own color (e.g. `shadow-[0_4px_24px_-4px_color-mix(in_oklch,var(--primary)_55%,transparent)]` on primary-button hover), never a generic black shadow; (3) motion-triggered shadow on interactive surfaces (the interactive demo popup, toasts) which do carry a soft directional shadow because they represent real floating UI (an extension popup), not page chrome.

### Named Rules
**The Tinted Glow Rule.** Where an element needs to lift off the surface, its shadow/glow is color-mixed from its own semantic color (primary, boundary, etc.), never a flat black — the glow is signal, not generic elevation.

## Shapes

Machined, not soft. Base radius is `0.5rem` (`--radius`), scaling via `--radius-sm` (0.5×) through `--radius-2xl` (2×) — corners read as cut, not rounded-for-comfort. Status indicators are always small squares (`size-1.5 bg-{color}`), never dots — a deliberate departure from the rounded-dot convention, reinforcing the "machined instrument" character. The signature `SquareDot` (a `0.13em` violet square) closes every major heading. Target/reticle corner brackets (`border-t border-l`, etc., four independent corner spans) mark two signature surfaces: the final-CTA panel and the waitlist-success icon — visually "locking onto" the thing being emphasized.

## Components

### Buttons
- **Shape:** `rounded-md` (6px), never pill-shaped.
- **Voice:** All button text is mono-caps: `font-mono font-semibold tracking-[0.12em] uppercase`, 11–13px depending on size.
- **Primary:** `bg-primary` / `text-primary-foreground`; hover adds a tinted violet glow (`hover:shadow-[...color-mix...]`) plus a slight brightness lift — no color shift, no gradient.
- **Secondary/Outline/Ghost:** flat background or bordered, hover moves to `bg-secondary`/`border-primary/50`; same mono-caps voice throughout.
- **Active:** `active:scale-[0.98]` on every variant.

### Badges
- **Style:** `rounded-sm` (4px), mono-caps text (`text-[10px] tracking-[0.16em] uppercase`), never pill-shaped.
- **Accent variant:** violet border (`border-primary/30`) + tinted background — used sparingly, never as a page-heading eyebrow (banned).

### Cards / Panels
- **Corner style:** `rounded-lg` (8px) uniformly across feature panels, ledger rows' parent container, the privacy table, and the CTA block.
- **Background:** `bg-card`, one hairline `border-border`.
- **Shadow strategy:** flat at rest (see Elevation & Depth); hover on feature panels only brightens the border to `border-primary/30`, no shadow added.
- **Internal padding:** `p-7` (1.75rem) is the standard panel padding; ledger rows use `p-5`/`px-7 py-5`.

### Inputs / Fields
- **Style:** `rounded-md`, `border-input`, `bg-card`/`bg-background` depending on context.
- **Focus:** `border-ring` + `ring-2 ring-ring/30` — a clean focus ring, no glow.
- **Error:** `aria-invalid:border-destructive aria-invalid:ring-destructive/20`.

### Navigation
- **Style:** Mono-caps links (`text-xs tracking-[0.12em] uppercase`) with a small square marker (`size-1.5`) that fills violet when active, steel on hover — echoing the status-square language used everywhere else. Header is transparent at the top of the page, gains a blurred `bg-background/85` + border once scrolled. Mobile: slide-down sheet, same link styling, full-width primary CTA appended.

### The Held Event (signature component)
The hero's `EventBloom`: an SVG-only (no canvas) frozen collision — a scan vertex sprays violet/cyan/amber tracks (with low-momentum curls, dotted secondaries, and backsplash on the opposite side, because a real collision sprays both ways) out to pinned mono-labeled fact chips, while red calorimeter bars stack in clusters against a dashed vertical boundary line labeled `form.submit — no route — always yours`. One violet track dives off the bottom edge into the live interactive demo below, with a dashed connector reading `event.source — run the scan yourself` — drawing, not just implying, that the demo is the event's real source. This is the one place framer-motion authors a specific choreographed draw-in; everywhere else motion is the shared CSS system below.

### Motion System
Two CSS-only entrance utilities (`globals.css`, gated under `prefers-reduced-motion: no-preference`, so content is never blank pre-hydration — no JS required to become visible):
- **`.enter`** (`+ .enter-down` / `.enter-fade` modifiers): a one-shot rise/fade-in played on load, used for the hero and page headers (`Reveal immediate`).
- **`.scroll-reveal`**: rides `animation-timeline: view()` where supported (a native scroll-linked rise-in as the block enters the viewport); falls back to simply visible, static, where the browser lacks scroll-timeline support. No IntersectionObserver, no JS.

framer-motion (`motion/react`) is reserved for specific, authored pieces: the hero `EventBloom` draw-in, the `InteractiveDemo` (a real state machine: scan → fill → review → submit), and the step-switcher pattern — a numbered, auto-advancing list synced to a live preview panel, used by `Timeline` on `/how-it-works` and `FeatureExplorer` on `/features`. It is never used for generic section entrances.

## Do's and Don'ts

### Do:
- **Do** keep violet/cyan/amber/red meaning fixed everywhere (identity/career/AI-draft/submit-boundary) — introducing a fifth semantic color, or reusing one of these four for something else, breaks the system.
- **Do** set every data-shaped value (ids, counts, dates, statuses) in Geist Mono with tabular numerals via the `.readout`/`.tnum` utilities.
- **Do** close major headings with the violet `SquareDot` and keep headings eyebrow-free.
- **Do** use square status indicators (`size-1.5 bg-{color}`), not rounded dots, for anything indicating state.
- **Do** default new entrance motion to `.enter`/`.scroll-reveal` (CSS) rather than reaching for framer-motion; reserve framer for a genuinely stateful or choreographed interaction.
- **Do** keep panels flat at rest (hairline border, no shadow) and reserve tinted glow for hover/active states.

### Don't:
- **Don't** use any color gradient anywhere — backgrounds, text, buttons, or borders. This is a hard brand rule, not a style preference.
- **Don't** build a bento icon-card grid (same-size cards of icon + heading + text) as page structure — the world's ledgers/panels/readouts replace that pattern everywhere it would otherwise appear (see `Browsers`, `Privacy`, `Features` sections for the replacement pattern).
- **Don't** add a kicker/eyebrow label above a heading, even a small muted one — this is a full ban, not a default.
- **Don't** use amber for anything that isn't an AI-drafted answer, or red for anything that isn't the submit boundary.
- **Don't** round button or badge corners into pills — the machined `rounded-md`/`rounded-sm` language is the whole shape system.
- **Don't** apply the site's design language to the interactive demo's extension-popup replica (the dark violet popup with the scanner reticle) — it intentionally mirrors the real Remem product UI, which is its own design system, not this one.
