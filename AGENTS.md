# AGENTS.md — AI Context & Content Guide

> **Purpose:** This file gives an AI assistant (or a human) everything needed to understand this
> portfolio site and safely **add or update content** without breaking anything. Read this first.

---

## 1. What this is

A personal portfolio for **Anand Deshpande** — Senior Product Manager (Microsoft) and former software
engineer who builds products with AI-assisted development. Aesthetic is warm **"paper & ink"**
(editorial, no card-game theme), with a **light/dark toggle** and subtle scroll/hover motion.

**Design intent:** Flexible and content-driven. Adding a project or blog post = dropping in a Markdown
file. Never hard-code content into components.

---

## 2. Tech stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router) with **`output: 'export'`** — fully static |
| Language | TypeScript, React 19 |
| Styling | **Tailwind CSS** (config: `tailwind.config.ts`) + CSS variables in `src/app/globals.css` |
| Animation | **Framer Motion** (subtle reveals/hover only) |
| Icons | **lucide-react** |
| Content | **Markdown** in `/content`, parsed with `gray-matter` + rendered via `react-markdown` (+ `remark-gfm`) |
| Theme | **next-themes** (class strategy, light default, system-aware) |
| Fonts | `next/font` — Bricolage Grotesque (display), Instrument Sans (body), Space Mono (mono/labels) |
| Hosting | **Azure Static Web Apps** (workflow in `.github/workflows/azure-static-web-apps.yml`) |

**Build:** `npm run dev` (local) · `npm run build` (static export → `./out`).

---

## 3. Directory map

```
Portfolio/
├─ AGENTS.md                     ← this file
├─ README.md                     ← human quick-start
├─ next.config.mjs               ← output:'export', trailingSlash, images.unoptimized
├─ tailwind.config.ts            ← color tokens → CSS vars, fonts, keyframes
├─ staticwebapp.config.json      ← Azure SWA routing/headers
├─ .github/workflows/azure-static-web-apps.yml
├─ content/                      ← ALL editable content lives here
│  ├─ projects/
│  │  ├─ _TEMPLATE.md            ← copy this to add a project (underscore = ignored)
│  │  ├─ taash-table.md
│  │  └─ pacman.md
│  └─ blog/
│     └─ playable-prototypes.md
├─ public/                       ← static assets; add resume.pdf, og-image.png, favicon here
└─ src/
   ├─ app/                       ← routes (App Router)
   │  ├─ layout.tsx              ← fonts, <ThemeProvider>, <Nav>, global metadata
   │  ├─ page.tsx                ← home: assembles all sections
   │  ├─ globals.css             ← design tokens (light+dark) + prose styles
   │  ├─ not-found.tsx           ← 404
   │  ├─ projects/[slug]/page.tsx← project detail (SSG via generateStaticParams)
   │  └─ blog/
   │     ├─ page.tsx             ← blog index
   │     └─ [slug]/page.tsx      ← post detail (SSG)
   ├─ components/                ← presentational; read data, don't hard-code copy
   │  ├─ Nav.tsx  ThemeToggle.tsx  ThemeProvider.tsx  Reveal.tsx
  │  ├─ Hero.tsx                ← headline + responsive project canvas
   │  ├─ WorkSection.tsx  ProjectCard.tsx
   │  ├─ AboutSection.tsx        ← About + "How I work" loop
   │  ├─ ExperienceSection.tsx   ← career timeline
   │  ├─ WritingTeaser.tsx       ← latest 3 posts on home
   │  ├─ Markdown.tsx            ← shared markdown renderer
   │  └─ Footer.tsx              ← contact CTA + social links
   └─ lib/
      ├─ site.ts                 ← ★ SINGLE SOURCE OF TRUTH for personal data & section copy
      └─ content.ts              ← loads/parses Markdown; defines frontmatter schemas
```

---

## 4. Where content lives (edit these, not components)

### 4a. `src/lib/site.ts` — personal data & prose

Exports you will edit most often:

- **`site`** — `name`, `role`, `tagline`, `heroHeadline` (wrap highlight phrase in `{{ }}`),
  `heroSub`, `email`, `links` (`linkedin`, `github`, `resume` — empty string `''` hides a link),
  `footerNote`.
