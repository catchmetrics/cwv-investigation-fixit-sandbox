import ReviewsList from "@/components/ReviewsList";

export const metadata = {
  title: "Reviews — NorthPeak Outdoors",
  description: "What customers say after seasons of hard use.",
};

/*
 * Reviews page — dominant problem: Bundle (needless client component).
 *
 * The single intentional issue here is that ReviewsList — a purely static,
 * presentational list — is marked "use client" for no reason, shipping and
 * hydrating JS it does not need.
 */
export default function ReviewsPage() {
  return (
    <main>
      <section className="section">
        <h2>Reviews</h2>
        <p className="lead" style={{ marginBottom: "2rem" }}>
          We don&apos;t pay for reviews and we don&apos;t hide the critical ones.
          Here&apos;s what customers say after seasons of real use.
        </p>
        <ReviewsList />
      </section>
    </main>
  );
}
