# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Active job seekers — people simultaneously applying to many roles, navigating multiple ATS portals (Greenhouse, Lever, Workday, Ashby) repeatedly. They know the pain of retyping the same employment history, education, addresses, and cover letter material on every application.

**Adjacent:** Any web user who fills repetitive forms, but this audience is not currently targeted; job applications are the confirmed focus at launch.

## Product Purpose

Remem is a browser extension that acts as a private memory layer for your personal information. You fill in your details once — employment history, education, addresses, document numbers — and Remem helps you reuse them on every job application form the web throws at you. It understands whole forms, not just named fields, so "Given name" and "Legal first name" are the same question. An AI writing assistant drafts cover letters and open-ended answers from your real history; everything else is deterministic. You review every suggestion before a single field changes. You press submit.

Success means: an active job seeker completes a forty-field ATS application in a fraction of the time, without retyping facts they have already saved, without losing control of what goes in, and without any of their data leaving their device unless they explicitly choose backup.

## Positioning

The differentiating mechanism a competitor cannot truthfully copy: **local-first, review-before-fill, with a hard no-auto-submit rule baked into the code** — not a setting. Your memory lives on your device. The product is open source so the privacy claims are verifiable.

Remem is not an AI autofill tool. Deterministic fields are filled from deterministic memory. AI is used only where a question genuinely requires writing, and it never acts without being asked.

## Operating Context

- Job seekers open extension on ATS pages mid-application workflow.
- Multi-step forms across Greenhouse, Lever, Workday, Ashby; also general career-site HTML forms.
- Chrome, Edge, Brave, Arc (Chromium) at launch; Firefox and Safari are roadmap.
- Users may be applying from home, cafés, or transit — extension must be fast and non-intrusive.
- CV/résumé upload for seeding profile facts is supported (Remem extracts facts, shows each for confirmation before saving).
- Multiple profiles supported (e.g., separate profiles per career track or personal vs. business).

## Capabilities and Constraints

**Confirmed capabilities:**

- Local-first storage (browser storage on device). No server copy of user data.
- Deterministic field matching across varied label naming conventions.
- AI writing for genuinely open-ended answers (cover letters, essays, motivation statements). AI needs a network connection; it does not persist memory server-side.
- Optional Google Drive backup: off by default, encrypted on-device before upload, goes to the user's own Drive — never Remem servers.
- Export in a standard readable format, anytime.
- Import from a previous Remem export or from an uploaded CV/résumé.
- Delete everything in one action (local-first means deletion actually deletes it).
- Full offline support for form filling from memory (AI writing requires connectivity).
- Multiple profiles.
- Open-source extension; AI API is closed-source.

**Hard constraints (copy must never violate):**

- Never auto-submits. Hard-coded, not configurable.
- Forms and pages are never uploaded automatically.
- Local data is NOT encrypted at rest — must never claim "encrypted storage" or "encrypted at rest."
- AI only writes open-ended answers; it never decides fact values.
- Backup goes to the user's own Google Drive, never Remem servers.
- The extension currently targets job applications only (ATS platforms). Government, university, insurance, healthcare, checkout forms are roadmap — copy must not claim support for them.

**Open decisions (do not invent):**

- Final domain (temporary: remem.itssvk.dev, a subdomain of the personal site — a proper domain hasn't been bought yet).
- Social links (X, GitHub) are placeholders.
- Launch pricing: core local memory + form fill will be free; AI writing paid plan is the direction but TBD — copy should not commit to specific tiers or prices yet.

## Brand Commitments

- **Name:** Remem
- **Tagline:** "Never repeat yourself."
- **Voice:** Short, confident sentences; no hedging, no superlatives ("supercharge", "revolutionize", "unlock"). Linear/Arc register — direct and factual.
- **Visual identity:** Dark mode first, violet/indigo accent, Outfit (display) + Geist (body), no gradients.
- **Contact:** hello@remem.itssvk.dev
- **Open source extension:** a confirmed, verifiable brand commitment — privacy claims are in the code.

## Evidence on Hand

- No real testimonials, press mentions, or measurable social proof yet — everything is illustrative/placeholder.
- Waitlist exists; no public number to display.
- No ProductHunt listing, GitHub star count, or press coverage to cite at this time.
- Do not fabricate benchmarks, user counts, or testimonials.

## Product Principles

1. **Trust is verified, not promised.** Privacy guarantees live in code you can read, not in policy you have to believe.
2. **You always press submit.** The product never acts on your behalf without an explicit review step — ever.
3. **Facts from memory, writing from AI.** The two modes are kept distinct and named; conflating them would break user trust.
4. **Local-first by default.** No account required. Backup is opt-in. Data portability is non-negotiable.
5. **Earn the repetitive-form category, not the AI-assistant category.** Remem wins by knowing forms, not by having better AI.
