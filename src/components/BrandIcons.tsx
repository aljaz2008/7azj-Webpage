// Brand icons were removed from lucide-react 1.x, so they live here as inline SVGs.
type IconProps = { size?: number; className?: string };

export function LinkedinIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function DiscordIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.38 2.8a13.7 13.7 0 0 0-.63 1.3 18.4 18.4 0 0 0-5.5 0 12.6 12.6 0 0 0-.64-1.3 19.7 19.7 0 0 0-4.94 1.57C.53 9.05-.32 13.6.1 18.1a19.9 19.9 0 0 0 6.07 3.07c.49-.67.92-1.38 1.3-2.12a12.9 12.9 0 0 1-2.04-.98c.17-.13.34-.26.5-.39a14.2 14.2 0 0 0 12.14 0c.16.14.33.27.5.39-.65.39-1.33.71-2.05.98.38.74.81 1.45 1.3 2.12a19.8 19.8 0 0 0 6.08-3.07c.5-5.2-.84-9.72-3.58-13.73ZM8.02 15.33c-1.18 0-2.15-1.09-2.15-2.42 0-1.34.95-2.43 2.15-2.43 1.2 0 2.17 1.1 2.15 2.43 0 1.33-.95 2.42-2.15 2.42Zm7.96 0c-1.18 0-2.15-1.09-2.15-2.42 0-1.34.95-2.43 2.15-2.43 1.2 0 2.17 1.1 2.15 2.43 0 1.33-.94 2.42-2.15 2.42Z" />
    </svg>
  );
}
