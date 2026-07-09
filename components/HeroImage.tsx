import Image from "next/image";

/*
 * HeroImage — the hero banner shown at the top of the home page.
 *
 * We route the hero through next/image so it is automatically resized and served
 * in a modern format (AVIF/WebP) with a responsive srcset. Because this image is
 * the LCP element on every homepage view, we mark it `priority` so next/image
 * loads it eagerly, sets fetchpriority="high", and preloads it in the document
 * head instead of leaving it to be discovered and fetched late.
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
        sizes="100vw"
        quality={90}
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
