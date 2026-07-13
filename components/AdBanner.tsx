"use client";

import { useEffect, useState } from "react";

/*
 * AdBanner — a promotional announcement bar.
 *
 * CWV-ISSUE[CLS]: The banner is NOT rendered on the server. Instead it mounts
 * empty and then, inside useEffect (after hydration + a simulated network
 * delay), it flips to visible and inserts a tall block of content at the TOP of
 * the page with NO reserved space. Everything below it (including the hero) gets
 * pushed down after the user can already see the page, producing a large
 * Cumulative Layout Shift.
 * CWV-FIX: render the banner server-side so it is present in the initial HTML,
 * OR reserve its height up front (min-height / a skeleton placeholder) so that
 * revealing it does not move surrounding content. If it must be client-only,
 * give the container a fixed height before the content arrives.
 */
export default function AdBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Simulate an ad/announcement fetched after mount, then injected into the
    // space already reserved for it.
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Reserve the banner's height up front so revealing the content does not push
  // the surrounding page down: the container occupies the same space whether or
  // not the announcement has arrived yet.
  return (
    <div
      style={{
        background: visible ? "var(--accent)" : "transparent",
        color: "#fff",
        padding: "1.5rem",
        fontFamily: "Arial, Helvetica, sans-serif",
        textAlign: "center",
        minHeight: "90px",
      }}
    >
      {visible ? (
        <>
          <strong>Spring Restock Event —</strong> free shipping on orders over $120,
          plus an extra 15% off all hardshell jackets through Sunday. Use code{" "}
          <span className="pill">PEAK15</span> at checkout.
        </>
      ) : null}
    </div>
  );
}
