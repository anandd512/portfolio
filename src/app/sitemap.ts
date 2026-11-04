import type { MetadataRoute } from 'next';
import { getAllPosts, getAllProjects } from '@/lib/content';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, priority: 1 },
    ...getAllProjects().map((p) => ({ url: `${site.url}/projects/${p.slug}/`, lastModified: now, priority: 0.8 })),
    { url: `${site.url}/blog/`, lastModified: now, priority: 0.5 },
    ...getAllPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: new Date(p.date), priority: 0.5 })),
  ];
}
