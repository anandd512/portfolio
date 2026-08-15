---
title: Drawesome
summary: A browser-based whiteboard that turns rough ideas into polished diagrams with smart connectors, automatic alignment, and optional AI generation.
year: '2026'
role: Product · Design · Build
order: 2
featured: true
accent: '#2F7D74'
tags:
  - Diagramming
  - Interaction design
  - AI-assisted workflows
demoUrl: https://anandd512.github.io/drawesome
repoUrl: https://github.com/anandd512/drawesome
buildMetrics:
  - label: Time to build
    value: 1 week
  - label: Learning curve
    value: Medium
  - label: Built on
    value: Aug 2026
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

Engineers and PMs explain flows constantly, but diagramming tools force a bad choice: draw quickly and accept a crooked sketch, or spend more time formatting than thinking. The friction is quiet but costly, so diagrams that would clarify an idea often never get made.

I built **Drawesome** to make a clear diagram as fast and forgiving as thinking out loud. It is a browser-based whiteboard where the tool handles alignment, connections, and formatting while the user stays focused on the idea.

## What I built

- **Smart connectors** that attach to shapes and follow them through layout changes.
- **Magnetic guides** that align edges and centers without pixel-by-pixel nudging.
- **Auto-fitting labels** that wrap at a readable size and grow their shape to fit.
- **Text-to-diagram generation** that turns flows such as `Order -> Ship, Invoice, Notify` into a laid-out diagram when an AI model is connected.
- **Quick-node spawning, named frames, presentation mode, images, links, and JSON import/export** for taking a diagram from first thought to a reusable artifact.

> The best diagram is the one you actually make.

## Decisions & trade-offs

- **Tidy by default.** Always-on snapping and sticky tools remove choices that slow down the common workflow.
- **AI stays optional.** The whiteboard is complete without a model; AI controls appear only after one is connected.
- **Grow the shape, not shrink the thought.** Labels wrap at the chosen font size and resize their container rather than becoming unreadably small.
- **Magnetic, not restrictive.** Connector targets and guides help when nearby without trapping the cursor or fighting intentional placement.

## Outcome

Drawesome is a self-hostable, install-free tool that turns an idea into a presentable diagram in seconds. Building it reinforced a product lesson I keep returning to: removing formatting work creates more value than adding formatting options.
