import GalleryGrid from "@/components/GalleryGrid";

export const metadata = {
  title: "Gallery — NorthPeak Outdoors",
  description: "Photos from the field: routes, base camps, and summits.",
};

/*
 * Gallery page.
 *  - GalleryGrid -> CWV-ISSUE[CLS][LCP] (dimensionless, unoptimized <img> set)
 */
export default function GalleryPage() {
  return (
    <main>
      <section className="section">
        <h2>From the trail</h2>
        <p className="lead" style={{ marginBottom: "2rem" }}>
          A few frames from recent NorthPeak trips. Shot on real expeditions, not
          in a studio.
        </p>
        <GalleryGrid />
      </section>
    </main>
  );
}
