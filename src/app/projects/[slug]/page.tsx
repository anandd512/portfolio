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

        {project.buildMetrics.length > 0 ? (
          <div className="wrap mt-14">
            <Reveal>
              <div className="grid gap-4 border-y border-line/10 py-8 sm:grid-cols-3">
                {project.buildMetrics.map((metric) => (
                  <div key={metric.label}>
                    <b className="block font-display text-xl font-bold text-ink">
                      {metric.value}
                    </b>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                      {metric.label}
                    </span>
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

          {(project.techStack.length > 0 || project.aiModels.length > 0) && (
            <Reveal className="mt-16 border-t border-line/15 pt-8">
              <h2 className="font-display text-2xl font-bold">Build notes</h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {project.techStack.length > 0 ? (
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                      Tech stack
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.techStack.map((technology) => (
                        <li key={technology} className="rounded-full border border-line/20 px-3 py-1.5 text-sm">
                          {technology}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {project.aiModels.length > 0 ? (
                  <div>
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                      AI models used
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.aiModels.map((model) => (
                        <li key={model} className="rounded-full border border-line/20 px-3 py-1.5 text-sm">
                          {model}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </Reveal>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
