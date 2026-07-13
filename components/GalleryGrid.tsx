/*
 * GalleryGrid — a grid of trip photos.
 *
 * Server Component (correct). The problem is the images themselves.
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
          {/*
            Explicit width/height give the browser an intrinsic aspect ratio, so
            it reserves layout space before each photo loads. Combined with the
            grid's `width: 100%` / auto height, the images scale responsively while
            the reserved box stays fixed — the grid no longer reflows as photos
            arrive (fixes CLS). Below-the-fold photos are lazy-loaded so they stop
            competing for bandwidth with the initial render.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt={p.caption}
            width={1600}
            height={1067}
            loading="lazy"
            decoding="async"
          />
          <figcaption>{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
