/*
 * HeroImage — the above-the-fold hero banner.
 *
 * This is a Server Component (no "use client"), which is correct. The problem is
 * how the image itself is rendered.
 */

import Image from "next/image";

export default function HeroImage() {
  return (
    <section className="hero">
      {/*
        The hero is the LCP element. Serving it through next/image with `priority`
        emits a <link rel="preload" as="image"> + fetchpriority="high" and disables
        lazy loading, so it is discovered early and fetched first. next/image also
        resizes and re-encodes the source into a modern format (AVIF/WebP) via the
        default loader, and the explicit width/height reserve layout space so the
        hero no longer contributes to CLS.
      */}
      <Image
        className="hero-img"
        src="/hero.jpg"
        alt="A climber on a snow-covered ridge at sunrise"
        width={2400}
        height={1400}
        sizes="100vw"
        priority
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
