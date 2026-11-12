import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { site } from '@/lib/site';
import type { ProjectMeta } from '@/lib/content';
import { hexToRgbChannels } from '@/lib/content';

function Headline({ text }: { text: string }) {
  // Split on {{ ... }} to render the highlighted phrase in serif italics.
  const parts = text.split(/\{\{(.*?)\}\}/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="serif-accent pr-1 text-[1.08em]">
            {part}
          </em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

// Fanned "hand of cards" positions for the screenshot stack, back to front.
const FAN = [
  'z-0 -rotate-[7deg] -translate-x-[9%] translate-y-[2%] group-hover:-rotate-[11deg] group-hover:-translate-x-[18%]',
  'z-10 rotate-[5deg] translate-x-[9%] -translate-y-[6%] group-hover:rotate-[9deg] group-hover:translate-x-[18%]',
  'z-20 rotate-0 translate-y-[12%] group-hover:translate-y-[18%]',
];

function HeroStack({ projects }: { projects: ProjectMeta[] }) {
  // Render back-to-front so the first (top-ordered) project sits on top.
  const cards = projects.filter((p) => p.cover).slice(0, 3).reverse();
  if (cards.length === 0) return null;
  return (
    <div className="rise group relative mx-auto hidden aspect-[7/5] w-full max-w-[540px] lg:block" style={{ ['--rise-delay' as string]: '200ms' }}>
      {cards.map((p, i) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}/`}
          aria-label={`${p.title}: ${p.summary}`}
          style={{ ['--project' as string]: hexToRgbChannels(p.accent) }}
          className={`absolute inset-x-[6%] top-[14%] overflow-hidden rounded-[14px] border border-line/10 bg-card shadow-[0_30px_60px_-30px_rgb(var(--ink)/0.45)] transition-transform duration-500 ease-smooth hover:!z-30 ${FAN[i + (3 - cards.length)]}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.cover!.src}
            alt=""
            width={1600}
            height={1000}
            className="aspect-[16/10] w-full object-cover object-top"
            loading="eager"
          />
          <div className="flex items-center justify-between gap-3 border-t border-line/10 px-4 py-2.5">
            <span className="flex items-center gap-2 text-sm font-medium">
              <span className="size-2 rounded-full bg-project" />
              {p.title}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">{p.status}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function Hero({ projects }: { projects: ProjectMeta[] }) {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 md:pt-36">
      <div className="wrap">
        <p className="rise eyebrow">
          Hi, I’m {site.firstName} · {site.title}
        </p>
        <h1 className="mt-5 max-w-[17ch] font-display text-[clamp(2.5rem,6.6vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
          <Headline text={site.heroHeadline} />
        </h1>
      </div>
      <div className="wrap mt-10 grid items-center gap-12 lg:mt-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div className="lg:pb-16">
          <p className="rise max-w-[50ch] text-lg leading-relaxed text-ink-soft" style={{ ['--rise-delay' as string]: '80ms' }}>
            {site.heroSub}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ ['--rise-delay' as string]: '160ms' }}>
            <Link className="btn btn-primary group" href="#work">
              See the work
              <ArrowDown size={16} className="transition-transform duration-300 ease-smooth group-hover:translate-y-0.5" />
            </Link>
            <Link className="btn btn-ghost" href="#principles">
              How I think
            </Link>
          </div>
        </div>

        <HeroStack projects={projects} />
      </div>
    </section>
  );
}
