import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
};

/**
 * Subtle scroll-in reveal. Pure CSS (scroll-driven animations), so content is
 * always present and visible in the static HTML, and browsers without support
 * or with reduced motion simply show it.
 */
export function Reveal({ children, className = '', as: Tag = 'div' }: RevealProps) {
  return <Tag className={`reveal ${className}`}>{children}</Tag>;
}
