"use client";

import { useState } from "react";

// Build a large in-memory catalogue once at module load.
const TRAILS = Array.from({ length: 20_000 }, (_unused, i) => {
  const regions = [
    "Cascades",
    "Sierra",
    "Rockies",
    "Dolomites",
    "Andes",
    "Pyrenees",
    "Alps",
    "Tetons",
  ];
  const region = regions[i % regions.length];
  return {
    id: i,
    name: `${region} Route ${i}`,
    region,
    distanceKm: Math.round((3 + (i % 40)) * 10) / 10,
  };
});

/*
 * TrailFinder — a search box over 20,000 trails.
 *
 * CWV-ISSUE[INP]: The filter recomputes synchronously on EVERY keystroke. There
 * is no debounce, no useMemo, and no virtualization, so each character typed
 * normalizes, scans, and sorts all 20,000 items with plain native JS and
 * re-renders the whole result list on the main thread. This produces a Long
 * Animation Frame per keystroke and a poor Interaction to Next Paint while
 * typing. (Deliberately native JS only — no lodash — so this page's single
 * problem is purely the un-debounced/un-memoized work, not bundle size.)
 * CWV-FIX: debounce the input (e.g. 200ms), memoize the filtered/sorted result
 * with useMemo keyed on the debounced query, cap/virtualize the rendered rows,
 * and avoid re-sorting the full dataset on every keystroke.
 */
// Strip diacritics with native JS (the lodash-free equivalent of _.deburr).
const COMBINING_MARKS = /[̀-ͯ]/g;
function deburr(value: string): string {
  return value.normalize("NFD").replace(COMBINING_MARKS, "");
}

export default function TrailFinder() {
  const [query, setQuery] = useState("");

  // Recomputed on every render (every keystroke), no memoization, native JS.
  const normalizedQuery = deburr(query.trim().toLowerCase());
  const matches = TRAILS.filter((t) =>
    deburr(t.name.toLowerCase()).includes(normalizedQuery)
  );
  const sorted = [...matches].sort(
    (a, b) => a.distanceKm - b.distanceKm || a.name.localeCompare(b.name)
  );
  const visible = sorted.slice(0, 100);

  return (
    <div className="card">
      <h3>Find a trail</h3>
      <div className="dashboard-toolbar">
        <input
          className="input"
          style={{ maxWidth: 360 }}
          placeholder="Search 20,000 trails…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="muted">{matches.length.toLocaleString()} matches</span>
      </div>
      <ul className="result-list">
        {visible.map((t) => (
          <li key={t.id}>
            <span>{t.name}</span>
            <span className="muted">{t.distanceKm} km</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
