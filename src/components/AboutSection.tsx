import { Reveal } from './Reveal';
import { about } from '@/lib/site';

export function AboutSection() {
  return (
    <section id="about" className="border-t border-line/10 py-24 md:py-28">
      <div className="wrap grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="section-title">{about.heading}</h2>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Things I enjoy">
            {about.interests.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="space-y-5 text-lg leading-relaxed text-ink/80 lg:pt-10">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
