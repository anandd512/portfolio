'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';
import { ThemeToggle } from './ThemeToggle';

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== '/') {
      setActive(null);
      return;
    }
    const sections = nav
      .map((item) => (item.id ? document.getElementById(item.id) : null))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Close the mobile menu on route change and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line/10 bg-paper/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <span className="grid size-8 place-items-center rounded-full bg-ink font-mono text-[11px] font-semibold tracking-tight text-paper transition-transform duration-300 ease-smooth group-hover:-rotate-12">
            AD
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.01em]">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive = item.id ? active === item.id : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? 'bg-ink/[0.06] text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-transform duration-300 ease-smooth hover:-translate-y-0.5 sm:inline-block"
          >
            Say hi
          </Link>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full text-ink hover:bg-ink/5 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="wrap pb-6 md:hidden">
          <ul className="flex flex-col divide-y divide-line/10 border-t border-line/10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-lg font-medium tracking-[-0.01em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full justify-center">
            Say hi
          </Link>
        </div>
      ) : null}
    </header>
  );
}
