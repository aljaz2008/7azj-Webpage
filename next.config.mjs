import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

const isDev = process.env.NODE_ENV !== 'production';

// Content Security Policy. Everything (fonts, images, globe texture) is served
// from our own origin, so external hosts are not allowed anywhere.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests'])
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // Read with fs at render time (colour tokens for the OG image / worked map / theme-color,
  // TTFs for the OG image), so they must ship inside the standalone server bundle.
  outputFileTracingIncludes: {
    '/**': ['./src/app/globals.css', './src/fonts/*.ttf']
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  }
};

export default withMDX(nextConfig);
