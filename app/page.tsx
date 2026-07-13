import HeroImage from "@/components/HeroImage";
import HomeIntroScript from "@/components/HomeIntroScript";
import HomeHeadlineFont from "@/components/HomeHeadlineFont";

/*
 * Home page — dominant metric: LCP.
 *
 * The homepage carries THREE distinct Largest-Contentful-Paint problems, each in its
 * own component so it can be fixed independently:
 *   1. HeroImage        — the LCP element is a heavy, unoptimized <img> (no next/image,
 *                         no priority/preload) so it is discovered late and paints slowly.
 *   2. HomeIntroScript  — a synchronous render-blocking inline <script> in <head> that
 *                         busy-loops before the hero can paint.
 *   3. HomeHeadlineFont — a remote headline font loaded with no preconnect and no
 *                         display=swap, blocking the above-the-fold headline paint.
 * Everything else here is plain, well-behaved content.
 */
export default function Home() {
  return (
    <main>
      <HomeIntroScript />
      <HomeHeadlineFont />
      <HeroImage />

      <section className="section">
        <h2>Why NorthPeak</h2>
        <p className="lead" style={{ marginBottom: "2rem" }}>
          We make a small number of things, and we make them to last a lifetime
          of hard use. From repair-forever hardshells to packs that survive
          two-thousand-kilometre seasons, every item earns its place in the
          catalogue.
        </p>
        <div className="grid">
          <article className="card">
            <h3>Field-tested durability</h3>
            <p className="muted">
              Every pack and shell is abused on real expeditions before it
              ships. If it fails on the mountain, it never reaches the store.
            </p>
          </article>
          <article className="card">
            <h3>Repair, don&apos;t replace</h3>
            <p className="muted">
              Lifetime repairs on all hardgoods. Send it back, we fix it, you
              keep climbing. Less waste, more summits.
            </p>
          </article>
          <article className="card">
            <h3>Built by alpinists</h3>
            <p className="muted">
              Our design team has summited on six continents. The gear reflects
              decades of hard-won mistakes.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
