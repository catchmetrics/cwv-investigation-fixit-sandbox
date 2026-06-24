# CWV-ISSUES — Answer Key

This repository is the **test target** for the Investigation → "Fix It" automation
(**ADP-1762**). It is a small, believable marketing/e-commerce site for a fictional
brand ("NorthPeak Outdoors") that has been **deliberately seeded with a catalogue of
Core Web Vitals (CWV) performance anti-patterns**.

The point of the repo:

- An **AI investigation** should be able to identify these runtime performance
  problems from the source code (and/or RUM data).
- An automated **"Fix It"** pass should be able to correct them by editing real
  source files — and its output is graded against the table below.

The problems are **runtime performance issues only**. The project intentionally
**builds and lints cleanly** (`npm run build` and `npm run lint` are both green), so
CI on `main` stays green. A "fix" is expected to improve performance, **not** repair a
broken build.

Every issue is also annotated inline in the source with paired comments:

- `// CWV-ISSUE[METRIC]: <what & why it's bad>`
- `// CWV-FIX: <the intended fix>`

## A note on ESLint

The intentional use of plain `<img>` instead of `next/image` is the whole point of
several issues, so the `@next/next/no-img-element` rule is **deliberately disabled at
each `<img>` site** via inline `// eslint-disable-next-line @next/next/no-img-element`
comments. This keeps `npm run lint` green without removing the perf problem. Two
informational `@next/next` font warnings (`google-font-display`, `no-page-custom-font`)
are left in place — they are non-fatal (lint exits 0) and they actually *document* the
blocking-font issue. They must not be "fixed" by deleting the font; the intended fix is
to load it correctly (see issue #3).

## Issue catalogue

| #  | Metric | File | What's wrong | Intended fix |
|----|--------|------|--------------|--------------|
| 1  | LCP | `components/HeroImage.tsx` | The LCP element is a ~5 MB, 2400×1400 unoptimized JPEG rendered with a plain `<img src="/hero.jpg">` — no `next/image`, no responsive `srcset`, no modern format, no `width`/`height`, and not `priority`/preloaded, so it's discovered late and downloads slowly. | Use `next/image` with `priority` + `sizes` (or add `<link rel="preload" as="image">` + dimensions + `fetchpriority="high"`), and serve a properly compressed, correctly sized asset. |
| 2  | LCP | `app/layout.tsx` (`BLOCKING_HEAD_SCRIPT`) | A synchronous inline `<script>` in `<head>` runs a ~250 ms main-thread busy-loop before the browser can paint, delaying FCP/LCP. | Remove the busy work, or move to `next/script` with `afterInteractive`/`lazyOnload` (or `defer`/`async`) so it no longer blocks render. |
| 3  | LCP / CLS | `app/layout.tsx` (font `<link>`) + `app/globals.css` | A remote Google Font is loaded via a plain `<link rel="stylesheet">` with **no `preconnect`** (extra DNS+TLS round-trip in the critical path) and **no `&display=swap`** (FOIT blocks text paint, hurting LCP; later swap reflows text, hurting CLS). | Add `preconnect` to `fonts.googleapis.com` + `fonts.gstatic.com`, append `&display=swap`, or (best) replace with `next/font` (self-hosted, size-adjusted) to remove the round-trips and the swap shift. |
| 4  | CLS / LCP | `components/GalleryGrid.tsx` | Six ~3.4 MB full-resolution gallery images rendered as plain `<img>` with **no `width`/`height`** (and no `aspect-ratio`), eagerly loaded, so each one shifts the grid as it arrives. | Use `next/image` with explicit `width`/`height` (or `fill` + sized container), reserve space via dimensions/`aspect-ratio`, add `loading="lazy"`, and serve optimized assets. |
| 5  | CLS | `components/AdBanner.tsx` | A promo banner mounts empty and, inside `useEffect` (after a delay), reveals a tall block at the **top of the page with no reserved space**, pushing the hero and everything below it down. | Render server-side so it's in the initial HTML, or reserve its height (`min-height`/skeleton) up front so revealing it doesn't move content. |
| 6  | INP / LoAF | `components/HeavyButton.tsx` | The `onClick` runs a ~300,000,000-iteration synchronous loop on the main thread, producing a multi-hundred-ms Long Animation Frame and terrible INP for that interaction. | Chunk the work across frames (`setTimeout`/`requestIdleCallback`/`scheduler.yield`), offload to a Web Worker, or precompute/memoize so the handler returns quickly. |
| 7  | INP | `components/SlowFilterList.tsx` | A search box over a 20,000-item in-memory list re-filters and re-sorts **synchronously on every keystroke** with no debounce, no `useMemo`, and no virtualization, producing a LoAF per keystroke. | Debounce the input, memoize the filtered/sorted result with `useMemo`, and cap/virtualize the rendered rows. |
| 8  | TBT (bundle) | `components/SlowFilterList.tsx` | The **entire `lodash`** library is imported with `import _ from "lodash"` and shipped to the client, where only `deburr`/`sortBy`/`take` are used — all of which have small native equivalents. Confirmed present in the client bundle. | Drop lodash for native JS (`String.normalize`, `Array.sort`, `Array.slice`), or import only the needed functions (`lodash/sortBy`) / dynamically import it. |
| 9  | TBT (hydration) | `components/FeatureGrid.tsx` | A purely static marketing component is marked `"use client"` for no reason (no state/effects/handlers), so its JS is shipped and hydrated needlessly, raising Total Blocking Time. | Remove the `"use client"` directive so it renders entirely on the server and ships no JS. |

**Total: 9 intentional issues** — LCP ×2 (issues 1, 2; plus the LCP facet of 3 & 4),
CLS ×2 primary (4, 5; plus the CLS facet of 3), INP/LoAF ×2 (6, 7), and TBT/bundle ×2
(8, 9). Several issues legitimately span more than one metric and are tagged with all
relevant metrics inline.

## Per-metric summary

| Metric | Issues |
|--------|--------|
| LCP | #1 (hero `<img>`), #2 (blocking head script), #3 (blocking font), #4 (eager gallery images) |
| CLS | #3 (font swap reflow), #4 (dimensionless images), #5 (client-injected banner) |
| INP / LoAF | #6 (long-task button), #7 (synchronous keystroke filter) |
| TBT / bundle | #8 (full lodash on the client), #9 (needless `"use client"`) |

## Pages map

| Route | Component(s) | Issues exercised |
|-------|--------------|------------------|
| `/` (`app/page.tsx`) | `AdBanner`, `HeroImage`, `FeatureGrid` | #1, #2, #3, #5, #9 |
| `/gallery` (`app/gallery/page.tsx`) | `GalleryGrid` | #2, #3, #4 |
| `/dashboard` (`app/dashboard/page.tsx`) | `HeavyButton`, `SlowFilterList` | #2, #3, #6, #7, #8 |
| `/about` (`app/about/page.tsx`) | — (intentionally clean) | none |

(Issues #2 and #3 live in `app/layout.tsx` and therefore affect **every** route.)
