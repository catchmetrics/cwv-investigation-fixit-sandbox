"use client";

import { useEffect, useMemo, useState } from "react";

// Build a large in-memory catalogue once at module load.
const TRAILS = Array.from({ length: 150_000 }, (_unused, i) => {
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
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the input so the expensive filter/sort runs only after typing
  // pauses (200ms), instead of synchronously on every keystroke.
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(id);
  }, [query]);

  // Memoize the filtered/sorted result, keyed on the debounced query, so the
  // full dataset is not re-scanned and re-sorted on every render.
  const sorted = useMemo(() => {
    const normalizedQuery = deburr(debouncedQuery.trim().toLowerCase());
    const matches = TRAILS.filter((t) =>
      deburr(t.name.toLowerCase()).includes(normalizedQuery)
    );
    return [...matches].sort(
      (a, b) => a.distanceKm - b.distanceKm || a.name.localeCompare(b.name)
    );
  }, [debouncedQuery]);
  const visible = sorted.slice(0, 100);

  return (
    <div className="card">
      <h3>Find a trail</h3>
      <div className="dashboard-toolbar">
        <input
          className="input"
          style={{ maxWidth: 360 }}
          placeholder="Search 150,000 trails…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="muted">{sorted.length.toLocaleString()} matches</span>
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
