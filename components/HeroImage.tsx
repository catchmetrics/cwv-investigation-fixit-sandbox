import Image from "next/image";

/*
 * HeroImage — the above-the-fold hero banner.
 *
 * This is a Server Component (no "use client"), which is correct. The hero image
 * is served through next/image so it is resized, converted to a next-gen format
 * (AVIF/WebP), given a responsive srcset, marked priority (preloaded at high
 * priority as the LCP element), and given explicit dimensions that reserve space.
 */

export default function HeroImage() {
  return (
    <section className="hero">
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
