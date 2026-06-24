import JournalBlockingFont from "@/components/JournalBlockingFont";

export const metadata = {
  title: "Field Journal — NorthPeak Outdoors",
  description: "Trip reports, gear notes, and route betas from the NorthPeak team.",
};

/*
 * Journal page — dominant problem: LCP + CLS.
 *
 * The single intentional issue here is the blocking web font loaded via a plain
 * <link rel="stylesheet"> with no preconnect and no display=swap (see
 * JournalBlockingFont), which delays render (LCP, via FOIT) and reflows text when
 * it swaps in (CLS). It lives only on this route, not in the shared layout.
 */
export default function JournalPage() {
  return (
    <>
      {/* Render-affecting blocking font hoisted into <head>. */}
      <JournalBlockingFont />

      <main className="journal-content">
        <section className="section">
          <h2>From the field journal</h2>
          <p className="lead" style={{ marginBottom: "2rem" }}>
            Trip reports, gear notes, and route betas from the NorthPeak team and
            our ambassadors. Updated whenever we get back to signal.
          </p>
          <div className="grid">
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
