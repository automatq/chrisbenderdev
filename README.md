# chrisbenderdev

Personal portfolio site, built on [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) (Once UI + Next.js). It has an MDX-based content system for projects and blog posts, an about / CV page and a gallery.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where things live

| What | Where |
|---|---|
| Site config (domain, routes, theme, fonts, effects) | `src/resources/once-ui.config.ts` |
| Content (person, social links, page copy) | `src/resources/content.tsx` |
| Blog posts | `src/app/blog/posts/*.mdx` |
| Projects | `src/app/work/projects/*.mdx` |
| Images | `public/images/` |
| Once UI conventions for agents | `.agents` |

Set `baseURL` in `once-ui.config.ts` to the production domain. It is used for SEO meta tags, Open Graph images and the sitemap.

## Password-protected pages

List the paths in `protectedRoutes` in `src/resources/once-ui.config.ts`, then set these environment variables (see `.env.example`):

| Variable | |
|---|---|
| `PAGE_ACCESS_PASSWORD` | The password visitors enter. |
| `PAGE_ACCESS_SECRET` | A long random string (for example `openssl rand -base64 32`) that signs the access cookie. Recommended; without it a key derived from the password is used, so changing the password signs everyone out. |

Protection runs on the server: `src/proxy.ts` and the blog and work pages check the signed, HttpOnly cookie that `/api/authenticate` sets (valid for one hour), so a protected page's content is never sent without the password.

## Scripts

| Command | |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |

## Upstream

Template docs: [docs.once-ui.com](https://docs.once-ui.com/docs/magic-portfolio/quick-start). Imported from magic-portfolio v2.3.0 (commit `bee2f1b`). The template is MIT licensed; see `LICENSE`.
