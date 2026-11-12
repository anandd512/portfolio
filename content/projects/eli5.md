---
title: ELI5
summary: A browser extension that explains unfamiliar terms right where you're reading, at the depth you need, using your own AI model.
date: '2026-08'
role: Product · Design · Build
status: Chrome & Edge extension
order: 4
featured: false
accent: '#3976A8'
tags:
  - Browser extension
  - Learning tools
  - Privacy by design
cover:
  src: /projects/eli5/cover.webp
  alt: ELI5's side panel next to an article, explaining the term OAuth in five sections from a simple analogy to technical detail.
gallery:
  - src: /projects/eli5/in-context.webp
    alt: A full browser window with an admin guide on the left and the ELI5 side panel explaining OAuth on the right.
    caption: The whole point. The explanation sits next to what you're reading, not in a new tab.
glance:
  problem: Looking up a term means leaving the page, losing focus, and landing on an answer that's either too shallow or too dense.
  user: Anyone reading outside their comfort zone, which is everyone, some of the time.
  bet: Bring the explanation to the reader, and let them slide between simple and deep without starting over.
  cut: A backend. Your key, your model, your device.
  outcome: A reading companion that turns one-off lookups into a personal glossary.
demoUrl: https://github.com/anandd512/ELI5#setup
demoLabel: Install (2 min)
repoUrl: https://github.com/anandd512/ELI5
buildMetrics:
  - label: Built in
    value: 1 week
  - label: Runs on
    value: Chrome & Edge
  - label: Model
    value: Your own Azure OpenAI
techStack:
  - JavaScript
  - HTML
  - CSS
  - Chrome Extension APIs
  - Azure OpenAI
aiModels:
  - Claude Sonnet
  - Claude Opus 4.8
  - GPT 5.4–5.6
---

## The story

The internet is full of acronyms and jargon. Every time I hit an unfamiliar term, looking it up meant leaving the page, breaking focus, and landing on an answer that was either a one-liner or a textbook.

So I built **ELI5**, a browser extension that brings the explanation to me instead. Select a term, right-click, and a side panel streams an explanation next to the page: a plain-language version, the technical detail, examples, notes, and reputable links.

## What I built

- **Right-click and typed lookups**, for terms on the page and ones you just thought of.
- **Five-part answers** that pair a simple on-ramp with accurate technical depth.
- **Simpler, Standard and Deeper controls**, plus contextual follow-up questions.
- **Pins, history, and Markdown/CSV export**, which turn one-off lookups into a personal glossary.
- **Bring-your-own Azure OpenAI model**, with credentials stored locally and no application backend.
- **Streaming, safe rendering, guided onboarding and human-readable errors**, so it feels instant and trustworthy.

> The best explanation is the one you don't have to leave the page for.

## Decisions & trade-offs

- **Depth is a slider, not a setting.** Showing the simple and technical versions together serves newcomers and experts without forcing a choice before you understand the term.
- **Accuracy beats charm.** Analogies only appear when they genuinely help. Forcing one for every proper noun produced memorable but misleading answers.
- **Privacy is part of the product.** You connect your own model, and your credentials and history stay on your device.
- **Respect the browser's rules.** The side panel opens synchronously on the click, then starts the lookup, which keeps the flow working within Chromium's constraints.

## Outcome

A Chromium extension that cuts the context-switching out of reading and turns fleeting questions into a reusable learning history. The product insight that stuck: the right explanation isn't simpler or deeper. It's the one that lets you move between both without losing your place.

## What's next

Today it installs as an unpacked extension. A Chrome Web Store listing would make it a one-click install.
