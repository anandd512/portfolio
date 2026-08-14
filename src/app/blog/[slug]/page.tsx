import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { Markdown } from '@/components/Markdown';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { getAllPosts, getPost, formatDate } from '@/lib/content';

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
  return {
    title: post.title,
    description: post.summary,
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
    <main>
      <article className="pt-32">
        <div className="wrap max-w-[720px]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} /> All posts
          </Link>

          <Reveal className="mt-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
              {formatDate(post.date)} · {post.readingTime}
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-ink-soft">{post.summary}</p>
          </Reveal>

          <hr className="my-10 border-line/15" />

          <Reveal>
            <Markdown>{post.content}</Markdown>
          </Reveal>
        </div>
      </article>
      <Footer />
    </main>
  );
}
