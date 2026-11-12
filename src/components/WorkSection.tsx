import { Reveal } from './Reveal';
import { ProjectCard } from './ProjectCard';
import type { ProjectMeta } from '@/lib/content';
import { work } from '@/lib/site';

/** Bento grid: featured projects get wide tiles (two per row), the rest three per row. */
export function WorkSection({ projects }: { projects: ProjectMeta[] }) {
  const small = projects.filter((p) => !p.featured);
  const smallCount = small.length;
  const lastSmall = small.at(-1)?.slug;
  // On three-column desktops, widen the trailing small cards to half rows so none are left
  // stranded: 1 leftover → last four become 2×2, 2 leftovers → last two share a row.
  const lgRemainder = smallCount % 3;
  const halfOnLg = new Set(
    small.slice(lgRemainder === 1 && smallCount >= 4 ? -4 : lgRemainder === 2 ? -2 : small.length).map((p) => p.slug),
  );

  return (
    <section id="work" className="py-24 md:py-28">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">{work.eyebrow}</p>
            <h2 className="section-title">{work.heading}</h2>
          </div>
          <p className="max-w-[34ch] text-ink-soft">{work.sub}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-6">
          {projects.map((p) => {
            // On two-column tablets, let a lone trailing small card span the row.
            const isLoneTrailer = !p.featured && smallCount % 2 === 1 && p.slug === lastSmall;
            const span = p.featured
              ? 'md:col-span-3'
              : isLoneTrailer
                ? `md:col-span-6 ${halfOnLg.has(p.slug) ? 'lg:col-span-3' : 'lg:col-span-2'}`
                : `md:col-span-3 ${halfOnLg.has(p.slug) ? 'lg:col-span-3' : 'lg:col-span-2'}`;
            return (
              <Reveal key={p.slug} className={span}>
                <ProjectCard project={p} large={p.featured} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
