import AdBanner from "@/components/AdBanner";

export const metadata = {
  title: "Deals — NorthPeak Outdoors",
  description: "Seasonal restock events, bundle savings, and members-only offers.",
};

/*
 * Deals page — dominant problem: CLS.
 *
 * The single intentional issue here is the promo banner that is injected after
 * mount via useEffect with no reserved space (see AdBanner), pushing all the
 * content below it down once it appears.
 */
export default function DealsPage() {
  return (
    <>
      {/* Layout-shifting announcement that arrives after mount. */}
      <AdBanner />

      <main>
        <section className="section">
          <h2>Current deals</h2>
          <p className="lead" style={{ marginBottom: "2rem" }}>
            We run a handful of honest sales a year — no fake countdowns, no
            inflated &ldquo;was&rdquo; prices. Here&apos;s what&apos;s genuinely
            discounted right now.
          </p>
          <div className="grid">
            <article className="card">
              <h3>Hardshell jacket bundle</h3>
              <p className="muted">
                Pair any Aurora hardshell with a midlayer and save 15% on the
                set. Free repairs for life, as always.
              </p>
            </article>
            <article className="card">
              <h3>Pack &amp; rain-cover combo</h3>
              <p className="muted">
                The Summit 55 pack ships with a fitted rain cover at no extra
                cost through the end of the season.
              </p>
            </article>
            <article className="card">
              <h3>Members&apos; restock access</h3>
              <p className="muted">
                Account holders get first pick of restocked sizes before they go
                public. It&apos;s free to join.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
