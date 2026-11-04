# AGENTS.md — AI Context & Content Guide

> **Purpose:** This file gives an AI assistant (or a human) everything needed to understand this
> portfolio site and safely **add or update content** without breaking anything. Read this first.

---

## 1. What this is

A personal portfolio for **Anand Deshpande**, a product builder and tinkerer in Bengaluru who builds
small, real products with AI-assisted development. The site is about **side projects only**.

> **Hard rule: no professional-life information.** Never add employer names, job titles, career
> history, work projects, education, or résumé links to the site, its metadata, or this repo.

**Design:** modern, minimal, slick. Near-white / near-black neutrals, one clay accent, Geist for text,
Instrument Serif italics for playful highlights, real product screenshots, light/dark toggle, and
subtle CSS-only motion.

**Voice:** humble, fun, a little quirky, always respectful. Concrete over abstract, playable over
described. First person. Avoid buzzwords and heavy em-dash use.

---

## 2. Tech stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router) with **`output: 'export'`**, fully static |
| Language | TypeScript, React 19 |
| Styling | **Tailwind CSS** (`tailwind.config.ts`) + CSS variables in `src/app/globals.css` |
| Motion | **CSS only**: scroll-driven `.reveal`, `.rise` entrance, View Transitions for the theme switch |
| Icons | **lucide-react** |
| Content | **Markdown** in `/content`, parsed with `gray-matter`, rendered at build time via `react-markdown` + `remark-gfm` |
| Theme | **next-themes** (class strategy, light default, system-aware) |
| Fonts | Self-hosted via `next/font/local` in `src/app/fonts/`: Geist, Geist Mono, Instrument Serif |
| Hosting | **Azure Static Web Apps** (`.github/workflows/azure-static-web-apps.yml`, `staticwebapp.config.json`) |

**Build:** `npm run dev` · `npm run build` (static export → `./out`, plus `scripts/flatten-rsc-segments.mjs`) · `npm run typecheck`.

---

## 3. Directory map

```
portfolio/
├─ AGENTS.md / README.md
├─ docs/                          ← README screenshots of the site
├─ next.config.mjs                ← output:'export', trailingSlash, images.unoptimized
├─ tailwind.config.ts             ← color tokens → CSS vars, fonts, radius
├─ staticwebapp.config.json       ← Azure SWA: security headers, 404, caching
├─ scripts/flatten-rsc-segments.mjs ← post-build fix so Next 16 prefetches don't 404
├─ content/
│  ├─ projects/                   ← one .md per project (filename = slug); _TEMPLATE.md is ignored
│  └─ blog/
├─ public/
│  ├─ projects/<slug>/*.webp      ← project screenshots (1600×1000)
│  ├─ og/*.png                    ← 1200×630 social preview images (home + one per project)
│  └─ play/pacman/                ← the playable Pacman game, embedded on its project page
└─ src/
   ├─ app/                        ← layout, home, project + blog routes, sitemap, robots, icon, fonts
   ├─ components/
   │  ├─ Nav.tsx                  ← wordmark, active-section highlight, mobile menu, "Say hi"
   │  ├─ Hero.tsx                 ← headline, proof numbers, "Now" line, fanned screenshot stack
   │  ├─ WorkSection.tsx + ProjectCard.tsx ← bento grid of side projects
   │  ├─ PrinciplesSection.tsx    ← "How I think", each principle with a receipt link
   │  ├─ AboutSection.tsx, WritingTeaser.tsx
   │  ├─ Footer.tsx + CopyEmail.tsx ← contact CTA with copy-to-clipboard toast
   │  └─ Reveal.tsx, Markdown.tsx, ThemeToggle.tsx, ThemeProvider.tsx
   └─ lib/
      ├─ site.ts                  ← ★ SINGLE SOURCE OF TRUTH for personal data & section copy
      └─ content.ts               ← loads/parses Markdown; ProjectMeta / PostMeta schemas
```

---

## 4. Where content lives (edit these, not components)

### 4a. `src/lib/site.ts`

- **`site`**: `name`, `firstName`, `title`, `location`, `url`, `description`, `heroHeadline` (wrap the
  serif-italic phrase in `{{ }}`), `heroSub`, `proof[]` (big numbers; `value: 'projects'` becomes the
  live project count), `now[]`, `email`, `links` (`linkedin`, `github`; empty string hides a link),
  `contact`, `footerNote`.
- **`nav`**: `{ label, href, id? }[]`. `id` matches a home section for the active highlight.
- **`work`**, **`principlesSection`** + **`principles`**, **`about`**, **`writing`**.

### 4b. `/content/projects/*.md`

Filename = URL slug. Schema (`ProjectMeta` in `src/lib/content.ts`; see `_TEMPLATE.md`):

```yaml
title, summary, role
date: 'YYYY-MM'           # shown as "Mar 2026"
status: string            # short chip: "Live", "Windows + iOS", "Playable here"
order: number             # lower = first; first three with covers appear in the hero stack
featured: boolean         # true = wide bento tile
accent: '#hex'            # tints card, screenshot frame, labels
tags: [string]
cover: { src, alt }
gallery: [{ src, alt, caption? }]
glance: { problem, user, bet, cut, outcome }   # "At a glance" panel
demoUrl, demoLabel, repoUrl
embedUrl                  # optional playable iframe; replaces the cover on the detail page
buildMetrics: [{ label, value }]
techStack: [string]
aiModels: [string]        # only models actually used
```

