export const metadata = {
  title: "About — NorthPeak Outdoors",
  description: "Who we are and why we build the gear we build.",
};

/*
 * About page — a plain, well-behaved Server Component. Intentionally clean so the
 * repo reads like a real site and not every page is a performance dumpster fire.
 */
export default function AboutPage() {
  return (
    <main>
      <section className="section">
        <h2>About NorthPeak</h2>
        <p className="lead">
          NorthPeak Outdoors started in a Boulder garage in 2009 with a single
          repaired ice axe and a stubborn belief that good gear should outlast
          the person who buys it.
        </p>
      </section>

      <section className="section">
        <h2>Our promise</h2>
        <div className="grid">
          <div className="card">
            <h3>Make less, make it better</h3>
            <p className="muted">
              We&apos;d rather ship four products we&apos;re proud of than forty we
              aren&apos;t. Every item earns its place in the catalogue.
            </p>
          </div>
          <div className="card">
            <h3>Repair forever</h3>
            <p className="muted">
              Lifetime repairs on all hardgoods. The most sustainable jacket is
              the one you already own.
            </p>
          </div>
          <div className="card">
            <h3>Give back to the trail</h3>
            <p className="muted">
              One percent of every sale funds trail maintenance and access
              advocacy in the ranges we love.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
