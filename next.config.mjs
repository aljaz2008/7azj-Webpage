import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Plain files for NEOSERV shared hosting (LiteSpeed): no Node server at runtime.
  // Security headers, HTTPS/www redirects and caching live in public/.htaccess.
  output: 'export',
  // /projects/cansat/ -> out/projects/cansat/index.html, served directly by LiteSpeed
  trailingSlash: true,
  reactStrictMode: true,

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};

export default withMDX(nextConfig);
