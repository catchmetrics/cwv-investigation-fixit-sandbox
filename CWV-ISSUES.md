# CWV-ISSUES — Answer Key

This repository is the **test target** for the Investigation → "Fix It" automation
(**ADP-1762**). It is a small, believable marketing/e-commerce site for a fictional
brand ("NorthPeak Outdoors") that has been **deliberately seeded with Core Web Vitals
(CWV) performance anti-patterns**.

The repository is structured so that **each CWV problem lives on its own page** —
**exactly one dominant, clearly-attributable problem per URL**. This is the whole
point: a **page-level investigation** analyzes one live URL, identifies its single
problem, and an automated **"Fix It"** pass corrects that specific page's issue. The
1:1 mapping (page → problem → fix) is what makes grading deterministic.

The shared layout/nav (`app/layout.tsx`) and the `/about` page are **intentionally
clean** — they carry no CWV problem, so every other page is "guilty" only of its own
single issue. The previously-global problems (a blocking head script and a blocking
remote font) now live **only** on `/story` and `/journal` respectively.

The problems are **runtime performance issues only**. The project intentionally
**builds and lints cleanly** (`npm run build` and `npm run lint` are both green), so
CI on `main` stays green. A "fix" is expected to improve performance, **not** repair a
broken build.

Every issue is annotated inline in the source with paired comments:

- `// CWV-ISSUE[METRIC]: <what & why it's bad>`
- `// CWV-FIX: <the intended fix>`

## A note on ESLint

The intentional use of plain `<img>` instead of `next/image` is the whole point of the
LCP/CLS image issues, so the `@next/next/no-img-element` rule is **deliberately
disabled at each `<img>` site** via inline `// eslint-disable-next-line
@next/next/no-img-element` comments. This keeps `npm run lint` green without removing
the perf problem. The `/journal` blocking-font and `/story` blocking-script issues may
surface non-fatal `@next/next` informational warnings — those are left in place (lint
still exits 0) and they *document* the issue; they must not be "fixed" by deleting the
font/script, only by loading/scheduling them correctly.

## Issue catalogue (one row per page — exactly one problem each)

| Page (URL) | Metric | Component / file | What's wrong | Intended fix |
|------------|--------|------------------|--------------|--------------|
| `/` (home) | LCP | `components/HeroImage.tsx` | The LCP element is a ~5 MB, 2400×1400 unoptimized JPEG rendered with a plain `<img src="/hero.jpg">` — no `next/image`, no responsive `srcset`, no modern format, no `width`/`height`, and not `priority`/preloaded — so it is discovered late and downloads slowly. | Use `next/image` with `priority` + `sizes` (or add `<link rel="preload" as="image">` + explicit dimensions + `fetchpriority="high"`), and serve a properly compressed, correctly sized asset. |
| `/lookbook` | CLS | `components/GalleryGrid.tsx` | Six ~3.4 MB full-resolution gallery images rendered as plain `<img>` with **no `width`/`height`** (and no `aspect-ratio`), eagerly loaded, so each one shifts the grid as it arrives. | Use `next/image` with explicit `width`/`height` (or `fill` + a sized container), reserve space via dimensions/`aspect-ratio`, add `loading="lazy"`, and serve optimized assets. |
| `/deals` | CLS | `components/AdBanner.tsx` | A promo banner mounts empty and, inside `useEffect` (after a delay), reveals a tall block at the **top of the page with no reserved space**, pushing the content below it down. | Render server-side so it's in the initial HTML, or reserve its height (`min-height`/skeleton) up front so revealing it does not move content. |
| `/trail-finder` | INP | `components/TrailFinder.tsx` | A search box over a 20,000-item in-memory list re-filters and re-sorts **synchronously on every keystroke** with no debounce, no `useMemo`, and no virtualization (native JS only — no lodash here), producing a Long Animation Frame per keystroke. | Debounce the input, memoize the filtered/sorted result with `useMemo` keyed on the debounced query, and cap/virtualize the rendered rows. |
| `/pack-calculator` | INP / LoAF | `components/PackCalculator.tsx` | The `onClick` runs a ~300,000,000-iteration synchronous loop on the main thread, producing a multi-hundred-ms Long Animation Frame and terrible INP for that interaction. | Chunk the work across frames (`setTimeout`/`requestIdleCallback`/`scheduler.yield`), offload to a Web Worker, or precompute/memoize so the handler returns quickly. |
| `/reviews` | Bundle | `components/ReviewsList.tsx` | A purely static, presentational reviews list is marked `"use client"` for no reason (no state/effects/handlers), so its JS is shipped and hydrated needlessly, raising Total Blocking Time. | Remove the `"use client"` directive so it renders entirely on the server and ships no JS. |
| `/gear-guide` | Bundle / TBT | `components/GearGuide.tsx` | The **entire `lodash`** library is imported with `import _ from "lodash"` and genuinely used on the client (`deburr`/`sortBy`/`groupBy`/`startCase`/`take`), all of which have small native equivalents. Shipping all of lodash inflates the client bundle. | Drop lodash for native JS (`String.normalize`, `Array.sort`, `reduce`-based grouping, `Array.slice`), or import only the needed functions (`lodash/sortBy`) / dynamically import it. |
| `/story` | LCP | `components/StoryBlockingScript.tsx` | A synchronous inline `<script>` hoisted into `<head>` runs a ~250 ms main-thread busy-loop before the browser can paint, delaying FCP/LCP. Scoped to this route only. | Remove the busy work, or move it to `next/script` with `afterInteractive`/`lazyOnload` (or `defer`/`async`) so it no longer blocks render. |
| `/journal` | LCP + CLS | `components/JournalBlockingFont.tsx` | A remote Google Font is loaded via a plain `<link rel="stylesheet">` with **no `preconnect`** (extra DNS+TLS round-trip in the critical path → LCP) and **no `&display=swap`** (FOIT blocks text paint → LCP; later swap reflows text → CLS). Scoped to this route only. | Add `preconnect` to `fonts.googleapis.com` + `fonts.gstatic.com`, append `&display=swap`, or (best) replace with `next/font` (self-hosted, size-adjusted) to remove the round-trips and the swap shift. |
| `/about` | — (clean control) | `app/about/page.tsx` | Nothing — intentionally clean baseline for comparison. | N/A. |

## Per-metric summary

| Metric | Pages |
|--------|-------|
| LCP | `/` (hero `<img>`), `/story` (blocking head script), `/journal` (blocking font) |
| CLS | `/lookbook` (dimensionless images), `/deals` (client-injected banner), `/journal` (font swap reflow) |
| INP / LoAF | `/trail-finder` (synchronous keystroke filter), `/pack-calculator` (long-task button) |
| Bundle / TBT | `/gear-guide` (full lodash on the client), `/reviews` (needless `"use client"`) |

**Total: 9 problem pages + 1 clean control.** Each problem page hosts exactly one
dominant issue, so a page-level investigation of any single URL maps 1:1 to a single
fix. (`/story` and `/journal` carry a secondary metric facet — LCP/CLS overlap — but
each still has exactly one root-cause problem to fix.)
