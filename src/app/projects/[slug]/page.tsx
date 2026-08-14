import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { Markdown } from '@/components/Markdown';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { getAllProjects, getProject } from '@/lib/content';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main>
      <article className="pt-32">
        <div className="wrap">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} /> Back to work
          </Link>

          <Reveal className="mt-8 max-w-3xl">
            <div className="eyebrow">
              {project.role} · {project.year}
            </div>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.05] tracking-tight">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[60ch] text-lg text-ink-soft">
              {project.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>

            {(project.demoUrl || project.repoUrl) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {project.demoUrl ? (
                  <a
                    className="btn btn-primary group"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.demoLabel ?? 'Try it live'}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    className="btn btn-ghost"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} /> Source
                  </a>
                ) : null}
              </div>
            )}
          </Reveal>
        </div>

        {/* stats band */}
        {project.stats && project.stats.length > 0 ? (
          <div className="wrap mt-14">
            <Reveal>
              <div className="grid gap-4 border-y border-line/10 py-8 sm:grid-cols-3">
                {project.stats.map((s) => (
                  <div key={s.label}>
                    <b className="block font-display text-3xl font-bold text-accent">
                      {s.value}
                    </b>
                    <i className="not-italic text-sm text-ink-soft">{s.label}</i>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        ) : null}

        {/* body */}
        <div className="wrap mt-12 max-w-[720px] pb-16">
          <Reveal>
            <Markdown>{project.content}</Markdown>
          </Reveal>
        </div>
      </article>

      <Footer />
    </main>
  );
}
