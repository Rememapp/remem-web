# remem-web

Marketing website for [Remem](../remem) — a privacy-first browser memory. **Never repeat yourself.**

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn-style components,
Motion, React Hook Form, and Zod. Deploys to Vercel.

## Development

```sh
bun install
bun run dev        # http://localhost:3000
```

Other scripts:

```sh
bun run build      # production build
bun run start      # serve the production build
bun run lint       # eslint
bun run typecheck  # tsc --noEmit
bun run format     # prettier
```

## Configuration

Copy `.env.example` to `.env.local`. Everything is optional in development:

| Variable                                | Purpose                                                                     |
| --------------------------------------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                  | Canonical site URL (sitemap, OG, RSS). Defaults to `https://remem.app`.     |
| `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` | Waitlist storage via Resend Audiences. Dev fallback: `.data/waitlist.json`. |
| `CONTACT_TO_EMAIL`                      | Contact-form delivery via Resend. Unset: logs to the server console.        |

## Content

- Changelog entries: `content/changelog/*.md` (frontmatter: `version`, `title`, `date`)

New files appear automatically in `/changelog`.

See [AGENTS.md](AGENTS.md) for architecture and design decisions.
