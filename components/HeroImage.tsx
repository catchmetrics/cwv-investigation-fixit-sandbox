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
        Fixed (ADP-1762): the hero LCP element now renders through next/image with
        explicit width/height, priority (preload + fetchpriority="high") and
        responsive sizes — so it is discovered early, served as optimized
        AVIF/WebP, and no longer shifts layout.
      */}
      <Image
        className="hero-img"
        src="/hero.jpg"
        alt="A climber on a snow-covered ridge at sunrise"
        width={2400}
        height={1400}
        priority
        sizes="100vw"
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
