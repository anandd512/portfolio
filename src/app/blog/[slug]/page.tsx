import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { Markdown } from '@/components/Markdown';
import { Footer } from '@/components/Footer';
import { getAllPosts, getPost, formatDate } from '@/lib/content';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return getAllPosts({ includeDrafts: true }).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.summary, url, type: 'article', publishedTime: post.date },
    robots: post.draft ? { index: false } : undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <main id="main">
        <article className="pb-24 pt-24 md:pt-28">
          <div className="wrap max-w-[760px]">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft size={15} /> All writing
            </Link>

            <header className="mt-10">
              <p className="rise font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                {formatDate(post.date)} · {post.readingTime}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
                {post.title}
              </h1>
              <p className="rise mt-5 text-xl leading-relaxed text-ink-soft">{post.summary}</p>
              <p className="mt-6 flex items-center gap-3 text-sm text-ink-soft">
                <span className="grid size-8 place-items-center rounded-full bg-ink font-mono text-[11px] font-semibold text-paper">
                  AD
                </span>
                {site.name}
              </p>
            </header>

            <hr className="my-10 border-line/10" />

            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
