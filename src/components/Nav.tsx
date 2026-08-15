'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';
import { ThemeToggle } from './ThemeToggle';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled
          ? 'border-line/10 bg-paper/80'
          : 'border-transparent bg-paper/40'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-3.5 md:px-7">
        <Link
          href="/"
          aria-label="Home"
          className="-ml-2 flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
        >
          <Home aria-hidden="true" className="size-5" strokeWidth={2} />
        </Link>

        <div className="flex items-center gap-5 md:gap-7">
          <ul className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative py-0.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent transition-all duration-300 ease-smooth group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {site.links.resume ? (
            <a
              href={site.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-ink px-4 py-2 font-mono text-xs tracking-[0.06em] text-ink transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-ink hover:text-paper sm:inline-block"
            >
              Resume ↗
            </a>
          ) : null}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
