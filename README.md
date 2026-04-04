# Granby Accountability Dashboard

**Live site:** https://thetownisus.netlify.app

A civic transparency dashboard presenting sourced, fact-checked data about Granby, CT's school budget, academic performance, property taxes, enrollment, and school climate. Every number on the site links to its original source document. If you find an error, you can submit a correction directly through the site.

This project exists because public budget data should be accessible to every taxpayer — not just those who can attend a Tuesday night BOE meeting and parse a 200-page PDF. The data is all public. This site just makes it readable.

## What's Inside

Nine tabs, each backed by primary source documents:

1. **Executive Summary** — core thesis, key correlations, peer district snapshot
2. **Budget Analysis** — BOE budget vs. enrollment trends (FY2016–FY2027), per-pupil spending, budget composition
3. **Academic Performance** — district rankings, math proficiency trends, SAT benchmarks, peer comparison table
4. **Property Tax Ratchet** — mill rate history and actual tax bill impact (4 years of real bills)
5. **Town & Housing Data** — population trends, age demographics, Zillow home value comparisons
6. **School Climate & Safety** — verified bullying incident data, climate survey results, incident timeline
7. **Fact-Check** — side-by-side analysis of claims in local press vs. what the data shows
8. **Data Verification** — full audit trail: corrections log, verification status, remaining estimates
9. **Submit Your Data** — citizen submission form (Netlify Forms, spam-protected)

## Key Feature

Every data point has a clickable citation badge `[n]` that links to the original source document. There are no unsourced claims on this site. Estimated figures (read from charts or interpolated) are marked with `*` and explained.

## Data Sources

Approximately 1,100 official public documents, including:

- **Granby BOE Budget Books FY2016–FY2027** — annual approved operating budgets, enrollment actuals
- **Town of Granby property tax bills** — 4 years of actual assessed values, mill rates, and tax totals
- **CT EdSight** — Smarter Balanced assessment results (math and ELA proficiency)
- **CT Bureau of Fiscal Services NCEP Report (Jan 2026)** — net current expenditures per pupil, peer district comparison
- **SchoolDigger** — annual Connecticut district rankings (2013–2025)
- **CT State Department of Education** — SAT benchmark data, graduation rates, school climate survey
- **U.S. Census Bureau American Community Survey (ACS)** — population, age distribution, household data
- **Zillow Home Value Index (ZHVI)** — typical home values for Granby, Simsbury, and Suffield
- **The Granby Drummer** — local reporting (fact-checked in Tab 7)
- **CT General Assembly** — Public Act 23-167

## AI Disclosure

Built using AI-assisted analysis tools (Claude Code + Claude). The AI extracted and organized data from source PDFs and built the presentation layer. All editorial decisions, data verification, and review were performed by the author.

Specifically: Claude Code (a command-line coding agent) extracted figures from ~1,100 source documents, structured them as JSON data objects, and built the React application. Claude (a desktop planning tool) structured the 20-step build workflow. The AI did not generate claims, search the internet, or make editorial decisions. Every step required human review and approval before proceeding. For scanned PDFs (FY2016–FY2020), OCR verification was used and cross-confirmed via prior-year columns in consecutive budget books.

## Tech Stack

- **React 18** — single-page application, tab-based navigation, lazy-loaded components
- **Chart.js 4** via `react-chartjs-2` — all charts
- **Tailwind CSS 3** — styling (PostCSS, not CDN)
- **Vite 6** — build tooling, code splitting
- **Netlify** — hosting + Forms for citizen submissions (free tier)
- **No backend, no database** — all data is hardcoded from verified public sources

## Running Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Building for Production

```bash
npm run build
```

Output goes to `build/`. Total JS bundle is ~433KB uncompressed (~115KB gzip). Netlify runs this automatically on push to `main`.

## Build Documentation

- [`HOW-THIS-SITE-WAS-BUILT.md`](./HOW-THIS-SITE-WAS-BUILT.md) — full methodology writeup — how the data was gathered, verified, and presented using AI-assisted tools
- [`SITE-UPDATE-SPEC.md`](./SITE-UPDATE-SPEC.md) — the 20-step specification that governed the build process for this version
- [`qa-reports/QA-AUDIT-2026-04-04.md`](./qa-reports/QA-AUDIT-2026-04-04.md) — pre-deploy QA audit results (7/9 checks passed, 2 investigated and resolved)

## License

MIT — see [LICENSE](LICENSE).

---

*This is a First Amendment-protected civic publication produced by a private citizen using public records. It is not affiliated with the Town of Granby or Granby Public Schools.*
