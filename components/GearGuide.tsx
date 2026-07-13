"use client";

import { useState, useDeferredValue, useMemo } from "react";
// CWV-ISSUE[Bundle][TBT]: The entire lodash library is imported with a default
// import (`import _ from "lodash"`) and bundled into the client. lodash is a
// large dependency (~70 KB min+gzip for the whole thing) and only a handful of
// functions are used here — `_.deburr`, `_.sortBy`, `_.groupBy`, `_.startCase`,
// and `_.take` — all of which have small native equivalents. Shipping all of
// lodash inflates the client JS bundle and adds parse/compile cost, raising
// Total Blocking Time.
// CWV-FIX: drop lodash in favour of native JS (String.normalize, Array.sort,
// Object grouping with reduce, Array.slice), or import only the specific
// functions (e.g. `import sortBy from "lodash/sortBy"`) / use a dynamic import so
// the whole library is not in the critical bundle.
import _ from "lodash";

type GearItem = {
  name: string;
  category: string;
  weightG: number;
};

// A small backcountry gear catalogue with intentionally messy casing/accents so
// the lodash normalisation/formatting functions have something to do.
const GEAR: GearItem[] = [
  { name: "aurora hardshell", category: "shell", weightG: 410 },
  { name: "summit 55 pack", category: "pack", weightG: 1650 },
  { name: "tête-de-cuvée down jacket", category: "insulation", weightG: 360 },
  { name: "ridgeline trekking poles", category: "hardware", weightG: 480 },
  { name: "alpenglow headlamp", category: "hardware", weightG: 92 },
  { name: "crête merino baselayer", category: "baselayer", weightG: 180 },
  { name: "glacier softshell", category: "shell", weightG: 520 },
  { name: "basecamp down quilt", category: "insulation", weightG: 740 },
  { name: "approach merino socks", category: "baselayer", weightG: 70 },
  { name: "summit rain cover", category: "pack", weightG: 120 },
];

/*
 * GearGuide — a filterable, grouped gear catalogue.
 *
 * The whole of lodash is genuinely used at runtime to normalise the query,
 * sort by weight, group by category, and title-case names. This keeps the
 * dependency real (and lint clean) while demonstrating the bundle-size problem.
 */
export default function GearGuide() {
  const [query, setQuery] = useState("");

  // CWV-FIX[INP]: keep the input update urgent (the controlled value below stays
  // bound to `query` so typing is instant) but defer the expensive filter/sort/
  // group/format pipeline. `useDeferredValue` lets React render the keystroke
  // first — the memo returns the cached result for the previous deferred query,
  // so the urgent render is cheap — then recompute the heavy list in a
  // low-priority background pass. This takes the per-keystroke lodash processing
  // off the interaction's critical path, cutting INP.
  const deferredQuery = useDeferredValue(query);

  const { categories, grouped, matchCount } = useMemo(() => {
    const normalizedQuery = _.deburr(deferredQuery.trim().toLowerCase());

    const matches = GEAR.filter((g) =>
      _.deburr(g.name.toLowerCase()).includes(normalizedQuery)
    );

    // Sorted lightest-first, then grouped by category — all via lodash.
    const sorted = _.sortBy(matches, ["weightG", "name"]);
    const grouped = _.groupBy(sorted, "category");
    const categories = _.take(Object.keys(grouped).sort(), 12);

    return { categories, grouped, matchCount: matches.length };
  }, [deferredQuery]);

  return (
    <div className="card">
      <h3>Browse the gear guide</h3>
      <div className="dashboard-toolbar">
        <input
          className="input"
          style={{ maxWidth: 360 }}
          placeholder="Search gear…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="muted">{matchCount} items</span>
      </div>

      {categories.map((category) => (
        <div key={category} style={{ marginTop: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem" }}>{_.startCase(category)}</h3>
          <ul className="result-list">
            {grouped[category].map((g) => (
              <li key={g.name}>
                <span>{_.startCase(g.name)}</span>
                <span className="muted">{g.weightG} g</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
