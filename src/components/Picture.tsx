import manifest from '@/generated/images.json';

export type ImageName = keyof typeof manifest;

type Props = {
  name: ImageName;
  alt: string;
  /** Layout width hint for the browser's srcset choice */
  sizes: string;
  className?: string;
  /** The page's LCP image: high fetch priority, never lazy */
  lcp?: boolean;
};

/**
 * Static-export replacement for next/image: WebP with a JPEG fallback, both pre-sized by
 * scripts/build-images.mjs. width/height give the browser the aspect ratio up front, so
 * there is no layout shift.
 */
export default function Picture({ name, alt, sizes, className, lcp }: Props) {
  const img = manifest[name];
  const srcset = (ext: string) =>
    img.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');

  return (
    <picture>
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`/img/${name}-${img.widths.at(-1)}.jpg`}
        srcSet={srcset('jpg')}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={alt}
        loading={lcp ? 'eager' : 'lazy'}
        fetchPriority={lcp ? 'high' : undefined}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
