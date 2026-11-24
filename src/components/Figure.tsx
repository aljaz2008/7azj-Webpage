import Picture, { type ImageName } from '@/components/Picture';
import manifest from '@/generated/images.json';

type Props = {
  /** File name in images/ without extension (pre-sized by scripts/build-images.mjs) */
  name: ImageName;
  alt: string;
  caption?: string;
  /** Wide screenshots break out of the text column on xl screens */
  wide?: boolean;
};

/**
 * Image for MDX articles: <Figure name="..." alt="..." caption="..." wide />.
 * Clicking opens the largest pre-sized version, since dashboard text is small inline.
 */
export default function Figure({ name, alt, caption, wide }: Props) {
  const img = manifest[name];
  if (!img) throw new Error(`<Figure>: no image "${name}" in images/`);
  const full = `/img/${name}-${img.widths.at(-1)}.webp`;

  return (
    <figure className={`my-10 ${wide ? 'xl:-mx-48' : ''}`}>
      <a href={full} title="Open full size" className="block">
        <Picture
          name={name}
          alt={alt}
          sizes={wide ? '(min-width: 1280px) 1152px, 100vw' : '(min-width: 768px) 768px, 100vw'}
          className="h-auto w-full rounded-lg border border-border"
        />
      </a>
      {caption ? <figcaption className="mt-3 text-sm text-secondary">{caption}</figcaption> : null}
    </figure>
  );
}
