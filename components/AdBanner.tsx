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
    // Simulate an ad/announcement fetched after mount, then injected with no
    // space reserved for it.
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) {
    // No reserved space: returns null until the content pops in and shoves the
    // page down.
    return null;
  }

  return (
    <div
      style={{
        background: "var(--accent)",
        color: "#fff",
        padding: "1.5rem",
        fontFamily: "Arial, Helvetica, sans-serif",
        textAlign: "center",
      }}
    >
      <strong>Spring Restock Event —</strong> free shipping on orders over $120,
      plus an extra 15% off all hardshell jackets through Sunday. Use code{" "}
      <span className="pill">PEAK15</span> at checkout.
    </div>
  );
}
