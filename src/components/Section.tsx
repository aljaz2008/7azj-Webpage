import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative flex min-h-screen items-center px-4 py-20 md:px-16 md:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-secondary sm:text-xs md:mb-5 md:tracking-[0.3em]">
          {title}
        </p>
        {children}
      </div>
    </section>
  );
}
