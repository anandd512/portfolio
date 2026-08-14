---
title: ELI5
summary: A browser extension that explains unfamiliar terms in place at the depth each reader needs, without breaking their flow or routing content through a third party.
year: '2026'
role: Product · Design · Build
order: 2
featured: true
accent: '#3976A8'
tags:
  - Browser extension
  - Learning tools
  - Privacy by design
demoUrl: https://github.com/anandd512/ELI5
demoLabel: View & install
stats:
  - value: '5'
    label: answer sections
  - value: '3'
    label: explanation depths
  - value: '0'
    label: accounts or backend services
---

## The story

Readers constantly meet unfamiliar terms in articles, documentation, and dashboards. Looking each one up means leaving the page, breaking focus, and often landing on an answer that is either too shallow or too dense.

I built **ELI5** as a browser extension that brings the explanation to the reader. Select a term and it streams an accessible summary, the technical detail, examples, notes, and reputable links into a side panel alongside the source page.

## What I built

- **Right-click and typed lookups** for terms encountered both on and away from the current page.
- **Five-part answers** that pair a simple on-ramp with accurate technical depth.
- **Simpler, Standard, and Deeper controls** plus contextual follow-up questions.
- **Pins, history, and Markdown/CSV export** that turn one-off lookups into a personal glossary.
- **Bring-your-own Azure OpenAI model** with credentials stored locally and no application backend.
- **Streaming, safe rendering, guided onboarding, and actionable errors** designed to make the extension feel immediate and trustworthy.

> The best learning tools disappear into the moment.

## Decisions & trade-offs

- **Depth is a spectrum, not an upfront setting.** Showing simple and technical explanations together serves newcomers and experts without forcing a choice before they understand the term.
- **Accuracy beats charm.** Analogies appear only when they genuinely help; forcing one for every proper noun produced memorable but misleading answers.
- **Privacy is part of the product.** Users connect their own model, while credentials and usage data remain on their device.
- **Respect the browser's interaction model.** The side panel opens synchronously from the click gesture, then starts the asynchronous lookup, preserving the core flow within Chromium's constraints.

## Outcome

ELI5 became an unpacked Chromium extension that reduces context switching while reading and turns fleeting questions into a reusable learning history. Iterating on it made the central product insight clearer: the right explanation is not merely simpler or deeper; it lets the reader move between both without losing momentum.
