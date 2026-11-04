import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Keyboard } from 'lucide-react';
import { Markdown } from '@/components/Markdown';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import {
  getAdjacentProjects,
  getAllProjects,
  getProject,
  hexToRgbChannels,
  type ProjectGlance,
} from '@/lib/content';

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
  const url = `/projects/${project.slug}/`;
  const image = { url: `/og/${project.slug}.png`, width: 1200, height: 630, alt: project.title };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { title: project.title, description: project.summary, url, type: 'article', images: [image] },
    twitter: { card: 'summary_large_image', title: project.title, description: project.summary, images: [image.url] },
  };
}

const GLANCE_LABELS: [keyof ProjectGlance, string][] = [
  ['problem', 'The problem'],
  ['user', 'Who it’s for'],
  ['bet', 'The bet'],
  ['cut', 'What I cut'],
  ['outcome', 'Outcome'],
];

function isExternal(href: string) {
  return href.startsWith('http');
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(slug);
  const glance = GLANCE_LABELS.filter(([key]) => project.glance[key]);

  return (
    <>
      <main id="main" style={{ ['--project' as string]: hexToRgbChannels(project.accent) }}>
        <article className="pt-24 md:pt-28">
          <div className="wrap">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft size={15} /> All work
            </Link>

            <header className="mt-8 grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="rise flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                  <span className="size-2 rounded-full bg-project" />
                  {project.status} <span className="text-line/30">·</span> {project.when}
                  <span className="text-line/30">·</span> {project.role}
                </p>
                <h1 className="mt-4 font-display text-[clamp(2.6rem,6.4vw,5rem)] font-semibold leading-[1] tracking-[-0.045em]">
                  {project.title}
                </h1>
                <p className="rise mt-5 max-w-[58ch] text-xl leading-relaxed text-ink-soft">{project.summary}</p>
              </div>

              {project.demoUrl || project.repoUrl ? (
                <div className="rise flex flex-wrap gap-3 lg:justify-end">
                  {project.demoUrl ? (
                    <a
                      className="btn btn-primary group"
                      href={project.demoUrl}
                      target={isExternal(project.demoUrl) ? '_blank' : undefined}
                      rel={isExternal(project.demoUrl) ? 'noopener noreferrer' : undefined}
                    >
                      {project.demoLabel ?? 'Try it live'}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ) : null}
                  {project.repoUrl ? (
                    <a className="btn btn-ghost" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={16} /> Source
                    </a>
                  ) : null}
                </div>
              ) : null}
            </header>
          </div>

          {project.embedUrl ? (
            // A playable demo beats a screenshot: it takes the hero slot.
            <section id="play" className="wrap mt-12" aria-labelledby="play-title">
              <div className="rise rounded-card bg-project/[0.09] p-3 sm:p-6 md:p-8">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
                  <h2 id="play-title" className="font-display text-xl font-semibold tracking-[-0.02em]">
                    Play it right here
                  </h2>
                  <p className="inline-flex items-center gap-2 text-sm text-ink-soft">
                    <Keyboard size={16} /> Click the board, then use the arrow keys.
                  </p>
                </div>
                <div className="overflow-x-auto rounded-xl border border-line/10 bg-black">
                  <iframe
                    src={project.embedUrl}
                    title={`${project.title}, playable`}
                    className="mx-auto block h-[800px] w-full min-w-[640px]"
                  />
                </div>
                <p className="mt-3 px-1 text-sm text-ink-soft">
                  Best on a laptop. Phones don’t have arrow keys, and I never added swipe. Scope!
                </p>
              </div>
            </section>
          ) : project.cover ? (
            <div className="wrap mt-12">
              <div className="rise rounded-card bg-project/[0.09] p-3 sm:p-6 md:p-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={1600}
                  height={1000}
                  className="w-full rounded-xl border border-line/10 shadow-[0_30px_60px_-30px_rgb(var(--ink)/0.5)]"
                />
              </div>
            </div>
          ) : null}

          <div className="wrap mt-14 grid gap-12 pb-20 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            <div className="min-w-0">
              <Reveal>
                <Markdown>{project.content}</Markdown>
              </Reveal>

              {project.gallery.length > 0 ? (
                <Reveal as="section" className="mt-16">
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.025em]">More screens</h2>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {project.gallery.map((img) => (
                      <figure key={img.src} className="rounded-card bg-project/[0.07] p-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          width={1600}
                          height={1000}
                          loading="lazy"
                          decoding="async"
                          className="w-full rounded-lg border border-line/10"
                        />
                        {img.caption ? (
                          <figcaption className="px-1 pb-1 pt-3 text-sm text-ink-soft">{img.caption}</figcaption>
                        ) : null}
                      </figure>
                    ))}
                  </div>
                </Reveal>
              ) : null}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              {glance.length > 0 ? (
                <section className="card p-6" aria-labelledby="glance-title">
                  <h2 id="glance-title" className="eyebrow">
                    At a glance
                  </h2>
                  <dl className="mt-5 space-y-4">
                    {glance.map(([key, label]) => (
                      <div key={key}>
                        <dt className="text-xs font-medium uppercase tracking-[0.08em] text-project">{label}</dt>
                        <dd className="mt-1 text-[15px] leading-relaxed text-ink/85">{project.glance[key]}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              {project.buildMetrics.length > 0 || project.techStack.length > 0 || project.aiModels.length > 0 ? (
                <section className="card p-6" aria-labelledby="build-title">
                  <h2 id="build-title" className="eyebrow">
                    Build notes
                  </h2>
                  {project.buildMetrics.length > 0 ? (
                    <dl className="mt-5 space-y-3">
                      {project.buildMetrics.map((m) => (
                        <div key={m.label} className="flex items-baseline justify-between gap-4 border-b border-line/10 pb-3 last:border-0 last:pb-0">
                          <dt className="text-sm text-ink-soft">{m.label}</dt>
                          <dd className="text-right text-sm font-medium">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  {project.techStack.length > 0 ? (
                    <>
                      <h3 className="mt-6 text-xs font-medium uppercase tracking-[0.08em] text-ink-soft">Stack</h3>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {project.techStack.map((t) => (
                          <li key={t} className="chip !px-2.5 !py-0.5">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  {project.aiModels.length > 0 ? (
                    <>
                      <h3 className="mt-6 text-xs font-medium uppercase tracking-[0.08em] text-ink-soft">AI pair-programmers</h3>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {project.aiModels.map((m) => (
                          <li key={m} className="chip !px-2.5 !py-0.5">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </section>
              ) : null}
            </aside>
          </div>

          {prev && next ? (
            <nav aria-label="More projects" className="wrap grid gap-4 pb-24 sm:grid-cols-2">
              <Link href={`/projects/${prev.slug}/`} className="card group p-6 transition-colors hover:border-line/25">
                <span className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
                  <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" /> Previous
                </span>
                <span className="mt-2 block font-display text-xl font-semibold tracking-[-0.02em]">{prev.title}</span>
              </Link>
              <Link href={`/projects/${next.slug}/`} className="card group p-6 text-right transition-colors hover:border-line/25">
                <span className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
                  Next <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 block font-display text-xl font-semibold tracking-[-0.02em]">{next.title}</span>
              </Link>
            </nav>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  );
}