Body: `## The story` / `## What I built` / `## Decisions & trade-offs` / `> pull-quote` /
`## Outcome` / optional `## What's next`.

### 4c. `/content/blog/*.md`

`title`, `summary`, `date: 'YYYY-MM-DD'`, `draft`, `tags`. `readingTime` is auto-computed.

### 4d. Screenshots and social images

- Project screenshots: `public/projects/<slug>/`, 1600×1000 WebP. Use demo data, never real personal data.
- Social previews: `public/og/home.png` and `public/og/<slug>.png`, 1200×630. Regenerate when a
  project's title, summary, status, date or cover changes.

---

## 5. Home page composition

`src/app/page.tsx`: `Hero` → `WorkSection` (#work) → `PrinciplesSection` (#principles) →
`AboutSection` (#about) → `WritingTeaser` (#writing) → `Footer` (#contact).

---

## 6. Design system

Tokens are CSS variables at the top of `src/app/globals.css` (`:root` light, `.dark` dark), as RGB
channels so `rgb(var(--x) / <alpha>)` works. Tailwind maps them to `paper`, `paper-deep`, `card`,
`ink`, `ink-soft`, `line`, `accent`, `accent-soft`, and `project` (per-project accent via `--project`).

| Token | Light | Dark |
| --- | --- | --- |
| `--paper` | #FAFAF8 | #0B0C0F |
| `--card` | #FFFFFF | #16181E |
| `--ink` / `--ink-soft` | #111318 / #585E6B | #EDEDEF / #9EA3AF |
| `--accent` | #C94A26 (clay) | #F07A52 |

- `.inverse` keeps dark panels (footer) dark in both themes.
- Atoms: `.wrap`, `.eyebrow`, `.section-title`, `.serif-accent`, `.btn`, `.btn-primary`, `.btn-ghost`,
  `.chip`, `.card`, `.link-underline`, `.prose-ink`.
- Motion: `.reveal` (scroll-driven, CSS only) and `.rise` (entrance, `--rise-delay`). Content is always
  visible without JS; reduced motion disables all animation.

---

## 7. Recipes

- **Add a project:** copy `_TEMPLATE.md`, add screenshots to `public/projects/<slug>/`, fill
  frontmatter. Card, hero stack, detail page and sitemap update automatically. Add `public/og/<slug>.png`.
- **Add a blog post:** create `content/blog/my-post.md`.
- **Edit hero / proof / Now line:** `site.ts` → `site`.
- **Recolor:** CSS variables in `globals.css` (both `:root` and `.dark`).
- **New section:** component in `src/components/`, copy in `site.ts`, place in `page.tsx`, add an
  `id` and a `nav` entry.

---

## 8. Conventions & guardrails

- **No professional-life info** (see section 1).
- **Content is data.** Copy lives in `site.ts` or `/content`, never hard-coded in components.
- **Accuracy over flattery.** Only claim what's true; verify against the project repos (tech stack,
  dates, AI models from commit trailers). Never invent metrics or user numbers.
- **Static-export safe:** no server runtime APIs; dynamic routes keep `generateStaticParams`;
  `params` is a Promise in Next 16; metadata routes use `dynamic = 'force-static'`.
- **Links:** external links open in a new tab with `rel="noopener noreferrer"` and use ↗; internal
  links use trailing slashes and →.
- **Accessibility:** skip link, focus-visible outlines, aria-labels on icon buttons, semantic headings,
  alt text on every screenshot, AA contrast.
- **CSP:** `staticwebapp.config.json` allows only same-origin scripts, styles, images, fonts and
  frames. Adding a third-party script or font requires updating the CSP.
- **After changes**, run `npm run build`.

---

## 9. Projects at a glance

| Order | Title (slug) | Status · Date | Featured | Demo | Repo |
| --- | --- | --- | --- | --- | --- |
| 0 | Artha (`wealth-manager`) | Windows + iOS · Oct 2026 | yes | GitHub releases ("Download for Windows") | anandd512/wealth-manager |
| 1 | CardArena (`taash-table`) | Live · Mar 2026 | yes | Azure App Service ("Play now") | anandd512/cardgames |
| 2 | Drawesome (`drawesome`) | Live · Aug 2026 | no | anandd512.github.io/drawesome | anandd512/drawesome |
| 3 | ELI5 (`eli5`) | Chrome & Edge extension · Aug 2026 | no | GitHub setup ("Install (2 min)") | anandd512/ELI5 |
| 4 | Pacman, Rebuilt (`pacman`) | Playable here · Aug 2025 | no | /play/pacman/ (embedded) | anandd512/PACMAN |

Facts verified against the repos:

- **Artha:** Windows (Electron) + iOS (Expo / React Native). Optional zero-knowledge sync via Azure
  Functions + Cosmos DB (server only sees ciphertext). AI models from commit history. Live stock price
  sync was removed, so it is not claimed.
- **CardArena:** plain JavaScript client + Node/Express/Socket.IO. Server-authoritative state with
  per-seat views; bots take over dropped seats; rooms are in memory.
- **Drawesome:** text-to-diagram requires a connected AI model.
- **Pacman:** DOM grid (not canvas). Red ghost chases, pink ambushes, cyan mostly wanders.

The full copy for each project lives in its Markdown file; the full site copy lives in `src/lib/site.ts`.
