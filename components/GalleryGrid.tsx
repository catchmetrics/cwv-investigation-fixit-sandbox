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
            CWV-ISSUE[CLS][LCP]: Every gallery image is a plain <img> with NO
            width/height attributes (and no CSS aspect-ratio), so the browser
            cannot reserve space before each ~3.4 MB image loads. As each one
            arrives, it expands its figure and shoves the rest of the grid around,
            producing repeated layout shifts (CLS). The images are also
            unoptimized full-resolution JPEGs loaded eagerly, which competes for
            bandwidth and hurts LCP. They are not lazy-loaded either.
            CWV-FIX: use next/image with explicit width/height (or fill + a sized
            container), add loading="lazy" for below-the-fold images, set an
            explicit width/height or aspect-ratio to reserve layout space, and
            serve optimized/resized assets.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.caption} />
          <figcaption>{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
