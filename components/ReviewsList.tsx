/*
 * ReviewsList — a static list of customer reviews.
 *
 * CWV-ISSUE[Bundle]: This component is marked "use client" even though it renders
 * purely static presentational content — no state, no effects, no event handlers,
 * no browser APIs. Marking it as a Client Component forces React to ship its code
 * to the browser and hydrate it, inflating the client JS bundle and adding
 * needless hydration work (Total Blocking Time) for zero interactivity benefit.
 * CWV-FIX: remove the "use client" directive so this renders entirely on the
 * server and ships no JavaScript to the client.
 */
"use client";

const REVIEWS = [
  {
    author: "Mara K.",
    location: "Canmore, AB",
    title: "Five seasons and still going",
    body: "My Aurora hardshell has been through five winters of ski touring and three resoles' worth of approaches. NorthPeak repaired a zipper for free last spring. This is how gear should work.",
  },
  {
    author: "Devin R.",
    location: "Bishop, CA",
    title: "The pack that finally fits",
    body: "I've owned six 50-litre packs. The Summit 55 is the first that carries a heavy load without wrecking my shoulders on a long approach. Worth every dollar.",
  },
  {
    author: "Priya S.",
    location: "Chamonix, FR",
    title: "Held up to alpine abuse",
    body: "Dragged this kit across the Vallée Blanche and up a couple of routes above the Midi. Zero failures, and the repair guarantee means I'm not precious about using it hard.",
  },
  {
    author: "Tomas L.",
    location: "Tromsø, NO",
    title: "Warm, light, repairable",
    body: "The midlayer is the warmth-to-weight benchmark I judge everything else by now. When a cuff frayed, they fixed it and sent it back in under two weeks.",
  },
];

export default function ReviewsList() {
  return (
    <div className="grid">
      {REVIEWS.map((r) => (
        <article className="card" key={r.author}>
          <h3>{r.title}</h3>
          <p className="muted">{r.body}</p>
          <p className="muted" style={{ marginTop: "0.75rem" }}>
            — {r.author}, {r.location}
          </p>
        </article>
      ))}
    </div>
  );
}
