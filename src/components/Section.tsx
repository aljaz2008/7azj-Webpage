import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative flex min-h-screen items-center px-6 py-24 md:px-16 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-secondary">{title}</p>
        {children}
      </div>
    </section>
  );
}
