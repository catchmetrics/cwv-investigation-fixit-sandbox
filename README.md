# NorthPeak Outdoors

The marketing and trip-planning site for **NorthPeak Outdoors** — a (fictional)
backcountry gear company. Built with [Next.js](https://nextjs.org) (App Router),
React 19, and TypeScript.

## Pages

- `/` — Home (hero, brand story, field journal)
- `/gallery` — Trip photo gallery
- `/dashboard` — Trip planner (difficulty estimator + trail search)
- `/about` — About the company

## Getting started

Requires Node.js 24.

```bash
npm ci          # install dependencies (uses package-lock.json)
npm run dev     # start the dev server at http://localhost:3000
```

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs `npm ci`, `npm run lint`, and
`npm run build` on every push and pull request.

---

> **Note for maintainers:** this repository **intentionally contains a catalogue of
> Core Web Vitals performance problems** (heavy unoptimized images, render-blocking
> scripts/fonts, layout-shifting content, long main-thread tasks, and bundle bloat).
> They are *runtime performance* anti-patterns only — the project builds and lints
> cleanly. It exists as a test target for an automated performance investigation and
> "Fix It" workflow. See [`CWV-ISSUES.md`](./CWV-ISSUES.md) for the full annotated
> answer key. Please do not "fix" these issues unless that is the task you are working
> on.
