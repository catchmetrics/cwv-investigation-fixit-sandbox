import HeroImage from "@/components/HeroImage";
import ErrorScenarios from "@/components/ErrorScenarios";

/*
 * Home page — dominant problem: LCP.
 *
 * The single intentional issue on this route is the heavy, unoptimized hero
 * <img> (see HeroImage). Everything else here is plain, well-behaved content.
 *
 * ErrorScenarios fires a set of realistic JS errors for testing
 * CatchMetrics error tracking and source-map symbolication.
 */
export default function Home() {
  return (
    <main>
      <HeroImage />
      <ErrorScenarios />

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
