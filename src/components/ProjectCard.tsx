import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { hexToRgbChannels, type ProjectMeta } from '@/lib/content';

export function ProjectCard({ project, large = false }: { project: ProjectMeta; large?: boolean }) {
  const href = `/projects/${project.slug}/`;

  return (
    <article
      style={{ ['--project' as string]: hexToRgbChannels(project.accent) }}
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line/10 bg-card transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-line/20 hover:shadow-[0_30px_60px_-34px_rgb(var(--ink)/0.45)]"
    >
      {project.cover ? (
        <div
          className={`relative overflow-hidden bg-project/[0.09] px-5 pt-5 sm:px-7 sm:pt-7 ${
            large ? 'h-[240px] sm:h-[300px] lg:h-[340px]' : 'h-[200px] sm:h-[230px]'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
            className="w-full rounded-t-[10px] border border-line/10 shadow-[0_20px_40px_-24px_rgb(var(--ink)/0.5)] transition-transform duration-700 ease-smooth group-hover:-translate-y-1.5 group-hover:scale-[1.015]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          <span className="size-2 rounded-full bg-project" />
          {project.status}
          <span className="text-line/30">·</span>
          {project.when}
        </p>
        <h3 className={`mt-3 font-display font-semibold tracking-[-0.03em] ${large ? 'text-[1.75rem]' : 'text-2xl'}`}>
          {/* Stretched link: the whole card is clickable without nesting links. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className={`mt-2 text-ink-soft ${large ? 'max-w-[52ch]' : ''}`}>{project.summary}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium">
            Read the story
            <ArrowRight size={15} className="transition-transform duration-300 ease-smooth group-hover:translate-x-1" />
          </span>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 rounded-full border border-line/15 px-3 py-1.5 text-sm text-ink-soft transition-colors hover:border-project hover:text-ink"
            >
              {project.demoLabel ?? 'Try it'}
              <ArrowUpRight size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
