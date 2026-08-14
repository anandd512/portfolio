---
title: Taash Table
summary: A real-time multiplayer platform for the Indian card games we grew up on — Judgement and Dehla Pakad — built so scattered friends could play at the same table again.
year: '2025'
role: Product · Build · Ship
order: 1
featured: true
accent: '#C05B3F'
tags:
  - Real-time multiplayer
  - Platform architecture
  - Zero-to-one
demoUrl: ''
repoUrl: ''
stats:
  - value: '[X]'
    label: games played
  - value: '[X wks]'
    label: idea to first multiplayer hand
  - value: '♥'
    label: my college group plays again
---

## The story

In college, my friends and I lost entire evenings to **Judgement** and **Dehla Pakad (collect the tens)** — card games with deep cultural pull in India, passed down across generations. Then we graduated, scattered to different cities, and the group chat stayed active while the card table didn't.

When I looked for a good online version, I found a gap: games millions of people grew up on had almost no great digital home. Global platforms cover Poker and Solitaire endlessly — but the games *we* actually played? Barely anything worth sending to a friend.

So I built it — not as "a card game app," but as a way back to the table.

## What I built

- A **real-time multiplayer platform**, with individual games as content on top — adding a new game is a content problem, not a rebuild.
- **Shareable room links** as the hero feature: start a table, drop the link in the group chat, and play within a minute.
- **Live game-state sync**: turn enforcement, hand privacy, and graceful rejoins for the friend whose Wi-Fi always drops mid-hand.
- **Two launch games chosen deliberately** — beloved, underserved, and the ones my own group wanted most. I was user zero.

> Minimize the distance between "remember when we used to play?" and actually playing.

## Decisions & trade-offs

- **Platform over app.** Game-agnostic infrastructure took longer upfront, but game #3 will cost a fraction of game #1.
- **Friction over features.** I cut everything from the MVP that stood between a shared link and a dealt hand.
- **[Your one real technical trade-off here — e.g., authoritative server vs. client trust, and why.]**

## Outcome

The original success metric was simple: my college group plays together again. Met. Now it's about widening the table — more games, more groups, same one-minute path from link to first hand.
