import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NorthPeak Outdoors — Gear for the high places",
  description:
    "NorthPeak Outdoors designs and sells backcountry gear for hikers, climbers, and alpinists.",
};

/*
 * Render-blocking inline script injected into <head>.
 *
 * CWV-ISSUE[LCP]: This synchronous inline <script> in the document head runs a
 * pointless busy-loop on the main thread before the browser can paint anything,
 * directly delaying First Contentful Paint and Largest Contentful Paint. It is a
 * classic render-blocking script in the critical path.
 * CWV-FIX: remove the busy-work entirely, or move this to next/script with
 * strategy="afterInteractive"/"lazyOnload" (or defer/async on a plain <script>)
 * so it no longer blocks the initial render.
 */
const BLOCKING_HEAD_SCRIPT = `
  (function () {
    // Simulated "analytics bootstrap" that needlessly blocks rendering.
    var start = Date.now();
    var sink = 0;
    while (Date.now() - start < 250) {
      sink += Math.sqrt(sink + 1);
    }
    window.__npAnalyticsReady = sink > 0;
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* CWV-ISSUE[LCP][CLS]: Remote web-font stylesheet loaded with a plain
            <link rel="stylesheet">. There is NO <link rel="preconnect"> to the
            font host, so the browser pays a fresh DNS + TLS round-trip in the
            critical path, and the font CSS is requested WITHOUT &display=swap, so
            text is blocked from painting (FOIT) until the font downloads — hurting
            LCP — and then reflows the page when it swaps in — hurting CLS.
            CWV-FIX: add <link rel="preconnect" href="https://fonts.gstatic.com"
            crossOrigin> + the fonts.googleapis.com preconnect, append
            &display=swap to the font URL, or (best) replace this with next/font
            which self-hosts the font and removes the extra round-trips. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700"
        />

        <script dangerouslySetInnerHTML={{ __html: BLOCKING_HEAD_SCRIPT }} />
      </head>
      <body>
        <header className="site-header">
          <span className="brand">▲ NorthPeak Outdoors</span>
          <nav className="site-nav">
            <Link href="/">Home</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/dashboard">Trip Planner</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} NorthPeak Outdoors. Built for the high places.</p>
          <p className="muted">Hand-stitched in Boulder, Colorado.</p>
        </footer>
      </body>
    </html>
  );
}