- **`nav`** — array of `{ label, href }`. Anchor links use `/#id`; pages use `/path`.
- **`about`** — `heading`, `paragraphs[]`, `interests[]` (tag pills).
- **`process`** — the "How I work" steps: `{ title, body }[]`.
- **`experience`** — career timeline (newest first): `{ period, role, org, detail }[]`.

Current real values: name **Anand Deshpande**, email **anandd512@gmail.com**, LinkedIn
**linkedin.com/in/anandd512**, GitHub **github.com/anandd512**. Resume expects
`public/resume.pdf`.

### 4b. `/content/projects/*.md` — projects

One file per project; **filename = URL slug** (`taash-table.md` → `/projects/taash-table/`).
Files starting with `_` are ignored (e.g. `_TEMPLATE.md`). Frontmatter schema
(see `ProjectMeta` in `src/lib/content.ts`):

```yaml
---
title: string            # required
summary: string          # required — one sentence; shown on card + hero
year: '2025'             # string
role: string             # e.g. "Product · Build · Ship"
order: number            # lower = appears first
featured: boolean
accent: '#C05B3F'        # optional dot color on hero stack
tags: [string, ...]
demoUrl: string          # optional — shows "Try it live"
repoUrl: string          # optional — shows "Source"
buildMetrics:
  - { label: 'Time to build', value: '2 weeks' }
  - { label: 'Learning curve', value: 'Medium' }
  - { label: 'Built on', value: 'Jan 2025' }
techStack: [string, ...]
aiModels: [string, ...]
---
Markdown body: ## The story / ## What I built / ## Decisions & trade-offs / ## Outcome
```

### 4c. `/content/blog/*.md` — writing

Filename = slug. Schema (`PostMeta`):

```yaml
---
title: string
summary: string
date: 'YYYY-MM-DD'       # controls sort order (newest first)
draft: boolean           # true = hidden from lists but still builds at its URL
tags: [string, ...]
---
Markdown body
```

`readingTime` is auto-computed — do not set it.

---

## 5. Home page composition

`src/app/page.tsx` renders, in order:
`Hero` → `WorkSection` → `AboutSection` (About + How I work) → `ExperienceSection` →
`WritingTeaser` (latest 3 posts) → `Footer` (contact CTA).

Section anchor IDs (used by nav): `#work`, `#about`, `#experience`, `#writing`, `#contact`.
The Hero project canvas shows **all projects** by `order` in a compact typographic grid.

---

## 6. Design tokens (colors & fonts)

Defined as CSS variables at the top of `src/app/globals.css` — **light** under `:root`,
**dark** under `.dark`. Values are space-separated RGB channels (so `rgb(var(--x) / <alpha>)` works).

| Token | Light | Meaning |
| --- | --- | --- |
| `--paper` / `--paper-deep` | warm off-white | page background |
| `--card` | near-white | card surfaces |
| `--ink` / `--ink-soft` | navy / muted navy | text |
| `--accent` / `--accent-soft` | clay/rust | highlights, CTAs |

Tailwind maps these to `bg-paper`, `text-ink`, `text-ink-soft`, `bg-card`, `text-accent`, etc.
(see `tailwind.config.ts`). **To recolor the whole site, edit the variables — not components.**
Markdown output is styled by the `.prose-ink` rules in `globals.css`.

---

## 7. How to make common changes (recipes)

- **Add a project:** copy `content/projects/_TEMPLATE.md` → rename to `my-slug.md` → fill
  frontmatter (`order` decides position) + body. Nothing else needed; card, hero stack, and
  detail page update automatically.
- **Add a blog post:** create `content/blog/my-post.md` with `title`, `summary`, `date`. Set
  `draft: true` to keep it unlisted.
