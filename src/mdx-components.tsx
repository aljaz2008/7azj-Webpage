import type { MDXComponents } from 'mdx/types';
import Figure from '@/components/Figure';
import GithubLink from '@/components/GithubLink';

// External links inside MDX articles open in a new tab without leaking window.opener.
const components: MDXComponents = {
  // <Figure name="..." alt="..." caption="..." wide /> in project articles
  Figure,
  // <GithubLink href="...">owner/repo</GithubLink>
  GithubLink,
  a: ({ href = '', children, ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        {...props}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
};

export function useMDXComponents(): MDXComponents {
  return components;
}
