import Image from "next/image";

/*
 * HeroImage — the hero banner shown at the top of the home page.
 *
 * We route the hero through next/image so it is automatically resized and served
 * in a modern format (AVIF/WebP) with a responsive srcset. To keep the initial
 * payload lean we lazy-load imagery across the site and let the browser schedule
 * the hero download together with the rest of the page rather than forcing it to
 * the front of the queue.
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
        loading="lazy"
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
