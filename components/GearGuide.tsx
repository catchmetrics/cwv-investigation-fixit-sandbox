"use client";

import { useState } from "react";
// Import only the specific lodash functions used here, via per-method submodule
// paths, instead of a default `import _ from "lodash"`. A default import pulls
// the entire lodash library (~70 KB min+gzip) into the client bundle and adds
// parse/compile/execution cost on the main thread (Total Blocking Time). These
// submodule imports bundle only the handful of functions actually used —
// `deburr`, `sortBy`, `groupBy`, `startCase`, and `take` — shrinking the shared
// client chunk while keeping identical runtime behaviour.
import deburr from "lodash/deburr";
import sortBy from "lodash/sortBy";
import groupBy from "lodash/groupBy";
import startCase from "lodash/startCase";
import take from "lodash/take";

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
 * The lodash helpers are genuinely used at runtime to normalise the query,
 * sort by weight, group by category, and title-case names. Importing them by
 * submodule keeps that behaviour while avoiding shipping all of lodash.
 */
export default function GearGuide() {
  const [query, setQuery] = useState("");

  const normalizedQuery = deburr(query.trim().toLowerCase());

  const matches = GEAR.filter((g) =>
    deburr(g.name.toLowerCase()).includes(normalizedQuery)
  );

  // Sorted lightest-first, then grouped by category — all via lodash.
  const sorted = sortBy(matches, ["weightG", "name"]);
  const grouped = groupBy(sorted, "category");
  const categories = take(Object.keys(grouped).sort(), 12);

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
        <span className="muted">{matches.length} items</span>
      </div>

      {categories.map((category) => (
        <div key={category} style={{ marginTop: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem" }}>{startCase(category)}</h3>
          <ul className="result-list">
            {grouped[category].map((g) => (
              <li key={g.name}>
                <span>{startCase(g.name)}</span>
                <span className="muted">{g.weightG} g</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
