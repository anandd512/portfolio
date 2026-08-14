import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { formatDate, type PostMeta } from '@/lib/content';

export function WritingTeaser({ posts }: { posts: PostMeta[] }) {
  return (
    <section id="writing" className="border-t border-line/10 py-24">
      <div className="wrap">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="eyebrow">Writing</div>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold leading-tight tracking-tight">
              Notes on product, building, and learning in public.
            </h2>
          </div>
          <Link
            href="/blog"
            className="btn btn-ghost group shrink-0"
          >
            All posts
            <ArrowRight
              size={16}
              className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        {posts.length === 0 ? (
          <Reveal>
            <p className="text-ink-soft">First post coming soon.</p>
          </Reveal>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="group flex h-full flex-col rounded-card border border-line/10 bg-card p-6 transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:shadow-[0_18px_36px_-18px_rgb(var(--ink)/0.4)]"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                    {formatDate(post.date)} · {post.readingTime}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{post.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                    Read
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
