/*
 * StoryBlockingScript — the /story "story personalisation bootstrap".
 *
 * Previously this emitted a synchronous inline <script> into the document <head>
 * that ran a ~3.5s busy-loop before the browser could paint. That single long
 * task blocked First/Largest Contentful Paint and left the main thread unable to
 * respond to input (the dominant INP "Input Delay" bottleneck) for its entire
 * duration.
 *
 * It now runs through next/script with strategy="afterInteractive", so it no
 * longer sits in the critical render path, and the work is sliced into small
 * chunks that yield back to the main thread between each slice. The one long
 * task becomes many short ones: the page can paint immediately and stay
 * responsive to input while the bootstrap runs cooperatively in the background.
 */

import Script from "next/script";

const STORY_BOOTSTRAP_SCRIPT = `
  (function () {
    // Simulated story personalisation bootstrap. Run the work in small time
    // slices, yielding to the main thread between each slice so neither paint nor
    // input is ever blocked by one long task.
    var TOTAL_MS = 3500; // total simulated work budget
    var SLICE_MS = 8;    // do at most ~8ms of work before handing control back
    var sink = 0;
    var done = 0;

    function yieldToMain() {
      // Prefer scheduler.yield() where available; otherwise break the task with
      // a macrotask so the browser can paint and process input in between.
      if (window.scheduler && typeof window.scheduler.yield === "function") {
        return window.scheduler.yield();
      }
      return new Promise(function (resolve) { setTimeout(resolve, 0); });
    }

    async function runBootstrap() {
      while (done < TOTAL_MS) {
        var start = Date.now();
        while (Date.now() - start < SLICE_MS) {
          sink += Math.sqrt(sink + 1);
        }
        done += Date.now() - start;
        await yieldToMain();
      }
      window.__npStoryReady = sink > 0;
    }

    runBootstrap();
  })();
`;

export default function StoryBlockingScript() {
  return (
    <Script id="story-personalisation-bootstrap" strategy="afterInteractive">
      {STORY_BOOTSTRAP_SCRIPT}
    </Script>
  );
}