- **Edit hero / tagline / links:** `src/lib/site.ts` → `site`.
- **Edit About / How-I-work / Experience:** `src/lib/site.ts` → `about` / `process` / `experience`.
- **Change nav items:** `src/lib/site.ts` → `nav`.
- **Recolor / theme:** `src/app/globals.css` CSS variables (both `:root` and `.dark`).
- **Add a whole new section:** create a component in `src/components/`, read its copy from
  `src/lib/site.ts`, then place it in `src/app/page.tsx`; add an anchor id + a `nav` entry.

---

## 8. Conventions & guardrails

- **Content is data.** Put copy in `src/lib/site.ts` or `/content` Markdown — never hard-code
  strings into components.
- **Motion is subtle.** Reuse the `Reveal` component; respect `prefers-reduced-motion` (already
  handled globally and in `Reveal`).
- **Static-export safe:** no server-only runtime APIs, no dynamic server rendering, no
  `next/image` optimization (images are `unoptimized`). Dynamic routes must keep their
  `generateStaticParams`. In Next 16, route `params` is a **Promise** — `await` it.
- **Links:** external links open in a new tab with `rel="noopener noreferrer"`. Internal links
  use trailing slashes (e.g. `/projects/pacman/`) to match `trailingSlash: true`.
- **Accessibility:** keep focus-visible outlines, aria-labels on icon buttons, and semantic
  headings.
- **After content/code changes**, run `npm run build` to confirm the static export succeeds.

---

## 9. Facts about Anand (for accurate copy)

- **Now:** Senior Product Manager at **Microsoft** (since 2024), based in Bangalore and focused on
  security against **non-human & AI-agent identity** threats. Joined Microsoft in 2021 as Product
  Manager 2 and was founding PM for **App Governance**, taking it 0→1 into **Microsoft Defender**
  and protecting **45K+ enterprise customers**.
- **Before:** Senior Software Engineer at **CouponDunia** (acq. Times Group), Mumbai, 2016–2019.
- **Education:** PGDM (MBA) from **XLRI Jamshedpur**; B.Tech CSE from **VNIT Nagpur**.
- **Based in:** Bangalore, India.
- **Projects:** *CardArena* (real-time multiplayer platform for Indian card games — Judgement,
  Dehla Pakad) and *Pacman, Rebuilt* (AI-assisted learning project).
- **Voice:** builder-who-ships; concrete over abstract; playable over described; humble but
  outcome-driven. Avoid buzzword-heavy marketing tone.

---

# 10. FULL SITE CONTENT (verbatim)

> Everything the live site displays, reproduced here so this single file is self-contained.
> If you change copy here, mirror it into the source of truth noted in each subsection (and vice
> versa). Source of truth for sections 10.1–10.7 is `src/lib/site.ts`; for 10.8–10.9 it is the
> Markdown files under `/content`.

## 10.1 Hero — *(src/lib/site.ts → `site`)*

- **Name:** Anand Deshpande
- **Role:** Senior Product Manager
- **Tagline:** A product builder & tinkerer.
- **Headline:** I build products — *sometimes for millions, sometimes just to see if I can.*
  (the italic phrase is the highlighted span, wrapped as `{{ }}` in source)
- **Sub-headline:** I work on security products at Microsoft. Outside work, I use AI-assisted
  development to explore ideas, build small experiments, and learn by making.
- **Buttons:** "See the work" (→ `#work`) · "LinkedIn" (→ linkedin.com/in/anandd512)
- **Hero visual:** a responsive typographic canvas of all projects (by `order`).

## 10.2 Navigation — *(src/lib/site.ts → `nav`)*

`Work` → /#work · `About` → /#about · `Experience` → /#experience · `Writing` → /blog

## 10.3 Contact & links — *(src/lib/site.ts → `site`)*

- **Email:** anandd512@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/anandd512
- **GitHub:** https://github.com/anandd512
- **Resume:** `/resume.pdf` (expects `public/resume.pdf`)
- **Location:** Bengaluru, India

## 10.4 About — *(src/lib/site.ts → `about`)*

**Heading:** The best PMs build enough to earn an engineer's trust.

**Paragraphs:**
1. I'm Anand — Senior Product Manager, former software engineer, computer-engineering background.
   I've spent my career at the intersection of deeply technical products and the humans who
   actually have to use them.
