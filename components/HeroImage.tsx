import Image from "next/image";

/*
 * HeroImage — the hero banner shown at the top of the home page.
 *
 * We route the hero through next/image so it is automatically resized and served
 * in a modern format (AVIF/WebP) with a responsive srcset. The hero is the LCP
 * element on the home page, so we mark it `priority` to eager-load it, request it
 * at high fetch priority, and inject a preload link — the browser fetches it
 * immediately instead of deferring it behind the rest of the page.
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
