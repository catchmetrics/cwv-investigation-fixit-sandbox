/*
 * HeroImage — the above-the-fold hero banner.
 *
 * This is a Server Component (no "use client"), which is correct. The problem is
 * how the image itself is rendered.
 */

export default function HeroImage() {
  return (
    <section className="hero">
      {/*
        CWV-ISSUE[LCP]: The Largest Contentful Paint element is this hero image,
        rendered with a plain <img> pointing at /hero.jpg — a genuinely heavy
        (~5 MB, 2400x1400) unoptimized JPEG. It is NOT served through next/image,
        so there is no automatic resizing, no modern format (AVIF/WebP), no
        responsive srcset, and no width/height, and it is NOT marked priority /
        preloaded — so it is discovered late and downloads slowly, wrecking LCP.
        It ALSO has no width/height, so it contributes to CLS when it loads.
        CWV-FIX: use next/image (<Image src="/hero.jpg" priority fill sizes=...>)
        or, at minimum, add a <link rel="preload" as="image">, explicit
        width/height to reserve space, fetchpriority="high", and replace the asset
        with a properly compressed, correctly sized image.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-img"
        src="/hero.jpg"
        alt="A climber on a snow-covered ridge at sunrise"
      />
      <div className="hero-caption">
        <h1>Gear for the high places.</h1>
        <p className="lead">
          NorthPeak builds backcountry equipment for hikers, climbers, and
          alpinists who measure their days in vertical feet.
        </p>
      </div>
    </section>
  );
}
