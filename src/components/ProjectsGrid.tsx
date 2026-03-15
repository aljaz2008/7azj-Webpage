'use client';

import Image from 'next/image';
import { useState } from 'react';
import ProjectModal from '@/components/ProjectModal';
import { projects } from '@/lib/projects';

export default function ProjectsGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = projects.find((project) => project.id === activeId) ?? null;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveId(project.id)}
            className="group rounded-2xl border border-border bg-card p-5 text-left transition hover:-translate-y-1 hover:border-white/30"
          >
            <div className="relative mb-4 h-44 overflow-hidden rounded-xl border border-border">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="font-heading text-2xl text-primary">{project.title}</h3>
            <p className="mt-2 text-sm text-secondary">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded border border-border px-2 py-1 text-[11px] text-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
      <ProjectModal
        open={Boolean(activeProject)}
        title={activeProject?.title ?? ''}
        Article={activeProject?.Article ?? null}
        onClose={() => setActiveId(null)}
      />
    </>
  );
}
