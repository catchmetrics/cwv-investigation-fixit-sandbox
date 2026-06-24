import GalleryGrid from "@/components/GalleryGrid";

export const metadata = {
  title: "Lookbook — NorthPeak Outdoors",
  description: "Photos from the field: routes, base camps, and summits.",
};

/*
 * Lookbook page — dominant problem: CLS.
 *
 * The single intentional issue here is the gallery of dimensionless, eagerly
 * loaded plain <img> elements (see GalleryGrid), which reserve no space and shove
 * the layout around as each heavy photo arrives.
 */
export default function LookbookPage() {
  return (
    <main>
      <section className="section">
        <h2>Lookbook</h2>
        <p className="lead" style={{ marginBottom: "2rem" }}>
          A few frames from recent NorthPeak trips. Shot on real expeditions, not
          in a studio — base camps, approach trails, and the summits that made
          the early starts worth it.
        </p>
        <GalleryGrid />
      </section>
    </main>
  );
}
