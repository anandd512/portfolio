import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { formatDate, type PostMeta } from '@/lib/content';
import { writing } from '@/lib/site';

export function WritingTeaser({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  const single = posts.length === 1;

  return (
    <section id="writing" className="border-t border-line/10 py-24 md:py-28">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">{writing.eyebrow}</p>
            <h2 className="section-title">{writing.heading}</h2>
          </div>
          {!single ? (
            <Link href="/blog/" className="btn btn-ghost group shrink-0">
              All posts
              <ArrowRight size={16} className="transition-transform duration-300 ease-smooth group-hover:translate-x-1" />
            </Link>
          ) : null}
        </Reveal>

        <div className={`mt-12 grid gap-5 ${single ? '' : 'md:grid-cols-3'}`}>
          {posts.map((post) => (
            <Reveal key={post.slug}>
              <Link
                href={`/blog/${post.slug}/`}
                className={`card group flex h-full flex-col p-7 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(var(--ink)/0.45)] ${
                  single ? 'md:flex-row md:items-end md:justify-between md:gap-12 md:p-10' : ''
                }`}
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                    {formatDate(post.date)} · {post.readingTime}
                  </p>
                  <h3 className={`mt-3 font-display font-semibold leading-tight tracking-[-0.025em] ${single ? 'text-[clamp(1.6rem,3vw,2.3rem)]' : 'text-xl'}`}>
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-ink-soft">{post.summary}</p>
                </div>
                <span className="mt-6 inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent">
                  Read the post
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
