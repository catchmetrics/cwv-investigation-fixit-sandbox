import Image from "next/image";

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
        The Largest Contentful Paint element is this hero image. It is served
        through next/image so it is automatically resized, served in a modern
        format (AVIF/WebP) with a responsive srcset, and — because of `priority` —
        preloaded with fetchpriority="high" so it is discovered and painted early.
        The explicit width/height (intrinsic 2400x1400) plus `sizes` reserve the
        correct aspect-ratio box, so it no longer shifts surrounding content.
      */}
      <Image
        className="hero-img"
        src="/hero.jpg"
        alt="A climber on a snow-covered ridge at sunrise"
        width={2400}
        height={1400}
        priority
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
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
