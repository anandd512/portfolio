'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectMeta } from '@/lib/content';

export function ProjectCard({ project, index }: { project: ProjectMeta; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 0.9, 0.3, 1] }}
    >
      <Link
        href={`/projects/${project.slug}/`}
        className="group flex h-full flex-col justify-between overflow-hidden rounded-card border border-line/10 bg-card p-7 transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:border-line/20 hover:shadow-[0_24px_50px_-24px_rgb(var(--ink)/0.4)]"
      >
        <div>
          <div className="flex items-start justify-between gap-4">
            <span className="font-display text-5xl font-extrabold leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgb(var(--ink)/0.28)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="mt-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line/15 text-ink-soft transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
            >
              <ArrowUpRight size={16} />
            </span>
          </div>

          <h3 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
            {project.role} · {project.year}
          </p>
          <p className="mt-4 max-w-[52ch] text-ink/85">{project.summary}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
