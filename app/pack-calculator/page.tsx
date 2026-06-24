import PackCalculator from "@/components/PackCalculator";

export const metadata = {
  title: "Pack Calculator — NorthPeak Outdoors",
  description: "Estimate a recommended base weight for your pack.",
};

/*
 * Pack Calculator page — dominant problem: INP / LoAF.
 *
 * The single intentional issue here is the button whose onClick runs a
 * ~300,000,000-iteration synchronous computation that blocks the main thread
 * (see PackCalculator).
 */
export default function PackCalculatorPage() {
  return (
    <main>
      <section className="section">
        <h2>Pack calculator</h2>
        <p className="lead" style={{ marginBottom: "2rem" }}>
          Tell us about your trip and we&apos;ll estimate a sensible base weight
          to aim for when you load your pack.
        </p>
        <PackCalculator />
      </section>
    </main>
  );
}
