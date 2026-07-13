/*
 * JournalBlockingFont — loads a remote web font for the /journal page badly.
 *
 * This Server Component emits a remote font <link rel="stylesheet"> plus a scoped
 * <style> that applies the font to the journal content. Next.js hoists the <link>
 * into <head>. The font is loaded only on this route, not in the shared layout.
 */

/*
 * CWV-ISSUE[LCP][CLS]: The remote web-font stylesheet is loaded with a plain
 * <link rel="stylesheet"> with NO <link rel="preconnect"> to the font host (so the
 * browser pays a fresh DNS + TLS round-trip in the critical path, hurting LCP) and
 * the font CSS is requested WITHOUT &display=swap (so text is blocked from painting
 * — FOIT — until the font downloads, hurting LCP, and then reflows the page when it
 * swaps in, hurting CLS). It lives ONLY on /journal, so this is the only page that
 * pays for it.
 * CWV-FIX: add <link rel="preconnect" href="https://fonts.googleapis.com"> and
 * <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>, append
 * &display=swap to the font URL, or (best) replace this with next/font which
 * self-hosts the font and removes the extra round-trips and the swap shift.
 */
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&display=swap";

const JOURNAL_FONT_CSS = `
  .journal-content {
    font-family: "Source Serif Pro", Georgia, "Times New Roman", serif;
  }
`;

export default function JournalBlockingFont() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONT_HREF} />
      <style dangerouslySetInnerHTML={{ __html: JOURNAL_FONT_CSS }} />
    </>
  );
}
