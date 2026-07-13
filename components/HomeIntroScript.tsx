/*
 * HomeIntroScript — a render-blocking inline <script> on the home page.
 *
 * Server Component that emits a synchronous inline <script> into the tree. Next.js
 * hoists bare <script> elements into the document <head>, where this one runs
 * synchronously before the browser can paint the homepage.
 */

/*
 * CWV-ISSUE[LCP]: This synchronous inline <script> runs a main-thread busy-loop as
 * part of a "homepage personalisation bootstrap" BEFORE the browser can paint. It
 * sits in the critical path in <head>, so it directly delays First Contentful Paint
 * and Largest Contentful Paint on the home page — the hero cannot paint until this
 * finishes. A classic render-blocking script.
 * CWV-FIX: remove the busy-work, or move it to next/script with
 * strategy="afterInteractive"/"lazyOnload" (or defer/async on a plain <script>) so
 * it no longer blocks the initial homepage render.
 */
const HOME_BLOCKING_SCRIPT = `
  (function () {
    // Simulated "homepage above-the-fold personalisation bootstrap" that needlessly
    // blocks rendering before the hero can paint.
    var start = Date.now();
    var sink = 0;
    while (Date.now() - start < 800) {
      sink += Math.sqrt(sink + 1);
    }
    window.__npHomeReady = sink > 0;
  })();
`;

export default function HomeIntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: HOME_BLOCKING_SCRIPT }} />;
}
