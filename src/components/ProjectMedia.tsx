import Picture from '@/components/Picture';
import type { ProjectImage } from '@/lib/projects';

type Props = {
  image: ProjectImage;
  /** Empty alt when the image only decorates a link that already has text */
  decorative?: boolean;
  sizes: string;
  /** The page's LCP image: fetched at high priority, never lazy */
  lcp?: boolean;
  className?: string;
};

/**
 * Photos fill a 16:10 frame. Screenshots sit in a dark window frame instead, anchored
 * top-left (so titles aren't cropped) and dimmed slightly so a light UI doesn't glare
 * against the dark page.
 */
export default function ProjectMedia({ image, decorative, sizes, lcp, className = '' }: Props) {
  const alt = decorative ? '' : image.alt;

  if (image.kind === 'screenshot') {
    return (
      <div
        className={`overflow-hidden rounded-lg border border-border bg-card-strong shadow-glow ${className}`}
      >
        <div className="flex h-8 items-center border-b border-border px-3">
          <span className="label truncate">HTML report</span>
        </div>
        <div className="relative aspect-[16/9]">
          <Picture
            name={image.name}
            alt={alt}
            sizes={sizes}
            lcp={lcp}
            className="absolute inset-0 h-full w-full object-cover object-left-top brightness-80"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-lg ${className}`}>
      <Picture
        name={image.name}
        alt={alt}
        sizes={sizes}
        lcp={lcp}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
    </div>
  );
}
