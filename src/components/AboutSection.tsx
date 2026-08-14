import { Reveal } from './Reveal';
import { about, process } from '@/lib/site';

export function AboutSection() {
  return (
    <>
      {/* About */}
      <section id="about" className="py-24">
        <div className="wrap grid items-start gap-14 md:grid-cols-2">
          <Reveal>
            <div className="eyebrow">About</div>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold leading-tight tracking-tight">
              {about.heading}
            </h2>
            <div className="mt-7 flex flex-wrap gap-2">
              {about.interests.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-4 text-ink/85">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* How I work */}
      <section className="pb-8">
        <div className="wrap">
          <Reveal className="mb-10 max-w-2xl">
            <div className="eyebrow">How I work</div>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-bold leading-tight tracking-tight">
              The same loop, whether it’s a weekend build or an enterprise product.
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-card border border-line/10 bg-card p-6 transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:shadow-[0_18px_36px_-18px_rgb(var(--ink)/0.4)]">
                  <span className="pointer-events-none absolute -bottom-4 right-2 font-display text-7xl font-extrabold text-ink/[0.06]">
                    {i + 1}
                  </span>
                  <b className="block font-display text-lg">{step.title}</b>
                  <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
