# chrisbenderdev

Personal portfolio site for Chris Bender, built on the [Magic UI portfolio template](https://github.com/magicuidesign/portfolio) (Next.js, shadcn/ui, Magic UI, Tailwind CSS v4).

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where things live

| What | Where |
|---|---|
| All site content: name, bio, skills, work, projects, socials | `src/data/resume.tsx` |
| Blog posts (MDX, compiled by content-collections) | `content/*.mdx` |
| Avatar and other static files | `public/` |
| Home page sections | `src/app/page.tsx` and `src/components/section/` |
| Theme tokens | `src/app/globals.css` |

The Education and Hackathons sections render only when their arrays in `resume.tsx` have entries.

## Scripts

| Command | |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |

## Upstream

Imported from magicuidesign/portfolio at commit `5ef12e4` (2026-01-13). MIT licensed; see `LICENSE`.
