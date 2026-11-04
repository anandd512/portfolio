import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { principles, principlesSection } from '@/lib/site';

export function PrinciplesSection() {
  return (
    <section id="principles" className="py-24 md:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{principlesSection.eyebrow}</p>
            <h2 className="section-title">{principlesSection.heading}</h2>
          </div>
        </Reveal>

        <ol className="divide-y divide-line/10 border-y border-line/10">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} className="group grid gap-x-8 gap-y-3 py-8 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-sm text-ink-soft">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">{p.title}</h3>
                <p className="mt-2 max-w-[52ch] text-lg leading-relaxed text-ink-soft">{p.body}</p>
                <Link
                  href={p.href}
                  className="mt-4 inline-flex items-start gap-2 text-sm text-ink transition-colors hover:text-accent"
                >
                  <span className="font-serif text-base italic text-accent">Receipt:</span>
                  <span className="link-underline">{p.receipt}</span>
                  <ArrowRight size={15} className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
