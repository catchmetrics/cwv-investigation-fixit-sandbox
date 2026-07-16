import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NorthPeak Outdoors — Gear for the high places",
  description:
    "NorthPeak Outdoors designs and sells backcountry gear for hikers, climbers, and alpinists.",
};

/*
 * Root layout.
 *
 * This shared shell is intentionally CLEAN — it contains no intentional Core Web
 * Vitals problems. Every page-level problem lives on exactly one route so that a
 * page-level investigation maps 1:1 to a single fix. (Previously this layout
 * carried a global blocking head script and a global blocking web font; those now
 * live only on /story and /journal respectively.)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* CatchMetrics RUM — loads as early as possible to capture LCP/TTFB.
            Reports to the staging platform; tagKey identifies this domain. */}
        <Script id="catchmetrics-rum" strategy="beforeInteractive">
          {`(function () {
    var apiKey = "Ip5mUwAgiPEZVv5ScqiiGMb5PxPwSkX6hjFF17akkngK9NSj5XsDcNlSLFyOBnhJ2R2x0DtNb49rc2We1i/OQpCkCXu4LLgCnDa7WcDMODFMxLO2DoMeEEJgJ/IiTSV43RfhK7lCNnzL3E+jZQoUEg/aKsAU4Sh2GduXeDPsQvkORVEiAruNgNT9S9oalU/e";
    var options = { debug: false, privacyMode: false, spaMode: false, errorTracking: false };
    var tag = document.createElement('script');
    tag.src = "https://platform-staging.catchmetrics.io/tag/rumdata.js";
    tag.async = true;
    tag.crossOrigin = "anonymous";
    tag.onload = function () {
      if (window.catchMetrics && window.catchMetrics.init) {
        window.catchMetrics.init(apiKey, options);
      }
    };
    document.head.appendChild(tag);
  })();`}
        </Script>
        <header className="site-header">
          <span className="brand">▲ NorthPeak Outdoors</span>
          <nav className="site-nav">
            <Link href="/">Home</Link>
            <Link href="/lookbook">Lookbook</Link>
            <Link href="/deals">Deals</Link>
            <Link href="/trail-finder">Trail Finder</Link>
            <Link href="/pack-calculator">Pack Calculator</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/gear-guide">Gear Guide</Link>
            <Link href="/story">Story</Link>
            <Link href="/journal">Journal</Link>
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
