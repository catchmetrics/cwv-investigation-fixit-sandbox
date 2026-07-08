import Image from "next/image";

/*
 * GalleryGrid — a grid of trip photos.
 *
 * Server Component (correct). Photos are served through next/image so they are
 * resized to their display size, converted to a next-gen format (AVIF/WebP),
 * given a responsive srcset, lazy-loaded (below the fold), and given explicit
 * dimensions that reserve layout space.
 */

const PHOTOS = [
  { src: "/gallery-1.jpg", caption: "Summit Ridge — first light" },
  { src: "/gallery-2.jpg", caption: "Alpine Lake — base camp" },
  { src: "/gallery-3.jpg", caption: "Pine Forest — approach trail" },
  { src: "/gallery-4.jpg", caption: "Glacier Pass — the crux" },
  { src: "/gallery-5.jpg", caption: "Canyon Trail — golden hour" },
  { src: "/gallery-6.jpg", caption: "Misty Peaks — the descent" },
];

export default function GalleryGrid() {
  return (
    <div className="gallery-grid">
      {PHOTOS.map((p) => (
        <figure key={p.src}>
          <Image
            src={p.src}
            alt={p.caption}
            width={1800}
            height={1200}
            loading="lazy"
            sizes="(max-width: 700px) 100vw, 320px"
          />
          <figcaption>{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
