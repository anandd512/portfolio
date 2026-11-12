---
title: chessroads
summary: A chess trainer that turns "get better at chess" into one 30–45 minute session a day, with a 24-week plan, real puzzles, a repertoire and a coach that explains your mistakes.
date: '2026-11'
role: Product · Design · Build
status: Installable web app
order: 2
featured: false
accent: '#8A5D00'
tags:
  - Learning tools
  - Offline-first
  - Chess
cover:
  src: /projects/chessroads/cover.webp
  alt: A forks puzzle in chessroads after a wrong move. A red arrow shows the opponent's reply, and the coach says "Not the move. Your opponent would reply Ng5. Your move isn't a blunder, but there is a stronger one."
gallery:
  - src: /projects/chessroads/line.webp
    alt: Learning the Giuoco Piano in chessroads. A green arrow shows the next move, and a note explains that Black mirrors you with Bc5.
    caption: Every move in the repertoire comes with a reason, so you learn plans instead of memorising moves.
  - src: /projects/chessroads/today.webp
    alt: The Today screen in dark mode, showing Week 1 of the 24-week road, today's three tasks and the weekly checkpoint.
    caption: Open it, do today's session, close it. The plan remembers where you are.
glance:
  problem: Improving players have endless puzzles, courses and videos, and no idea what to do today.
  user: Club players around 1600 who want to reach 2000 and have about 40 minutes a day.
  bet: A fixed plan of short daily sessions beats a library of disconnected tools.
  cut: Accounts, servers and a build step. One HTML file that works offline.
  outcome: A 24-week course with about 4,250 puzzles, 26 repertoire lines and 20 lessons, running entirely in the browser.
demoUrl: https://github.com/anandd512/chessroads#running-it
demoLabel: Run it (one file)
repoUrl: https://github.com/anandd512/chessroads
buildMetrics:
  - label: Plan
    value: 24 weeks, 7 sessions each
  - label: Puzzles
    value: ~4,250 from Lichess
  - label: Named opening lines
    value: 3,865
  - label: Runs on
    value: Any browser, offline
techStack:
  - JavaScript
  - HTML (single file)
  - Web Workers
  - Service Worker (PWA)
  - localStorage
  - Node (content validator)
aiModels:
  - Claude Opus 5.5
---

## The story

Chess improvement advice is always the same: do puzzles, learn your openings, play longer games, review them. All true, and none of it tells you what to do when you sit down tonight with 40 minutes. So most people end up doing whatever is easiest, usually blitz.

**chessroads** answers that one question. It's a 24-week road from about 1600 to 2000, broken into sessions. Open the app, do today's session, close it. The plan moves on, and you never have to decide what to study next.

## What I built

- **A 24-week plan.** Each week has a theme (forks, pins, the back rank, rook endgames…) and seven sessions: tactics and study, games to play and review, and a review day.
- **Puzzles that explain themselves.** About 4,250 real positions from the Lichess open database across 54 themes, plus an adaptive puzzle rating. A wrong move isn't just a red X: the coach plays the refuting reply and tells you what it costs.
- **A repertoire built on plans.** 26 lines for White and Black with a reason for every move, learn and drill modes, spaced repetition, and good alternatives accepted. There's also an encyclopedia of 3,865 named lines you can learn from either side.
- **Lessons you play, not just read.** 12 middlegame and 8 endgame lessons with demos, find-the-move positions, quizzes and endgame drills against a built-in engine (Lucena, Philidor, opposition and friends).
- **Mistakes come back.** Missed puzzles return after about 12 hours, then 3, 7 and 21 days, until you solve them cleanly.

> The hardest part of getting better isn't the training. It's deciding what to train today.

## Decisions & trade-offs

- **One file, no server.** The whole app, including its content, chess rules and engine, is a single HTML file. It installs to a phone's home screen, works offline, and has no account to forget.
- **A small engine, used carefully.** The built-in alpha-beta engine is fine for drills and refutations, not deep analysis. It runs in a Web Worker so the board never freezes while it thinks.
- **Honest coaching over confident coaching.** The coach measures what an exchange really costs before it says you lost material. In plan exercises, it says "not the idea of this lesson" instead of calling a reasonable move a blunder.
- **Reviewed like a real product.** Before 3.1, I ran a full product and UX review with two simulated personas, a grandmaster and a novice, and checked every line, lesson and puzzle with the app's own chess code. It turned up 41 issues, from dead-end puzzles to progress counts that read 29/26. 40 are fixed. The last one, a famous sacrifice my little engine doesn't believe in, is waiting for a Stockfish second opinion.
- **A validator for the content.** A Node script replays every opening line, alternative, lesson position and puzzle, and checks that the plan schedules every theme it promises.

## Outcome

A complete training course that fits in one file and runs anywhere. The biggest lesson was that in a learning product, accuracy is the feature: one false "you lose a knight" costs more trust than a crash.

## What's next

- Stockfish (WebAssembly) for stronger feedback and an analysis board.
- Importing your real games from Lichess or chess.com, so the plan reacts to how you actually play.
- A notes pass, so every learner move in the repertoire explains itself.
- A beginner road, with easier puzzles below 1000.
