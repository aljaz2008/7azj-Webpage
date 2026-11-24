import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';

/**
 * GitHub link for MDX articles: <GithubLink href="...">owner/repo</GithubLink>.
 * Styled exactly like the contact links: 16 px brand icon, primary label, 14 px muted
 * external arrow, all turning amber on hover (.icon-link opts out of the article link style).
 */
export default function GithubLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="icon-link group inline-flex items-center gap-2 text-primary transition hover:text-accent"
    >
      <GithubIcon size={16} className="shrink-0" />
      {children}
      <ArrowUpRight
        size={14}
        aria-hidden
        className="shrink-0 text-secondary transition group-hover:text-accent"
      />
    </a>
  );
}
