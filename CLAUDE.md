# CLAUDE.md

Full project context lives in [AGENTS.md](AGENTS.md) — it's filled in; read it for stack, conversion goal, design decisions, and structure.

## Sibling Repos

This repo (`remem-web`) is the public marketing/product website for Remem — its own brand-register surface, distinct from the product itself (see `remem/PRODUCT.md`'s "Product Purpose" note). It is not the browser extension and not the backend API. It's checked out under the same project root as two sibling repos, not as a subfolder of either:

- **`remem`** — the open-source browser extension/frontend. Its `PRODUCT.md` is the source of truth for positioning, users, brand personality, and anti-references this site should reflect. Its `DESIGN.md` covers the extension's own visual system — this site may end up sharing that system or may get its own; don't assume either way until it's decided.
- **`remem-api`** — the closed-source backend the extension talks to. Not expected to be directly relevant to a marketing site, but check there if this site ever needs to hit a real endpoint (e.g. a waitlist signup, a live user count).

Both are separate git repos, checked out as sibling directories next to this one (currently named `remem` and `remem-api` locally) — normal absolute paths, look for them yourself rather than assuming they're out of reach. Ask the user for a path only if you can't find it.

Use bun as package manager
