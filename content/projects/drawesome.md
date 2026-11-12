---
title: Drawesome
summary: A browser whiteboard that turns rough ideas into tidy diagrams, with smart connectors, magnetic alignment, and optional text-to-diagram.
date: '2026-08'
role: Product · Design · Build
status: Live
order: 3
featured: false
accent: '#2F7D74'
tags:
  - Diagramming
  - Interaction design
  - AI-assisted workflows
cover:
  src: /projects/drawesome/cover.webp
  alt: A hand-drawn style flow diagram in Drawesome, from Itch to Prototype to Real users, branching to Keep, Cut and Rethink, with the style panel open.
gallery:
  - src: /projects/drawesome/clean.webp
    alt: The same diagram in Drawesome's clean theme with crisp lines.
    caption: Sketchy when you're thinking, clean when you're presenting. One toggle.
glance:
  problem: Diagramming tools make you choose between drawing fast and getting a crooked sketch, or formatting for longer than you think.
  user: Anyone who explains how things flow, for work or for fun. Me included.
  bet: If the tool handles alignment and connections, people will actually make the diagram.
  cut: Formatting options. Tidy by default beats infinitely configurable.
  outcome: An install-free tool that goes from idea to presentable diagram in seconds.
demoUrl: https://anandd512.github.io/drawesome/
demoLabel: Open the whiteboard
repoUrl: https://github.com/anandd512/drawesome
buildMetrics:
  - label: Built in
    value: 1 week
  - label: Runs on
    value: Any modern browser
  - label: AI features
    value: Optional
techStack:
  - React 18
  - TypeScript
  - Vite 5
  - Zustand
  - roughjs
  - perfect-freehand
  - Tailwind CSS
aiModels:
  - Claude Sonnet
  - Claude Opus 4.8
  - GPT 5.4–5.6
---

## The story

I'm forever sketching how things flow: requests, user journeys, who calls what. And every diagramming tool I tried made me pick between two bad options. Draw quickly and live with a crooked sketch, or spend more time nudging boxes than thinking about the idea. The friction is small but it adds up, so the diagram that would have cleared things up often never gets drawn.

I built **Drawesome** to make a clear diagram as quick and forgiving as thinking out loud. The tool handles alignment, connections and formatting, so I can stay on the idea.

## What I built

- **Smart connectors** that attach to shapes and follow them as you move things around.
- **Magnetic guides** that line up edges and centers without pixel-by-pixel nudging.
- **Auto-fitting labels** that wrap at a readable size and grow the shape to fit.
- **Text-to-diagram**: describe a flow like `Order -> Ship, Invoice, Notify` and get a laid-out diagram, once you connect an AI model.
- **Quick-node spawning, named frames, presentation mode, images, links, and JSON import/export**, to take a diagram from first thought to something you can reuse.

> The diagram you actually draw beats the perfect one you don't.

## Decisions & trade-offs

- **Tidy by default.** Snapping is always on and tools stay selected, which removes the choices that slow down the common case.
- **AI stays optional.** The whiteboard is complete without a model. AI controls only appear once you connect one.
- **Grow the shape, not shrink the thought.** Labels wrap at the chosen font size and resize their container instead of shrinking into unreadable text.
- **Magnetic, not restrictive.** Guides and connector targets help when you're close, and get out of the way when you place something on purpose.

## Outcome

A self-hostable, install-free tool that turns an idea into a presentable diagram in seconds. It reinforced a product lesson I keep relearning: removing formatting work creates more value than adding formatting options.
