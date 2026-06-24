import TrailFinder from "@/components/TrailFinder";

export const metadata = {
  title: "Trail Finder — NorthPeak Outdoors",
  description: "Search our catalogue of 20,000 trails by name and distance.",
};

/*
 * Trail Finder page — dominant problem: INP.
 *
 * The single intentional issue here is the un-debounced, un-memoized filter over
 * a 20,000-item in-memory list that recomputes and re-renders on every keystroke
 * (see TrailFinder).
 */
export default function TrailFinderPage() {
  return (
    <main>
      <section className="section">
        <h2>Trail finder</h2>
        <p className="lead" style={{ marginBottom: "2rem" }}>
          Search our catalogue of routes by name and find trails that match your
          plans for the season.
        </p>
        <TrailFinder />
      </section>
    </main>
  );
}
