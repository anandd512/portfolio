import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { getAllPosts, formatDate } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Notes on product, building, and learning in public.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main>
      <section className="pt-32">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <div className="eyebrow">Writing</div>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-tight">
              Notes on product, building, and learning in public.
            </h1>
          </Reveal>

          <div className="mt-14 divide-y divide-line/10 border-y border-line/10">
            {posts.length === 0 ? (
              <p className="py-10 text-ink-soft">First post coming soon.</p>
            ) : (
              posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.05}>
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="group flex flex-col gap-2 py-8 transition-colors md:flex-row md:items-baseline md:gap-8"
                  >
                    <p className="w-40 shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                      {formatDate(post.date)}
                    </p>
                    <div className="flex-1">
                      <h2 className="font-display text-2xl font-bold leading-snug transition-colors group-hover:text-accent">
                        {post.title}
                        <ArrowUpRight
                          size={18}
                          className="ml-1 inline opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </h2>
                      <p className="mt-2 max-w-[60ch] text-ink-soft">{post.summary}</p>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                        {post.readingTime}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
