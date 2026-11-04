'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Shows the email with a copy button, because mailto: does nothing on many work laptops. */
export function CopyEmail({ email, copiedText }: { email: string; copiedText: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="relative inline-flex items-center gap-1 rounded-full border border-paper/20 bg-paper/5 p-1 pl-5">
      <a href={`mailto:${email}`} className="font-mono text-sm text-paper/90 hover:text-paper">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${email}`}
        className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-2 text-sm font-medium text-ink transition-transform duration-300 ease-smooth hover:-translate-y-0.5"
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute -top-11 right-0 whitespace-nowrap rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-white shadow-lg transition-all duration-300 ease-smooth ${
          copied ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        {copied ? copiedText : ''}
      </span>
    </div>
  );
}
