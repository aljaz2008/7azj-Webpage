'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import ProjectModal from '@/components/ProjectModal';
import Reveal from '@/components/Reveal';
import { projects } from '@/lib/projects';

export default function ProjectsList() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = projects.find((project) => project.id === activeId) ?? null;
  const close = useCallback(() => setActiveId(null), []);

  return (
    <>
      <div className="space-y-20 md:space-y-28">
        {projects.map((project, i) => (
          <Reveal key={project.id}>
            <article className="group grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <button
                type="button"
                onClick={() => setActiveId(project.id)}
                aria-label={`Read: ${project.title}`}
                className={`relative aspect-[16/10] overflow-hidden rounded-lg ${i % 2 ? 'md:order-2' : ''}`}
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
              </button>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {project.tags.join(' · ')}
                </p>
                <h3 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-primary">
                  {project.title}
                </h3>
                <p className="mt-4 leading-relaxed text-secondary">{project.summary}</p>
                <button
                  type="button"
                  onClick={() => setActiveId(project.id)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline decoration-border underline-offset-8 transition hover:decoration-accent"
                >
                  Read the write-up
                  <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <ProjectModal
        open={Boolean(activeProject)}
        title={activeProject?.title ?? ''}
        Article={activeProject?.Article ?? null}
        onClose={close}
      />
    </>
  );
}
