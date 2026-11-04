'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.style.colorScheme = next;
      setTheme(next);
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) {
      apply();
      return;
    }

    // Grow a circle out from the button.
    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement.style;
    root.setProperty('--vt-x', `${x}px`);
    root.setProperty('--vt-y', `${y}px`);
    root.setProperty('--vt-r', `${r}px`);
    document.startViewTransition(apply);
  };

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={isDark ? 'Lights on' : 'Lights off'}
      onClick={toggle}
      className="inline-flex size-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:bg-ink/5 hover:text-ink"
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted ? (
        isDark ? <Sun size={17} /> : <Moon size={17} />
      ) : (
        <Sun size={17} className="opacity-0" />
      )}
    </button>
  );
}
