# The Town Is Us — Granby Budget Accountability Dashboard

**Live site:** https://clever-faloodeh-1359e6.netlify.app

A public accountability dashboard for Granby, CT school budget and academic outcomes. Every number is sourced from official public records. Residents can fact-check everything.

## What

An interactive dashboard presenting sourced, fact-checked data about Granby CT's school budget, academic performance, property taxes, enrollment, demographics, and school climate. Eight tabs cover:

1. Executive Summary — core thesis and key correlations
2. Budget Analysis — BOE budget vs enrollment trends (FY2016–FY2027)
3. Academic Performance — district rankings, math proficiency, SAT benchmarks, peer comparisons
4. Property Tax Ratchet — mill rate history and actual tax bill impact
5. Town & Housing — population trends, age demographics, housing values
6. School Climate & Safety — bullying data, climate surveys, incident timeline
7. Fact-Check — side-by-side claim vs. data analysis of local press articles
8. Submit Your Data — Netlify-powered citizen submission form

## Why

Taxpayer transparency. Every data point links to its source. If a number is wrong, submit a correction — we welcome it.

This is a First Amendment-protected civic publication built by a Granby taxpayer using public data and AI-assisted analysis.

## Tech Stack

- **React 18** — single-page application
- **Vite 6** — build tooling
- **Tailwind CSS 3** — styling
- **Chart.js 4** via `react-chartjs-2` — all charts
- **Netlify** — hosting + form submissions (free tier)
- **No backend, no database** — all data is hardcoded from verified public sources

## Data Sources

- **CT EdSight** — Smarter Balanced assessment results, district rankings
- **CT Bureau of Fiscal Services NCEP Report** — per-pupil spending, enrollment
- **Granby BOE Budget Books FY2016–FY2027** — annual budget figures
- **Zillow ZHVI** — housing value index data
- **CT Secretary of the State** — mill rate history

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

Output goes to `build/`. Netlify runs this automatically on deploy.

## License

MIT — see [LICENSE](LICENSE).
