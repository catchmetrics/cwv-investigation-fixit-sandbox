"use client";

import { useState } from "react";
// CWV-ISSUE[TBT]: The entire lodash library is imported with a default import
// (`import _ from "lodash"`) and bundled into the client. lodash is a large
// dependency (~70 KB min+gzip for the whole thing) and only `_.deburr`,
// `_.sortBy`, and `_.take` are used here — all of which have small native
// equivalents. Shipping all of lodash inflates the client JS bundle and adds
// parse/compile cost, raising Total Blocking Time.
// CWV-FIX: drop lodash in favour of native JS (String.normalize, Array.sort,
// Array.slice), or import only the specific functions (e.g.
// `import sortBy from "lodash/sortBy"`) / use a dynamic import so it is not in
// the critical bundle.
import _ from "lodash";

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
 * SlowFilterList — a search box over 20,000 trails.
 *
 * CWV-ISSUE[INP]: The filter recomputes synchronously on EVERY keystroke. There
 * is no debounce, no useMemo, and no virtualization, so each character typed
 * scans and sorts all 20,000 items (via lodash) and re-renders the whole result
 * list on the main thread. This produces a Long Animation Frame per keystroke
 * and a poor Interaction to Next Paint while typing.
 * CWV-FIX: debounce the input (e.g. 200ms), memoize the filtered/sorted result
 * with useMemo keyed on the debounced query, cap/virtualize the rendered rows,
 * and avoid re-sorting the full dataset on every keystroke.
 */
export default function SlowFilterList() {
  const [query, setQuery] = useState("");

  // Recomputed on every render (every keystroke), no memoization.
  const normalizedQuery = _.deburr(query.trim().toLowerCase());
  const matches = TRAILS.filter((t) =>
    _.deburr(t.name.toLowerCase()).includes(normalizedQuery)
  );
  const sorted = _.sortBy(matches, ["distanceKm", "name"]);
  const visible = _.take(sorted, 100);

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
