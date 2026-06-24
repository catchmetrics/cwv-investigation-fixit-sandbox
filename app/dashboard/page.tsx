import HeavyButton from "@/components/HeavyButton";
import SlowFilterList from "@/components/SlowFilterList";

export const metadata = {
  title: "Trip Planner — NorthPeak Outdoors",
  description: "Plan a route, estimate difficulty, and search our trail catalogue.",
};

/*
 * Trip Planner (dashboard) page.
 *  - HeavyButton    -> CWV-ISSUE[INP] (long synchronous task on click)
 *  - SlowFilterList -> CWV-ISSUE[INP] (synchronous filter on every keystroke)
 *                      + CWV-ISSUE[TBT] (full lodash bundled into the client)
 */
export default function DashboardPage() {
  return (
    <main>
      <section className="section">
        <h2>Trip planner</h2>
        <p className="lead" style={{ marginBottom: "2rem" }}>
          Score a route&apos;s difficulty and find trails that match your plans
          for the season.
        </p>
        <HeavyButton />
        <SlowFilterList />
      </section>
    </main>
  );
}
