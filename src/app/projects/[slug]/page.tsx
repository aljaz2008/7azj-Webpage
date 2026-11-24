import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import { getProject, projects } from '@/lib/projects';
import { CALLSIGN } from '@/lib/station';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${CALLSIGN}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`
    }
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { Article } = project;

  return (
    <>
      <Navbar />
      <main className="px-6 pb-24 pt-32 md:px-10">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-secondary transition hover:text-accent"
          >
            <ArrowLeft size={15} aria-hidden />
            All projects
          </Link>

          <p className="label mt-10">
            {project.tags.join(', ')}
            {project.status ? <span className="text-accent"> ({project.status})</span> : null}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-primary md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-secondary md:text-xl">
            {project.summary}
          </p>

          {project.image ? (
            <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-lg">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover object-top"
              />
              <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
            </div>
          ) : null}

          <div className="mdx-content mt-12 space-y-5 text-secondary">
            <Article />
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
