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
        CWV-FIX[LCP]: the hero is the Largest Contentful Paint element, and it was
        being discovered/fetched late because it shipped as a plain <img> with no
        priority or preload. Rendering it through next/image with `priority` makes
        Next.js emit a <link rel="preload" as="image"> in <head> and set
        fetchpriority="high", so the browser starts downloading it immediately, in
        parallel with the initial HTML — closing the ~2.9s resource-load delay.
        next/image also serves a modern format (AVIF/WebP) resized per device via
        `sizes`, trimming the bytes once the fetch starts. Explicit width/height
        keep the intrinsic ratio; the existing .hero-img class handles layout.
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
