import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/** ---------------------------------------------------------------------------
 * PROJECTS
 * Add a project by dropping a Markdown file into /content/projects.
 * Frontmatter schema is documented in content/projects/_TEMPLATE.md.
 * ------------------------------------------------------------------------- */
export type BuildMetric = { label: string; value: string };

export type ProjectImage = { src: string; alt: string; caption?: string };

/** The PM-lens summary shown in the "At a glance" panel. */
export type ProjectGlance = {
  problem?: string;
  user?: string;
  bet?: string;
  cut?: string;
  outcome?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string; // 'YYYY-MM' from frontmatter
  when: string; // display label, e.g. 'Mar 2026'
  role: string;
  status: string;
  tags: string[];
  accent: string;
  featured: boolean;
  order: number;
  cover?: ProjectImage;
  gallery: ProjectImage[];
  glance: ProjectGlance;
  demoUrl?: string;
  demoLabel?: string;
  repoUrl?: string;
  embedUrl?: string;
  buildMetrics: BuildMetric[];
  techStack: string[];
  aiModels: string[];
};

export type Project = ProjectMeta & { content: string };

const DEFAULT_ACCENT = '#C05B3F';

function readCollection(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'));
}

export function getAllProjects(): Project[] {
  return readCollection('projects')
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, 'projects', file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        summary: data.summary ?? '',
        date: String(data.date ?? ''),
        when: formatMonth(String(data.date ?? '')),
        role: data.role ?? '',
        status: data.status ?? '',
        tags: data.tags ?? [],
        accent: data.accent ?? DEFAULT_ACCENT,
        featured: Boolean(data.featured),
        order: Number(data.order ?? 999),
        cover: data.cover,
        gallery: data.gallery ?? [],
        glance: data.glance ?? {},
        demoUrl: data.demoUrl || undefined,
        demoLabel: data.demoLabel,
        repoUrl: data.repoUrl || undefined,
        embedUrl: data.embedUrl || undefined,
        buildMetrics: data.buildMetrics ?? [],
        techStack: data.techStack ?? [],
        aiModels: data.aiModels ?? [],
        content,
      } satisfies Project;
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

/** Previous / next project in display order, wrapping around. */
export function getAdjacentProjects(slug: string) {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1 || all.length < 2) return { prev: undefined, next: undefined };
  return {
    prev: all[(i - 1 + all.length) % all.length],
    next: all[(i + 1) % all.length],
  };
}

/** "2026-03" → "Mar 2026". A bare year passes through unchanged. */
export function formatMonth(date: string): string {
  const m = /^(\d{4})-(\d{2})/.exec(date);
  if (!m) return date;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, 1));
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/** "#C05B3F" → "192 91 63", for use as rgb(var(--project) / <alpha>). */
export function hexToRgbChannels(hex: string): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** ---------------------------------------------------------------------------
 * BLOG / WRITING
 * Add a post by dropping a Markdown file into /content/blog.
 * ------------------------------------------------------------------------- */
export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  draft: boolean;
  readingTime: string;
};

export type Post = PostMeta & { content: string };

export function getAllPosts({ includeDrafts = false } = {}): Post[] {
  return readCollection('blog')
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, 'blog', file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        summary: data.summary ?? '',
        date: String(data.date ?? ''),
        tags: data.tags ?? [],
        draft: Boolean(data.draft),
        readingTime: readingTime(content).text,
        content,
      } satisfies Post;
    })
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts({ includeDrafts: true }).find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
