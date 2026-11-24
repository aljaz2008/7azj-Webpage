import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { featuredProjects, otherProjects } from '@/lib/projects';

/** Up to three featured projects large, then everything else as a compact list. */
export default function ProjectsList() {
  return (
    <>
      <div className="space-y-20 md:space-y-28">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug}>
            <article className="group grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <Link
                href={`/projects/${project.slug}`}
                tabIndex={-1}
                aria-hidden
                className={`relative block aspect-[16/10] overflow-hidden rounded-lg ${i % 2 ? 'md:order-2' : ''}`}
              >
                <Image
                  src={project.image!.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-top"
                />
                <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
              </Link>

              <div>
                <p className="label text-accent">{project.tags.join(', ')}</p>
                <h3 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-primary">
                  {project.title}
                </h3>
                <p className="mt-4 leading-relaxed text-secondary">{project.summary}</p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline decoration-border underline-offset-8 transition hover:decoration-accent"
                >
                  Read the write-up
                  <span className="sr-only">: {project.title}</span>
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {otherProjects.length ? (
        <Reveal className="mt-24">
          <h3 className="font-heading text-2xl font-semibold text-primary">On the bench</h3>
          <ul className="mt-6 border-t border-border">
            {otherProjects.map((project) => (
              <li key={project.slug} className="border-b border-border">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid gap-x-8 gap-y-2 py-5 md:grid-cols-[minmax(0,16rem)_1fr_auto] md:items-baseline"
                >
                  <span className="font-heading text-lg font-semibold text-primary transition group-hover:text-accent">
                    {project.title}
                  </span>
                  <span className="text-secondary">
                    {project.summary}
                    <span className="label mt-1 block">
                      {project.tags.join(', ')}
                      {project.status ? (
                        <span className="text-accent"> ({project.status})</span>
                      ) : null}
                    </span>
                  </span>
                  <span className="label whitespace-nowrap">
                    {project.writtenUp ? 'Read' : 'Write-up coming'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}
    </>
  );
}
