---
title: Pacman, Rebuilt
summary: The small learning project where I found out where AI-assisted development genuinely shines, and where a builder's judgment is still irreplaceable.
date: '2025-08'
role: Learning · Build
status: Playable here
order: 4
featured: false
accent: '#E0A03C'
tags:
  - Learning project
  - Game mechanics
  - AI-assisted dev
cover:
  src: /projects/pacman/cover.webp
  alt: A game of Pacman in progress, with Pacman in the maze and the red, pink and cyan ghosts chasing.
glance:
  problem: I wanted to feel where AI-assisted development shines and where it falls over, not just read about it.
  user: Me, mostly. And anyone with arrow keys and five minutes.
  bet: A small, well-known problem with hidden depth would expose the edges fast.
  cut: Sound, levels and touch controls. Ghost behaviour and game feel were the point.
  outcome: A playable game, and the confidence to build CardArena.
embedUrl: /play/pacman/
demoUrl: /play/pacman/
demoLabel: Play full screen
repoUrl: 'https://github.com/anandd512/PACMAN'
buildMetrics:
  - label: Built in
    value: 1 week
  - label: Runs on
    value: Any browser with a keyboard
  - label: Ghosts
    value: 3, each with its own brain
techStack:
  - JavaScript
  - HTML (DOM grid)
  - CSS
---

## The story

When AI-assisted development got genuinely good, I didn't want to read about it. I wanted to feel where it shines and where it fails. So I picked a small, well-understood problem with hidden depth: **Pacman**.

It looks simple. It isn't. Each ghost runs different pursuit logic: the red one chases you, the pink one tries to ambush where you're heading, and the cyan one mostly wanders. That interplay is what makes the game feel alive. Recreating it meant getting collisions, tile-grid movement and ghost behaviour genuinely right.

## What it taught me

- **Directing AI the way a senior engineer directs a team**: clear specs in, working code out, review everything.
- **Where AI accelerates** (boilerplate, well-documented patterns) **and where judgment is irreplaceable** (game feel, edge cases, architecture).
- **Confidence.** Shipping this is what convinced me a multiplayer platform was achievable, one milestone at a time.

## Outcome

A fully playable game, and a way of building I've used on every project since. The arrow keys still work. Try it above.
