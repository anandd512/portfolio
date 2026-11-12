---
title: chessroads
summary: A chess trainer that turns "get better at chess" into one 30-minute session a day, with a 24-week plan, real puzzles, a repertoire and Stockfish explaining your mistakes.
date: '2026-11'
role: Product · Design · Build
status: Live
order: 2
featured: false
accent: '#8A5D00'
tags:
  - Learning tools
  - Spaced repetition
  - Chess
cover:
  src: /projects/chessroads/cover.webp
  alt: A forks puzzle in chessroads after a wrong move. A red arrow shows the opponent's reply, and the coach says "Not the move. Your opponent replies cxd5. Material stays level for now, but your position falls apart."
gallery:
  - src: /projects/chessroads/line.webp
    alt: Learning the Giuoco Piano in chessroads. A green arrow shows the next move, and a note explains that Black mirrors you with Bc5.
    caption: Every move in the repertoire comes with a reason, so you learn plans instead of memorising moves.
  - src: /projects/chessroads/today.webp
    alt: The Today screen in dark mode, showing Week 1 of the 24-week road, today's three tasks and the weekly checkpoint.
    caption: Open it, do today's session, close it. The plan remembers where you are.
glance:
  problem: Improving players have endless puzzles, courses and videos, and no idea what to do today.
  user: Players rated roughly 1400–1900 online who play regularly but have stopped improving.
  bet: A fixed plan of short daily sessions beats a library of disconnected tools.
  cut: Accounts, servers and a build step. One web page, with progress kept in your browser.
  outcome: A free 24-week course with over 4,000 puzzles, 26 repertoire lines and 20 lessons, running entirely in the browser.
demoUrl: https://anandd512.github.io/chessroads/
demoLabel: Start training
repoUrl: https://github.com/anandd512/chessroads
buildMetrics:
  - label: Plan
    value: 24 weeks, 7 sessions each
  - label: Puzzles
    value: 4,000+ from Lichess
  - label: Named opening lines
    value: 3,865
  - label: Engine
    value: Stockfish 19, in your browser
  - label: Runs on
    value: Any modern browser
techStack:
  - JavaScript
  - HTML (single file)
  - Stockfish 19 (WebAssembly)
  - Web Workers
  - localStorage
  - GitHub Pages
  - Node (content validator)
aiModels:
  - Claude Opus 5.5
---

## The story

Chess improvement advice is always the same: do puzzles, learn your openings, play longer games, review them. All true, and none of it tells you what to do when you sit down tonight with half an hour. So most people bounce between random puzzles, opening videos and blitz, and their rating stalls.

**chessroads** answers that one question. It's a 24-week road from roughly 1600 to 2000, broken into sessions of about 30 minutes. Open it, do today's session, close it. The plan moves on, and you never have to decide what to study next.

## What I built

- **A 24-week plan.** Each week has a theme (forks, pins, the back rank, rook endgames…), a checkpoint like "Hold the Philidor draw", and seven sessions: tactics and study, real games to play and review, and a review day.
- **Puzzles that explain themselves.** Over 4,000 positions from real games in the Lichess open database, across 54 themes, plus an adaptive puzzle rating. A wrong move isn't just a red X: Stockfish plays the reply that refutes it, and the coach tells you what it costs.
- **A repertoire that explains itself.** 26 lines for White and Black, with a reason for every move you play, learn and drill modes, spaced repetition, and good alternatives accepted. Twelve opening traps, and an encyclopedia of 3,865 named lines you can play from either side.
- **Lessons you play, not just read.** 12 middlegame and 8 endgame lessons with demos, quizzes and find-the-move positions. The endgames end with drills against Stockfish: mate with king and rook, win the Lucena, hold the Philidor.
- **Mistakes come back.** Missed puzzles and learned lines return on a spaced-repetition schedule, so what you learn this week is still there in month five.

> The hardest part of getting better isn't the training. It's deciding what to train today.

## Decisions & trade-offs

- **One page, no server.** The whole app, including every puzzle, line and lesson, is a single HTML file on GitHub Pages. No account, no sign-up, no ads. Progress stays in your browser, and you can export it any time.
- **A real engine, loaded only when needed.** I started with a small home-made engine, then swapped in Stockfish 19 light (about 1.8 MB of WebAssembly). It loads the first time a board needs it and runs in a Web Worker, so the page never freezes. The single-threaded build needs no special server headers, which is what lets it run on GitHub Pages as is.
- **Honest coaching over confident coaching.** The coach measures what an exchange really costs before it says you lost material, and in plan exercises it says "not the idea of this lesson" instead of calling a reasonable move a blunder. Every find-the-move answer was checked with Stockfish, and equally good moves are accepted too.
- **Reviewed like a real product.** I ran a full product and UX review with two simulated personas, a grandmaster and a novice, and replayed every line, lesson and puzzle with the app's own chess code. It turned up 41 issues, from dead-end puzzles to progress counts that read 29/26. All 41 are fixed.
- **A validator for the content.** A Node script replays every opening line, puzzle and lesson position, checks the plan's references, and warns about any move without an explanation.

## Outcome

A complete, free training course that fits in one web page and runs on a laptop, tablet or phone. The biggest lesson: in a learning product, accuracy is the feature. One false "you lose a knight" costs more trust than a crash.

## What's next

- Importing your real games from Lichess or chess.com, so the plan reacts to how you actually play.
- A beginner road, with easier puzzles below 1000.
- A repertoire tree that covers more club-level sidelines.
