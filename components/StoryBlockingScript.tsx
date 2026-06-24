/*
 * StoryBlockingScript — a render-blocking inline <script> for the /story page.
 *
 * This is a Server Component that emits a synchronous inline <script> into the
 * document. Next.js hoists bare <script> elements rendered in the tree into the
 * document <head>, where this one runs synchronously before the page can paint.
 */

/*
 * CWV-ISSUE[LCP]: This synchronous inline <script> runs a pointless busy-loop on
 * the main thread before the browser can paint anything, directly delaying First
 * Contentful Paint and Largest Contentful Paint. It is a classic render-blocking
 * script in the critical path — and it lives ONLY on this route, so /story is the
 * only page that pays for it.
 * CWV-FIX: remove the busy-work entirely, or move this to next/script with
 * strategy="afterInteractive"/"lazyOnload" (or defer/async on a plain <script>)
 * so it no longer blocks the initial render.
 */
const BLOCKING_HEAD_SCRIPT = `
  (function () {
    // Simulated "story personalisation bootstrap" that needlessly blocks rendering.
    var start = Date.now();
    var sink = 0;
    while (Date.now() - start < 3500) {
      sink += Math.sqrt(sink + 1);
    }
    window.__npStoryReady = sink > 0;
  })();
`;

export default function StoryBlockingScript() {
  return <script dangerouslySetInnerHTML={{ __html: BLOCKING_HEAD_SCRIPT }} />;
}
