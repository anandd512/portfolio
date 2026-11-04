---
title: CardArena
summary: A real-time multiplayer platform for the Indian card games we grew up on, Judgement and Dehla Pakad, built so scattered friends could sit at the same table again.
date: '2026-03'
role: Product · Build · Ship
status: Live
order: 1
featured: true
accent: '#C05B3F'
tags:
  - Real-time multiplayer
  - Platform architecture
  - Zero-to-one
cover:
  src: /projects/taash-table/table.webp
  alt: A CardArena game of Judgement in progress, with four players around a green table, three cards in the current trick, and a live scoreboard.
gallery:
  - src: /projects/taash-table/lobby.webp
    alt: The CardArena lobby asking the player to choose between Judgement and Dehla Pakad.
    caption: Three steps from the link to the table. Pick a game, pick an avatar, play.
glance:
  problem: College friends scattered across cities. The group chat survived; the card table didn't.
  user: Groups who grew up on Judgement and Dehla Pakad. My own college group was user zero.
  bet: A shareable room link that gets you from “remember when?” to a dealt hand in under a minute.
  cut: Accounts, sign-ups, and anything else between a shared link and the first hand.
  outcome: My college group plays together again.
demoUrl: 'https://cardgames-app-2026-cefpbchdg8c3hrdr.centralindia-01.azurewebsites.net/'
demoLabel: Play now
repoUrl: 'https://github.com/anandd512/cardgames'
buildMetrics:
  - label: Built in
    value: 8 weeks
  - label: Runs on
    value: Any browser, phone or laptop
  - label: Games
    value: Judgement, Dehla Pakad
techStack:
  - JavaScript
  - Node.js
  - Express
  - Socket.IO
  - Azure App Service
aiModels:
  - Claude Sonnet
  - Claude Opus 4.8
  - GPT 5.4–5.6
---

## The story

In college, my friends and I lost entire evenings to **Judgement** and **Dehla Pakad** (collect the tens). These are card games with a deep cultural pull in India, passed down across generations. Then we graduated, scattered to different cities, and the group chat stayed active while the card table didn't.

When I looked for a good online version, I found a gap. Games millions of people grew up on had almost no great digital home. Global platforms cover Poker and Solitaire endlessly, but the games *we* actually played? Barely anything worth sending to a friend.

So I built it. Not as "a card game app", but as a way back to the table.

## What I built

- A **real-time multiplayer platform**, with individual games as content on top. Adding a new game is a content problem, not a rebuild.
- **Shareable room links** as the hero feature: start a table, drop the link in the group chat, and play within a minute.
- **Live game-state sync** with turn enforcement, hand privacy, and graceful rejoins for the friend whose Wi-Fi always drops mid-hand.
- **Bots to fill the gaps.** Short a player? Fill the empty seats with AI and play anyway.
- **Two launch games chosen deliberately**: beloved, underserved, and the ones my own group wanted most. I was user zero.

> Minimize the distance between “remember when we used to play?” and actually playing.

## Decisions & trade-offs

- **Platform over app.** Game-agnostic infrastructure took longer upfront, but game #3 will cost a fraction of game #1.
- **Friction over features.** I cut everything from the MVP that stood between a shared link and a dealt hand. No accounts, no sign-up, just a name and an avatar.
- **The server is the referee.** All game state lives on the server, and each player receives only their own view of it. Nobody can peek at a hand from the browser's dev tools, and the client stays a simple renderer.
- **Bots over pauses.** When someone drops mid-hand, a bot takes their seat so the table keeps playing, then hands it back when they rejoin. Waiting on one person ruins the evening for three.

## Outcome

The original success metric was simple: my college group plays together again. Met.

## What's next

Rooms live in memory, which keeps everything fast and simple, but a redeploy ends every game in progress. Persisting rooms is next, then more games and more groups, with the same one-minute path from link to first hand.
