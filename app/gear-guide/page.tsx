import GearGuide from "@/components/GearGuide";

export const metadata = {
  title: "Gear Guide — NorthPeak Outdoors",
  description: "Browse our gear by category and weight.",
};

/*
 * Gear Guide page — dominant problem: Bundle / TBT.
 *
 * The single intentional issue here is that the full lodash library is imported
 * and used on the client where tiny native alternatives would do (see GearGuide),
 * inflating the client bundle and raising Total Blocking Time.
 */
export default function GearGuidePage() {
  return (
    <main>
      <section className="section">
        <h2>Gear guide</h2>
        <p className="lead" style={{ marginBottom: "2rem" }}>
          Everything in the catalogue, grouped by category and sorted by weight.
          Search to narrow it down to what you&apos;re packing for this trip.
        </p>
        <GearGuide />
      </section>
    </main>
  );
}
