import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { getAllPosts, formatDate } from '@/lib/content';
import { writing } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Writing',
  description: writing.description,
  alternates: { canonical: '/blog/' },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <main id="main">
        <section className="pb-24 pt-28 md:pt-36">
          <div className="wrap">
            <div className="max-w-3xl">
              <p className="rise eyebrow">{writing.eyebrow}</p>
              <h1 className="mt-4 font-display text-[clamp(2.4rem,5.4vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                {writing.heading}
              </h1>
            </div>

            <div className="mt-14 divide-y divide-line/10 border-y border-line/10">
              {posts.length === 0 ? (
                <p className="py-10 text-ink-soft">First post coming soon.</p>
              ) : (
                posts.map((post) => (
                  <Reveal key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="group grid gap-2 py-9 md:grid-cols-[12rem_1fr_auto] md:items-baseline md:gap-8"
                    >
                      <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                        {formatDate(post.date)}
                      </p>
                      <div>
                        <h2 className="font-display text-2xl font-semibold leading-snug tracking-[-0.025em] transition-colors group-hover:text-accent">
                          {post.title}
                        </h2>
                        <p className="mt-2 max-w-[62ch] text-ink-soft">{post.summary}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
                        {post.readingTime}
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Reveal>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
