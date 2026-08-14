'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/site';
import type { ProjectMeta } from '@/lib/content';

function Headline({ text }: { text: string }) {
  // Split on {{ ... }} to highlight a phrase.
  const parts = text.split(/\{\{(.*?)\}\}/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="relative not-italic text-accent">
            {part}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1.5 -z-10 h-2.5 rounded-sm bg-accent-soft/40"
            />
          </em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Hero({ projects }: { projects: ProjectMeta[] }) {
  const reduce = useReducedMotion();
  const top = projects.slice(0, 3);

  return (
    <header
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32"
    >
      {/* soft ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent-soft/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-ink/5 blur-3xl"
      />

      <div className="wrap grid w-full items-center gap-12 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
            className="eyebrow"
          >
            {site.role} · Builder
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 0.9, 0.3, 1] }}
            className="mt-5 font-display text-[clamp(2.4rem,5.2vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.02em]"
          >
            <Headline text={site.heroHeadline} />
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 0.9, 0.3, 1] }}
            className="mt-6 max-w-[52ch] text-lg text-ink-soft"
          >
            {site.heroSub}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 0.9, 0.3, 1] }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link className="btn btn-primary group" href="#work">
              See the work
              <ArrowRight
                size={16}
                className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
              />
            </Link>
            {site.links.linkedin ? (
              <a
                className="btn btn-ghost group"
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ) : null}
          </motion.div>
        </div>

        {/* Signature element: a stacked deck of project previews.
            Fans out on hover — abstract, not card-game themed. */}
        <div className="relative hidden h-[420px] items-center justify-center md:flex [perspective:1200px]">
          {top.map((p, i) => {
            const rot = [-10, 0, 10][i] ?? 0;
            const x = [-70, 0, 70][i] ?? 0;
            const y = [10, -12, 10][i] ?? 0;
            return (
              <motion.div
                key={p.slug}
                initial={reduce ? false : { opacity: 0, y: 40, rotate: rot }}
                animate={{ opacity: 1, y, rotate: rot }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.08,
                  ease: [0.22, 0.9, 0.3, 1],
                }}
                whileHover={reduce ? undefined : { y: y - 26, rotate: 0, scale: 1.04 }}
                style={{ zIndex: i === 1 ? 3 : 1 }}
                className="absolute"
              >
                <Link
                  href={`/projects/${p.slug}/`}
                  style={{ transform: `translateX(${x}px)` }}
                  className="group flex h-[300px] w-52 flex-col justify-between rounded-2xl border border-line/12 bg-card p-5 shadow-[0_18px_44px_-16px_rgb(var(--ink)/0.35)] transition-shadow duration-300 hover:shadow-[0_30px_60px_-20px_rgb(var(--ink)/0.5)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                      {p.year}
                    </span>
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: p.accent ?? 'rgb(var(--accent))' }}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft line-clamp-3">
                      {p.summary}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                    Open
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
            ↑ hover the stack
          </span>
        </div>
      </div>
    </header>
  );
}
