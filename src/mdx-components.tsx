import type { MDXComponents } from 'mdx/types';

// External links inside MDX articles open in a new tab without leaking window.opener.
const components: MDXComponents = {
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
