/*
 * StoryBlockingScript — the /story "personalisation bootstrap".
 *
 * This is a Server Component that emits the bootstrap for the /story page. It is
 * loaded through next/script with strategy="afterInteractive" so it runs AFTER the
 * initial render instead of blocking it. It must not do synchronous main-thread
 * work in the critical path.
 */

import Script from "next/script";

/*
 * CWV-FIX[LCP]: previously this rendered a bare synchronous inline <script> that
 * Next.js hoisted into <head> and ran a ~3.5s busy-loop before the browser could
 * paint, delaying First Contentful Paint and the text Largest Contentful Paint on
 * /story. The busy-work is removed and the bootstrap now loads via next/script
 * with strategy="afterInteractive", so it no longer blocks the initial render.
 */
const STORY_BOOTSTRAP_SCRIPT = `
  (function () {
    // Story personalisation bootstrap — runs after the page is interactive, so it
    // no longer blocks first paint / LCP.
    window.__npStoryReady = true;
  })();
`;

export default function StoryBlockingScript() {
  return (
    <Script id="np-story-bootstrap" strategy="afterInteractive">
      {STORY_BOOTSTRAP_SCRIPT}
    </Script>
  );
}
