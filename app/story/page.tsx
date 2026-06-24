import StoryBlockingScript from "@/components/StoryBlockingScript";

export const metadata = {
  title: "Our Story — NorthPeak Outdoors",
  description: "How NorthPeak started, and why we build the way we do.",
};

/*
 * Story page — dominant problem: LCP.
 *
 * The single intentional issue here is the render-blocking synchronous inline
 * <script> (see StoryBlockingScript) that runs a busy-loop before the page can
 * paint. It lives only on this route, not in the shared layout.
 */
export default function StoryPage() {
  return (
    <>
      {/* Render-blocking inline script hoisted into <head>. */}
      <StoryBlockingScript />

      <main>
        <section className="section">
          <h2>Our story</h2>
          <p className="lead">
            NorthPeak Outdoors started in a Boulder garage in 2009 with a single
            repaired ice axe and a stubborn belief that good gear should outlast
            the person who buys it.
          </p>
        </section>

        <section className="section">
          <h2>From a garage to the ranges</h2>
          <p className="lead" style={{ marginBottom: "2rem" }}>
            What began as weekend repairs for friends became a small workshop,
            then a brand. Through all of it, the rule never changed: make less,
            make it better, and stand behind it for life.
          </p>
          <div className="grid">
            <article className="card">
              <h3>2009 — The first axe</h3>
              <p className="muted">
                A re-handled ice axe that refused to die became the proof that
                repair beats replacement.
              </p>
            </article>
            <article className="card">
              <h3>2014 — The first shell</h3>
              <p className="muted">
                Two winters of field testing produced the Aurora hardshell, still
                the backbone of the line.
              </p>
            </article>
            <article className="card">
              <h3>Today — Repair forever</h3>
              <p className="muted">
                Every hardgood ships with a lifetime repair guarantee. The most
                sustainable jacket is the one you already own.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
