/*
 * HomeHeadlineFont — loads the homepage display font badly.
 *
 * Server Component that emits a remote font <link rel="stylesheet"> plus a scoped
 * <style> that applies the display font to the homepage hero headline. Next.js
 * hoists the <link> into <head>.
 */

/*
 * CWV-ISSUE[LCP]: The homepage headline font is loaded with a plain
 * <link rel="stylesheet"> with NO <link rel="preconnect"> to the font host — so the
 * browser pays a fresh DNS + TLS round-trip in the critical path — and the font CSS
 * is requested WITHOUT &display=swap, so the hero headline text is blocked from
 * painting (FOIT) until the font downloads. Both delay Largest Contentful Paint on
 * the home page (the headline is above the fold), and the later swap reflows the
 * headline (CLS).
 * CWV-FIX: add <link rel="preconnect" href="https://fonts.googleapis.com"> and
 * <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>, append
 * &display=swap to the font URL, or (best) replace this with next/font which
 * self-hosts the font and removes the extra round-trips and the swap shift.
 */
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700";

const HOME_FONT_CSS = `
  .hero-caption h1 {
    font-family: "Source Serif Pro", Georgia, "Times New Roman", serif;
  }
`;

export default function HomeHeadlineFont() {
  return (
    <>
      <link rel="stylesheet" href={FONT_HREF} />
      <style dangerouslySetInnerHTML={{ __html: HOME_FONT_CSS }} />
    </>
  );
}
