import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { SITE_URL } from '@/lib/station';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: p.writtenUp ? 0.7 : 0.4
    }))
  ];
}
