import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        card: '#111111',
        border: '#222222',
        primary: '#ffffff',
        secondary: '#888888'
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace']
      },
      boxShadow: {
        glow: '0 0 35px rgba(255,255,255,0.08)'
      }
    }
  },
  plugins: []
};

export default config;
