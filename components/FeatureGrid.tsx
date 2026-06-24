/*
 * FeatureGrid — a heavy "use client" component that should be a Server Component.
 *
 * CWV-ISSUE[TBT]: This component is marked "use client" even though it renders
 * purely static marketing content — no state, no effects, no event handlers, no
 * browser APIs. Marking it as a Client Component forces React to ship its code
 * to the browser and hydrate it, inflating the client JS bundle and adding
 * needless hydration work (Total Blocking Time) for zero interactivity benefit.
 * CWV-FIX: remove the "use client" directive so this renders entirely on the
 * server and ships no JavaScript to the client.
 */
"use client";

const FEATURES = [
  {
    title: "Field-tested durability",
    body: "Every pack and shell is abused on real expeditions before it ships. If it fails on the mountain, it never reaches the store.",
  },
  {
    title: "Repair, don't replace",
    body: "Lifetime repairs on all hardgoods. Send it back, we fix it, you keep climbing. Less waste, more summits.",
  },
  {
    title: "Carbon-aware logistics",
    body: "Consolidated shipping and recycled packaging across the whole catalogue. Adventure shouldn't cost the planet.",
  },
  {
    title: "Built by alpinists",
    body: "Our design team has summited on six continents. The gear reflects decades of hard-won mistakes.",
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid">
      {FEATURES.map((f) => (
        <div className="card" key={f.title}>
          <h3>{f.title}</h3>
          <p className="muted">{f.body}</p>
        </div>
      ))}
    </div>
  );
}
