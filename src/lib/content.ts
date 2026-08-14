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
export type ProjectStat = { value: string; label: string };

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  tags: string[];
  accent?: string; // optional per-project accent, e.g. "#C05B3F"
  featured: boolean;
  order: number;
  demoUrl?: string;
  demoLabel?: string;
  repoUrl?: string;
  stats?: ProjectStat[];
};

export type Project = ProjectMeta & { content: string };

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
        year: String(data.year ?? ''),
        role: data.role ?? '',
        tags: data.tags ?? [],
        accent: data.accent,
        featured: Boolean(data.featured),
        order: Number(data.order ?? 999),
        demoUrl: data.demoUrl,
        demoLabel: data.demoLabel,
        repoUrl: data.repoUrl,
        stats: data.stats ?? [],
        content,
      } satisfies Project;
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
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
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
