import { Reveal } from './Reveal';
import { site } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-10 bg-ink pb-11 pt-20 text-paper">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ color: 'rgb(var(--paper) / 0.55)' }}>
            Your move
          </div>
          <a
            href={`mailto:${site.email}`}
            className="group mt-4 inline-block font-display text-[clamp(2.1rem,5vw,4rem)] font-bold leading-none tracking-tight text-paper"
          >
            Let’s talk{' '}
            <span className="inline-block text-accent-soft transition-transform duration-300 ease-smooth group-hover:translate-x-2 group-hover:-translate-y-1.5">
              ↗
            </span>
          </a>
          <p className="mt-5 max-w-[46ch]" style={{ color: 'rgb(var(--paper) / 0.7)' }}>
            Building something, or just want to compare notes on product and
            AI-assisted development? I’m easy to reach.
          </p>
        </Reveal>

        <div
          className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t pt-7"
          style={{ borderColor: 'rgb(var(--paper) / 0.18)' }}
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {site.links.linkedin ? (
              <a
                className="text-paper/75 transition-colors hover:text-accent-soft"
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            ) : null}
            {site.links.github ? (
              <a
                className="text-paper/75 transition-colors hover:text-accent-soft"
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            ) : null}
            {site.links.resume ? (
              <a
                className="text-paper/75 transition-colors hover:text-accent-soft"
                href={site.links.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            ) : null}
            <a
              className="text-paper/75 transition-colors hover:text-accent-soft"
              href={`mailto:${site.email}`}
            >
              Email
            </a>
          </div>
          <p className="font-mono text-xs" style={{ color: 'rgb(var(--paper) / 0.45)' }}>
            © {year} {site.name} · {site.footerNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
