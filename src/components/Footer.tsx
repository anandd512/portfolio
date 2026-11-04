import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CopyEmail } from './CopyEmail';
import { site } from '@/lib/site';

const builtOn = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
});

export function Footer() {
  const social = [
    { label: 'LinkedIn', href: site.links.linkedin },
    { label: 'GitHub', href: site.links.github },
  ].filter((l) => l.href);

  return (
    <footer id="contact" className="inverse bg-ink text-paper">
      <div className="wrap pb-10 pt-24 md:pt-28">
        <p className="eyebrow !text-paper/60">{site.contact.eyebrow}</p>
        <h2 className="mt-4 font-display text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
          <a href={`mailto:${site.email}`} className="group inline-flex items-baseline gap-3">
            {site.contact.heading}
            <span className="serif-accent !text-accent-soft inline-block transition-transform duration-500 ease-smooth group-hover:-translate-y-2 group-hover:translate-x-2">
              ↗
            </span>
          </a>
        </h2>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-paper/75">{site.contact.body}</p>

        <div className="mt-10">
          <CopyEmail email={site.email} copiedText={site.contact.copied} />
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-paper/15 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {social.map((l) => (
              <li key={l.label}>
                <a
                  className="inline-flex items-center gap-1 text-paper/80 transition-colors hover:text-paper"
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label} <ArrowUpRight size={13} />
                </a>
              </li>
            ))}
            <li>
              <Link className="text-paper/80 transition-colors hover:text-paper" href="/blog/">
                Writing
              </Link>
            </li>
          </ul>
          <p className="text-sm text-paper/70">
            © {new Date().getFullYear()} {site.name} · {site.footerNote}{' '}
            <span className="whitespace-nowrap">Last shipped {builtOn}.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
