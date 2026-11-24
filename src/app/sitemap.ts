import type { MetadataRoute } from 'next';
import { projectPath, projects } from '@/lib/projects';
import { SITE_URL } from '@/lib/station';

// Static export: rendered once at build into out/
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}${projectPath(p.slug)}`,
      changeFrequency: 'monthly' as const,
      priority: p.writtenUp ? 0.7 : 0.4
    }))
  ];
}
