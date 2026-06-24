import AdBanner from "@/components/AdBanner";
import HeroImage from "@/components/HeroImage";
import FeatureGrid from "@/components/FeatureGrid";

/*
 * Home page.
 *
 * Composition of:
 *  - AdBanner   -> CWV-ISSUE[CLS] (client-injected, no reserved space)
 *  - HeroImage  -> CWV-ISSUE[LCP] (heavy plain <img>, not next/image, no priority)
 *  - FeatureGrid-> CWV-ISSUE[TBT] (needless "use client" on static content)
 * The blocking font + blocking head script live in app/layout.tsx.
 */
export default function Home() {
  return (
    <>
      {/* Layout-shifting banner that arrives after mount. */}
      <AdBanner />

      <main>
        <HeroImage />

        <section className="section">
          <h2>Why NorthPeak</h2>
          <p className="lead" style={{ marginBottom: "2rem" }}>
            We make a small number of things, and we make them to last a lifetime
            of hard use.
          </p>
          <FeatureGrid />
        </section>

        <section className="section">
          <h2>From the field journal</h2>
          <p className="lead">
            Trip reports, gear notes, and route betas from the NorthPeak team and
            our ambassadors. Updated whenever we get back to signal.
          </p>
          <div className="grid" style={{ marginTop: "1.5rem" }}>
            <article className="card">
              <h3>Traversing the Glacier Pass</h3>
              <p className="muted">
                Three days, two storms, and one very good thermos. A trip report
                from our spring shakedown on the high route.
              </p>
            </article>
            <article className="card">
              <h3>Packing for shoulder season</h3>
              <p className="muted">
                The layering system we reach for when the forecast can&apos;t make
                up its mind between summer and winter.
              </p>
            </article>
            <article className="card">
              <h3>Repair log: 2,000 km pack</h3>
              <p className="muted">
                What actually wears out after two thousand kilometres on the
                trail, and what we changed in the next production run.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
