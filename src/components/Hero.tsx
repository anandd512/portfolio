'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/site';

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

export function Hero() {
  const reduce = useReducedMotion();

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

      <div className="wrap w-full">
        <div className="max-w-4xl">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 0.9, 0.3, 1] }}
            className="font-display text-[clamp(2.4rem,5.2vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.02em]"
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

      </div>
    </header>
  );
}
