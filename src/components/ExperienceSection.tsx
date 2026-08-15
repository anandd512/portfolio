import { MapPin } from 'lucide-react';
import { Reveal } from './Reveal';
import { experience, experienceHeading } from '@/lib/site';

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-line/10 py-24">
      <div className="wrap grid gap-14 md:grid-cols-[320px_1fr]">
        <Reveal>
          <div className="md:sticky md:top-28">
            <div className="eyebrow">Experience</div>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold leading-tight tracking-tight">
              {experienceHeading}
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* vertical line */}
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-line/15"
          />
          <ol className="space-y-10">
            {experience.map((entry, i) => (
              <Reveal key={`${entry.org}-${i}`} delay={i * 0.06}>
                <li className="relative pl-9">
                  <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-paper" />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    <span>{entry.period}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin aria-hidden="true" size={12} />
                      {entry.location}
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-display text-xl font-bold">
                    {entry.role}
                    <span className="text-ink-soft"> · {entry.org}</span>
                  </h3>
                  <p className="mt-2 max-w-[60ch] text-ink/85">{entry.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