2. Outside work, I build — because prototyping an idea teaches you more about it than any document
   ever will. AI-assisted development turned my "someday" list into a "this weekend" list.
3. I believe the best PMs can build enough to earn an engineer's trust, and communicate enough to
   earn everyone else's. This site is my attempt to prove the first half.

**Interest tags:** Systems thinking · Game mechanics · Rapid prototyping · Puzzles

## 10.5 How I work — *(src/lib/site.ts → `process`)*

1. **Feel the problem** — Be my own first user. If the itch isn't real, the product won't be either.
2. **Prototype fast** — A working demo beats a beautiful doc. AI just makes "fast" faster.
3. **Real users, early** — Put it in front of people who'll break it — then watch, don't explain.
4. **Let usage decide** — Opinions argue. Usage settles. Rank, cut, and double down accordingly.

## 10.6 Experience timeline — *(src/lib/site.ts → `experience`, newest first)*

**Heading:** The work changed. The curiosity stayed.

| Period | Role | Org | Location | Detail |
| --- | --- | --- | --- | --- |
| 2024 — Present | Senior Product Manager | Microsoft | Bangalore | Leading security against non-human and AI agent identity threats in Microsoft Defender. |
| 2021 — 2024 | Product Manager 2 | Microsoft | Hyderabad | Founding PM for App Governance — took it 0→1 into Microsoft Defender, now protecting 45K+ enterprise customers. |
| 2019 — 2021 | PGDM, Business Management | XLRI | Jamshedpur | Studied business management after working as a software engineer, widening the lens from building systems to shaping products. |
| 2016 — 2019 | Senior Software Engineer | CouponDunia (acq. Times Group) | Mumbai | Built consumer-scale services — gamification (+24% transactions), a 5M+ subscriber marketing platform, and a homepage rebuild (2.4s → 350ms). |
| 2012 — 2016 | B.Tech, Computer Science & Engineering | Visvesvaraya National Institute of Technology | Nagpur | Learned the foundations of software engineering and how to turn ideas into working systems. |

## 10.7 Footer / contact CTA — *(src/lib/site.ts → `site.footerNote` + Footer.tsx)*

- **CTA heading:** Let's talk ↗ (links to email)
- **CTA sub:** Building something, or just want to compare notes on product and
  AI-assisted development? I'm easy to reach.
- **Footer note:** Built with Next.js & AI — reviewed by a human.

---

## 10.8 Projects — *(source of truth: `/content/projects/*.md`)*

### Project 1 — CardArena  ·  slug: `taash-table`  ·  `/projects/taash-table/`

**Frontmatter**
- summary: A real-time multiplayer platform for the Indian card games we grew up on — Judgement and
  Dehla Pakad — built so scattered friends could play at the same table again.
- year: 2025 · role: Product · Build · Ship · order: 1 · featured: true · accent: `#C05B3F`
- tags: Real-time multiplayer · Platform architecture · Zero-to-one
- demoUrl: `https://cardgames-app-2026-cefpbchdg8c3hrdr.centralindia-01.azurewebsites.net/` · repoUrl: `https://github.com/anandd512/cardgames`
- build: `8 weeks` · learning curve: `High` · built on: `2025`
- tech stack: React · Node.js · Socket.IO · Azure App Service
- AI models: Claude Sonnet · Claude Opus 4.8 · GPT 5.4–5.6

**Body**

