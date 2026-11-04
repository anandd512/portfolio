---
# ---------------------------------------------------------------------------
# PROJECT TEMPLATE — copy this file, rename it (the filename becomes the URL
# slug, e.g. my-project.md -> /projects/my-project/), and fill it in.
# Files starting with "_" are ignored, so this template never publishes.
# ---------------------------------------------------------------------------
title: Project Title
summary: One sentence that explains what it is and why it matters.
date: '2026-01'            # 'YYYY-MM', shown as "Jan 2026"
role: Product · Build · Ship
status: Live            # short chip text: Live, Windows app, Playable here...
order: 99               # lower numbers appear first
featured: false         # true = wide tile on the home page and in the hero stack
accent: '#C05B3F'       # tints the card, screenshot frame and labels
tags:
  - Tag One
  - Tag Two
cover:                  # put images in public/projects/<slug>/ (1600x1000 WebP works well)
  src: /projects/my-project/cover.webp
  alt: Describe what the screenshot shows.
gallery:                # optional extra screenshots on the detail page
  - src: /projects/my-project/second.webp
    alt: Describe the screenshot.
    caption: Optional one-line caption.
glance:                 # the PM-lens "At a glance" panel. Any field can be omitted.
  problem: What was broken, for whom.
  user: Who it's for.
  bet: The one assumption the product rests on.
  cut: What you deliberately left out.
  outcome: What happened.
demoUrl: https://your-live-demo.example.com   # optional; shows a "Try it" button
demoLabel: Try it live                        # optional; customize for installs, downloads, etc.
repoUrl: https://github.com/you/repo          # optional; shows "Source"
embedUrl: /play/my-project/                   # optional; embeds a playable demo on the page
buildMetrics:
  - label: Built in
    value: 2 weeks
  - label: Runs on
    value: Any browser
techStack:
  - TypeScript
  - React
aiModels:               # optional; only list models you actually used
  - Model name
---

## The story

Set the scene. What problem, for whom, and why you cared enough to build it.

## What I built

- Bullet the key capabilities.
- Keep them outcome-oriented, not feature dumps.

## Decisions & trade-offs

- The interesting product or engineering call you made, and why.

> A pull-quote: the one line you'd want a hiring manager to remember.

## Outcome

What happened. What you learned.

## What's next

Optional. The honest next step.
