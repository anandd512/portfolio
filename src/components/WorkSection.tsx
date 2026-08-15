import { Reveal } from './Reveal';
import { ProjectCard } from './ProjectCard';
import type { ProjectMeta } from '@/lib/content';

export function WorkSection({ projects }: { projects: ProjectMeta[] }) {
  return (
    <section id="work" className="border-t border-line/10 py-24">
      <div className="wrap">
        <Reveal className="mb-12 max-w-2xl">
          <div className="eyebrow">Selected work</div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-bold leading-tight tracking-tight">
            A few ideas I wanted to understand by building them.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