> **The story**
> In college, my friends and I lost entire evenings to **Judgement** and **Dehla Pakad (collect the
> tens)** — card games with deep cultural pull in India, passed down across generations. Then we
> graduated, scattered to different cities, and the group chat stayed active while the card table
> didn't.
>
> When I looked for a good online version, I found a gap: games millions of people grew up on had
> almost no great digital home. Global platforms cover Poker and Solitaire endlessly — but the games
> *we* actually played? Barely anything worth sending to a friend.
>
> So I built it — not as "a card game app," but as a way back to the table.
>
> **What I built**
> - A **real-time multiplayer platform**, with individual games as content on top — adding a new
>   game is a content problem, not a rebuild.
> - **Shareable room links** as the hero feature: start a table, drop the link in the group chat,
>   and play within a minute.
> - **Live game-state sync**: turn enforcement, hand privacy, and graceful rejoins for the friend
>   whose Wi-Fi always drops mid-hand.
> - **Two launch games chosen deliberately** — beloved, underserved, and the ones my own group
>   wanted most. I was user zero.
>
> *Pull-quote:* Minimize the distance between "remember when we used to play?" and actually playing.
>
> **Decisions & trade-offs**
> - **Platform over app.** Game-agnostic infrastructure took longer upfront, but game #3 will cost a
>   fraction of game #1.
> - **Friction over features.** I cut everything from the MVP that stood between a shared link and a
>   dealt hand.
> - **[Your one real technical trade-off here — e.g., authoritative server vs. client trust, and
>   why.]** *(placeholder to fill)*
>
> **Outcome**
> The original success metric was simple: my college group plays together again. Met. Now it's about
> widening the table — more games, more groups, same one-minute path from link to first hand.

### Project 4 — Pacman, Rebuilt  ·  slug: `pacman`  ·  `/projects/pacman/`

**Frontmatter**
- summary: The scoped learning project where I figured out where AI-assisted development genuinely
  shines — and where a builder's judgment is still irreplaceable.
- year: 2024 · role: Learning · Build · order: 4 · featured: true · accent: `#E0A03C`
- tags: Learning project · Game mechanics · AI-assisted dev
- demoUrl: _(empty)_ · repoUrl: `https://github.com/anandd512/PACMAN`
- build: `1 week` · learning curve: `High` · built on: `2024`
- tech stack: JavaScript · HTML Canvas · CSS
- AI models: Claude Sonnet · Claude Opus 4.8 · GPT 5.4–5.6

**Body**

> **The story**
> When AI-assisted development got genuinely good, I didn't want to read about it — I wanted to feel
> where it shines and where it fails. So I picked a scoped, well-understood problem with hidden
> depth: **Pacman**.
>
> It looks simple. It isn't. The original's ghosts each run different pursuit logic — one chases you,
> one ambushes ahead of you, one is unpredictable — and that interplay is what makes the game feel
> alive. Recreating it meant getting collision handling, tile-grid movement, and ghost state
> machines genuinely right.
>
> **What it taught me**
> - **Directing AI like a senior engineer directs a team** — clear specs in, working code out,
>   review everything.
> - **Where AI accelerates** (boilerplate, well-documented patterns) **and where judgment is
>   irreplaceable** (game feel, edge cases, architecture).
> - **Confidence.** Shipping this is what convinced me the multiplayer platform was achievable — one
>   milestone at a time.
>
> **Outcome**
> A fully playable game — and a new build capability I've used on every project since. *(The arrow
> keys still work.)*

---

## 10.9 Writing / blog — *(source of truth: `/content/blog/*.md`)*

### Post 1 — Why I ship playable prototypes instead of decks  ·  slug: `playable-prototypes`

**Frontmatter**
- summary: A short note on why a working demo teaches you more about an idea than any document — and
  how AI collapsed the cost of finding out.
- date: 2026-06-01 · draft: false · tags: Product · Building

**Body**

> Most product ideas die in a doc. They read well, get a few nods in review, and quietly never
> happen. The ones that survive tend to have one thing in common: someone built enough of the thing
> that you could actually *use* it.
>
> **Documents describe. Prototypes reveal.**
> A spec can hide a hundred unanswered questions behind confident prose. A prototype can't. The
> moment you try to click through it, the hand-waved parts collapse — and that collapse is the most
> valuable feedback you'll get.
>
> **AI changed the math**
> The reason we defaulted to documents was cost. Building was expensive and slow, so we argued on
> paper first. AI-assisted development changes that trade: a rough-but-real version now costs days,
> not quarters. When the cost of *trying* drops below the cost of *debating*, you should just try.
>
> *Pull-quote:* If it's cheaper to build the answer than to argue about it, build the answer.
>
> That's the whole philosophy behind this site. Everything here is real, playable, and occasionally
> broken — because that's what honest work looks like while it's still being figured out.
