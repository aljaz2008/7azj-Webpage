import type { ReactNode } from 'react';
import Reveal from '@/components/Reveal';

type SectionProps = {
  id: string;
  index: number;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
};

/**
 * Editorial section: sticky label column on the left, flowing content on the right,
 * separated from the previous section by a hairline.
 */
export default function Section({ id, index, label, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative px-6 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-border py-24 md:py-32 lg:grid-cols-[200px_1fr] lg:gap-16">
        <div>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-secondary lg:sticky lg:top-28">
            <span className="text-accent">{String(index).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-border" />
            {label}
          </p>
        </div>

        <div className="min-w-0">
          <Reveal>
            <h2
              id={`${id}-title`}
              className="max-w-3xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-primary md:text-6xl"
            >
              {title}
            </h2>
            {intro ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">{intro}</p> : null}
          </Reveal>
          <div className="mt-14">{children}</div>
        </div>
      </div>
    </section>
  );
}
