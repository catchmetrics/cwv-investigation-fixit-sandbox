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
 * TrailFinder — a search box over 150,000 trails.
 *
 * The filter used to recompute synchronously on EVERY keystroke — with no
 * debounce and no memoization — so each character typed normalized, scanned, and
 * sorted all 150,000 items on the main thread, producing a Long Animation Frame
 * per keystroke and a poor Interaction to Next Paint (Input Delay) while typing.
 *
 * Fix: the input value updates state immediately (so typing stays responsive),
 * but the expensive filter/sort is driven by a debounced query (200ms) and wrapped
 * in useMemo so it only runs once the user pauses — not on every keystroke or
 * unrelated re-render. The rendered rows are still capped at 100.
 */
// Strip diacritics with native JS (the lodash-free equivalent of _.deburr).
const COMBINING_MARKS = /[̀-ͯ]/g;
function deburr(value: string): string {
  return value.normalize("NFD").replace(COMBINING_MARKS, "");
}

export default function TrailFinder() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce: only adopt the latest query 200ms after the user stops typing, so
  // the heavy filter/sort runs once per pause instead of once per keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(t);
  }, [query]);

  // Memoize the expensive filter + sort so it only recomputes when the debounced
  // query changes, never on unrelated re-renders.
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
