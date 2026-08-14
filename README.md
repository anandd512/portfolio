# Anand Deshpande — Portfolio

A sleek, warm *paper &amp; ink* personal portfolio. Built with **Next.js (App Router, static export)**, **Tailwind CSS**, **Framer Motion**, and **Markdown-driven content**, with a **light/dark toggle**. Designed to be flexible: adding a project or blog post is just dropping in a Markdown file.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export -> ./out
```

## Editing your content

Everything is data-driven — you rarely need to touch component code.

| I want to change… | Edit this |
| --- | --- |
| Name, tagline, hero copy, links, email | [`src/lib/site.ts`](src/lib/site.ts) |
| About text, "How I work" steps | `src/lib/site.ts` |
| Experience / career timeline | `src/lib/site.ts` (`experience`) |
| Nav links | `src/lib/site.ts` (`nav`) |
| Add / edit a **project** | Add a `.md` file in [`content/projects/`](content/projects) |
| Add / edit a **blog post** | Add a `.md` file in [`content/blog/`](content/blog) |
| Colors / theme | `src/app/globals.css` (CSS variables at top) |

### Add a new project

1. Copy [`content/projects/_TEMPLATE.md`](content/projects/_TEMPLATE.md).
2. Rename it — the filename becomes the URL slug (`my-thing.md` → `/projects/my-thing/`).
3. Fill in the frontmatter (title, summary, tags, `order`, optional `demoUrl`, `repoUrl`, `stats`) and write the body in Markdown.

That's it — the card, detail page, and hero stack all update automatically.

### Add a blog post

Drop a `.md` file in `content/blog/` with `title`, `summary`, `date`, and optional `tags`. Set `draft: true` to keep it out of the published list.

## Personalize before launch

- Replace placeholders in `src/lib/site.ts` (email, LinkedIn, GitHub, resume path, experience entries).
- Add `public/resume.pdf` (linked from nav + footer).
- Fill the `[X]` / `[bracketed]` placeholders in the two project Markdown files.
- Set your real domain in `metadataBase` in [`src/app/layout.tsx`](src/app/layout.tsx).

## Deploy to Azure Static Web Apps

A workflow is included at [`.github/workflows/azure-static-web-apps.yml`](.github/workflows/azure-static-web-apps.yml).

1. Push this repo to GitHub.
2. In the Azure Portal, create a **Static Web App** → connect the repo.
   - **App location:** `/`
   - **Output location:** `out`
   - **Build command:** `npm run build`
3. Azure adds the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret automatically. Push to `main` to deploy.

The site is a fully static export (`output: 'export'`), so it also works on Vercel, Netlify, GitHub Pages, or any static host.
