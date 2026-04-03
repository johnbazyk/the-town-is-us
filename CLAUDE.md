# Granby Accountability Dashboard — Claude Code Project

## IMPORTANT: Scaffold Already Exists

This project has been pre-scaffolded. **Do NOT reinitialize with Vite or overwrite existing files.** The following are already set up and ready:

- `package.json` with all dependencies (React, Chart.js, Tailwind, Vite)
- `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
- `netlify.toml` with build command and security headers
- `index.html` with Google Fonts preconnected
- `src/data/sources.js` — all source citations pre-populated
- `src/data/data.js` — all dashboard data pre-populated (some marked as estimates)
- `src/components/` — 8 tab components (stubs with TODO comments), plus Layout and SourceCitation
- `src/App.jsx` — tab navigation with React.lazy
- `src/index.css` — Tailwind directives + custom styles

**Start here:**
```bash
git init
npm install
npm run dev
```
Then begin building out the tab components one at a time, starting with Tab 1 (Executive Summary).

---

## Project Overview

You are building the **Granby Accountability Dashboard** — a civic transparency website presenting sourced, fact-checked data about Granby CT's school budget, academic performance, property taxes, enrollment, and school climate. Every data point links to its source. Residents can fact-check everything.

**Live site:** https://courageous-babka-ef216d.netlify.app
**Goal:** Rebuild from scratch as a professional, production-grade civic platform.

---

## Project Structure

```
granby-dashboard/          ← YOU ARE HERE (React app root)
├── CLAUDE.md              ← This file (project instructions)
├── .claudeignore          ← Files Claude Code should skip
├── .gitignore             ← Standard Node ignores
├── package.json           ← Vite + React + dependencies
├── vite.config.js         ← Vite config (build output → build/)
├── tailwind.config.js     ← Custom colors (navy, steel, alert, gray-bg) + fonts
├── postcss.config.js      ← Tailwind + Autoprefixer
├── netlify.toml           ← Netlify build + security headers (CSP, X-Frame, etc.)
├── index.html             ← Vite entry point + Google Fonts + hidden Netlify form
├── public/                ← Static assets
├── src/
│   ├── main.jsx           ← React entry point
│   ├── App.jsx            ← Main app — tab navigation with React.lazy
│   ├── index.css          ← Tailwind imports + custom editorial styles
│   ├── data/
│   │   ├── sources.js     ← Source citation registry (IDs → URLs + descriptions)
│   │   └── data.js        ← All hardcoded dashboard data (budget, academic, tax, etc.)
│   ├── components/
│   │   ├── Layout.jsx     ← Header, sticky tab nav, footer
│   │   ├── SourceCitation.jsx  ← Reusable clickable [n] citation with tooltip
│   │   ├── ExecutiveSummary.jsx    ← Tab 1
│   │   ├── BudgetAnalysis.jsx      ← Tab 2
│   │   ├── AcademicPerformance.jsx ← Tab 3
│   │   ├── PropertyTaxRatchet.jsx  ← Tab 4
│   │   ├── DemographicsHousing.jsx ← Tab 5
│   │   ├── SchoolClimate.jsx       ← Tab 6
│   │   ├── FactCheck.jsx           ← Tab 7
│   │   └── SubmitData.jsx          ← Tab 8
│   └── assets/            ← Images, icons if needed
```

---

## Source Documents (READ-ONLY REFERENCE)

The parent folder `../` contains ~1,100 source PDFs organized into numbered folders. These are **reference material only** — do NOT modify them. Key folders:

- `../11-BOE-Budget-Books/` — FY2016-FY2027 budget books (PDFs). Use these to verify/extract budget figures for FY2016-FY2021 which are currently estimates in data.js.
- `../12-BOE-Budget-Presentations/` — Budget presentation slides
- `../02-Tax-Bills/` — John's actual tax bills (4 years of PDFs)
- `../17-School-Climate/` — Climate survey data, bullying reports
- `../01-Budget/` — FY2027 BOS Recommended Budget Book
- `../00-DOCUMENT-INDEX.md` — Master index of all 1,102 documents (filenames + categories)
- `../00-HIGH-PRIORITY-FILES.md` — Key files flagged for the dashboard

**IGNORE these files** (they're from a different tool session, not source data):
- `../GRANBY-COWORK-INSTRUCTIONS.md`
- `../GRANBY-COWORK-SKILL.md`
- `../06-Analysis/GRANBY-SKILL.md`
- `../06-Analysis/PROJECT-README.md`
- `../06-Analysis/PROJECT-SYSTEM-PROMPT.md`
- `../Granby-Budget-Accountability-Dashboard.html` (previous build)
- `../Granby-Budget-Accountability-Dashboard.jsx` (previous build)

---

## Tech Stack

- **React 18** (single-page app via Vite)
- **Chart.js 4** via `react-chartjs-2` for all charts
- **Tailwind CSS 3** via PostCSS (installed as dev dependency — NOT CDN)
- **Netlify Forms** for citizen submissions (free tier, 100/month)
- **Netlify** for hosting (already deployed, free tier)
- **No backend, no database** — all data is hardcoded in JSON objects within the app
- **No AI on the site** — all analysis was done offline, the site just presents results

---

## Design Direction

**Editorial / Newspaper aesthetic.** Investigative journalism meets government transparency portal.

### Color Palette (defined in tailwind.config.js)
| Token | Hex | Usage |
|-------|-----|-------|
| `navy` | `#1a1a2e` | Body text, header background |
| `white` | `#ffffff` | Page background |
| `alert` | `#c0392b` | Warnings, alert callouts, estimate markers |
| `steel` | `#2c3e50` | Section headers, tab bar |
| `gray-bg` | `#f8f9fa` | Card backgrounds, alternating rows |

### Typography (loaded in index.html)
- **Headings:** `Merriweather` (serif, authoritative) — class: `font-heading`
- **Body:** `Source Sans Pro` (clean, readable) — class: `font-body`

### Layout Rules
- Clean, editorial grid — `max-w-6xl mx-auto`
- Data cards with subtle shadows
- Charts with generous whitespace
- **NO animations, NO gradients, NO flashy effects**
- This is data journalism, not marketing

---

## Site Structure — 8 Tabs

### Tab 1: Executive Summary
- Core thesis in 3 paragraphs
- 5 correlations as a numbered list with one-line explanations (pre-populated in `EXECUTIVE_SUMMARY.correlations`)
- Simsbury comparison as the hero stat (pre-populated in `EXECUTIVE_SUMMARY.heroStat`)
- Key dates: April 6 hearing, April 20 referendum (pre-populated in `KEY_DATES`)

### Tab 2: Budget Analysis
- **Chart: BOE Budget vs Enrollment** (dual-axis, FY2016-FY2027) — scissors chart showing lines diverging. Use `BUDGET_DATA.years`.
- **Chart: Per-pupil spending** over time — compute as `boeBudget / enrollment` for each year
- **Chart: Budget composition pie chart** — use `BUDGET_COMPOSITION` from data.js (salaries, benefits, SPED, transportation, other)
- **Data table:** Year-over-year budget, enrollment, per-pupil, mill rate
- Every number links to source

### Tab 3: Academic Performance
- **Chart: District ranking over time** (#4 in 2013 → #46 in 2025) — NOTE: invert Y-axis so lower rank = higher on chart. Use `ACADEMIC_DATA.districtRanking`.
- **Chart: Math proficiency trend** (64% → 54%) — use `ACADEMIC_DATA.mathProficiency`
- **Chart: SAT benchmarks** Math vs ELA vs Science (bar chart) — use `ACADEMIC_DATA.satBenchmarks2024`
- **Peer comparison table** (Avon, Farmington, Simsbury, Granby, Suffield) — use `ACADEMIC_DATA.peerComparison`. Highlight Granby row.
- Every number links to source

### Tab 4: Property Tax Ratchet
- **Chart: Mill rate history** — extract from `BUDGET_DATA.years` where `millRate` is not null
- **Chart: John's actual tax bills** over 4 years (bar chart) — use `TAX_BILLS.bills`
- **Ratchet explanation** callout box — use `TAX_BILLS.ratchetExplanation`
- **Table:** assessment, mill rate, actual bill for each year

### Tab 5: Demographics & Housing
- **Chart: Population trend** (declining since 2010) — use `DEMOGRAPHIC_DATA.population`
- **Chart: Age distribution** showing bulge at 60-64 — use `DEMOGRAPHIC_DATA.ageDistribution`
- **Chart: Under-18 % declining, 65+ % rising** — use `DEMOGRAPHIC_DATA.ageTrends`
- **Chart: Housing values** — Granby vs Simsbury vs Suffield (bar chart) — use `HOUSING_DATA`
- Narrative: fewer kids = fewer students = higher per-pupil costs

### Tab 6: School Climate & Safety
- **Chart: Verified bullying incidents** by school (grouped bar) — use `BULLYING_DATA.verifiedIncidents`
- **Chart: Climate survey** — "My child is safe" by school (horizontal bar) — use `BULLYING_DATA.climateSurvey`
- Bullying form accessibility story (narrative text)
- **Timeline:** Pride video (June 2023), Amanda Doe lawsuit (Sept 2024), Hot mic (Feb 2026) — use `SCHOOL_CLIMATE_TIMELINE`
- Kelly Lane zero incidents callout

### Tab 7: Drummer Article Fact-Check
- Side-by-side layout for each claim:
  - Left column: CSS class `claim-box` (light red bg, red left border) — "WHAT WAS CLAIMED"
  - Right column: CSS class `data-box` (light green bg, green left border) — "WHAT THE DATA SHOWS"
- Cover Monica Logan's article (March 28, 2026) — use `FACT_CHECK_DATA.loganArticle`
- Cover Superintendent Burke's article (March 28, 2026) — use `FACT_CHECK_DATA.burkeArticle`
- **NOTE:** The claims arrays need to be populated. See the structure template in data.js. Each claim needs: `claim`, `data`, `dataSources[]`, and `verdict` ("misleading" | "false" | "missing-context" | "true").

### Tab 8: Submit Your Data
- Netlify Form with: Name (optional), Email (optional), Category dropdown, Data/Question textarea, Source URL (optional)
- Honeypot field for spam prevention
- Success message: "Thank you. Submissions are reviewed and added to the dashboard when verified."
- **Already fully implemented in SubmitData.jsx** — just verify it works with `netlify dev`

---

## Critical Technical Notes

### Chart.js Component Registration (REQUIRED)
Chart.js v4 requires explicit registration of every scale, element, and plugin you use. Add this at the top of any component that uses charts:

```javascript
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
```

Or create a shared `src/chartSetup.js` file and import it once in `main.jsx`.

### Dual-Axis Chart (Scissors Chart — Tab 2)
For the BOE Budget vs Enrollment scissors chart, use two Y-axes:
```javascript
scales: {
  y: {  // Left axis — Budget ($)
    type: 'linear',
    position: 'left',
    title: { display: true, text: 'BOE Budget ($)' },
  },
  y1: { // Right axis — Enrollment
    type: 'linear',
    position: 'right',
    title: { display: true, text: 'Enrollment' },
    grid: { drawOnChartArea: false },
  },
}
```

### Netlify Forms in React SPA (CRITICAL)
Netlify detects forms by scanning the **static HTML at deploy time**. Since React renders dynamically, you MUST add a hidden form in `index.html` so Netlify can discover it:

```html
<!-- Add this to index.html, just before </body> -->
<form name="citizen-data" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <select name="category"><option value=""></option></select>
  <textarea name="data"></textarea>
  <input type="url" name="source-url" />
</form>
```

Without this, the form will submit but Netlify won't capture the data. The React component in SubmitData.jsx handles the actual UI and submission — this hidden form is just for Netlify's deploy-time scanner.

### Source Citations (MOST IMPORTANT FEATURE)
Every data point must have a small clickable citation icon (like `[1]`) linking to the source URL. The `<SourceCitation>` component is already built in `src/components/SourceCitation.jsx`. Use it like:
```jsx
<span>District ranking dropped to #46 <SourceCitation id="SCHOOLDIGGER" index={1} /></span>
```
This is the entire point of the site — anyone can verify any number.

### Estimates vs Verified Data
Any estimated or interpolated figure must be marked with an asterisk `*` and explanatory note. In data.js, these are flagged with `isEstimate: true`. Specifically:
- Budget data for FY2016-FY2021 (need verification from budget books in `../11-BOE-Budget-Books/`)
- District ranking for 2018 and 2020 (interpolations)
- Climate survey percentages (approximate readings from bar chart)

Display pattern:
```jsx
{item.isEstimate && <span className="estimate-marker" title="Estimated — see note">*</span>}
```

### Responsive Design
Must work on mobile — people read this on phones from Facebook threads. Use Tailwind responsive breakpoints. Charts should resize (Chart.js `responsive: true, maintainAspectRatio: false` inside a container with fixed height). Tables should scroll horizontally on mobile:
```jsx
<div className="overflow-x-auto">
  <table className="min-w-full">...</table>
</div>
```

### Performance
- Tab components are already lazy-loaded via `React.lazy` in App.jsx
- Total bundle should be under 500KB
- Chart.js is code-split into its own chunk (see `vite.config.js` manualChunks)
- All fonts loaded from Google Fonts CDN (preconnected in index.html)

---

## Security

- All data is static — no API calls, no database, no user authentication
- Netlify provides free SSL/HTTPS automatically
- Honeypot field + Netlify's built-in spam detection for forms
- No user-uploaded files (form is text-only)
- Content Security Policy and other headers are set in `netlify.toml`:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - CSP allows: self, Google Fonts, cdnjs, jsdelivr

---

## Footer Must Include

These items are already in `Layout.jsx` but verify they're all present:
- "Built by a Granby taxpayer using public data and AI-assisted analysis"
- "All data sourced from official government records and public databases"
- "Found an error? Submit a correction via the form above or email [contact method]"
- "This is a First Amendment-protected civic publication"
- Last updated date
- Link to download all source data (link to Granby Public Schools document page)

---

## Tone & Editorial Voice

This is **not** anti-school. This is **not** anti-teacher. This is a taxpayer exercising their First Amendment right to analyze public data and ask their government to tie spending to outcomes.

The tone should be: *"Here's what the data shows. Here are the sources. Prove us wrong — we welcome it."*

---

## Development Workflow

```bash
# 1. Initialize (first time only)
git init
npm install

# 2. Develop
npm run dev          # Starts Vite dev server at localhost:5173

# 3. Build each tab component one at a time
#    Start with ExecutiveSummary.jsx, then BudgetAnalysis.jsx, etc.
#    Test each on mobile viewport in Chrome DevTools

# 4. Test Netlify Forms locally
npx netlify-cli dev  # Or: netlify dev (if CLI installed globally)

# 5. Production build
npm run build        # Output to build/

# 6. Deploy
netlify deploy --prod --dir=build
# Or connect GitHub repo for auto-deploy on push
```

---

## Data Verification TODO

Before deploying, verify these estimated figures against the source PDFs:
- [ ] FY2016 budget and enrollment → check `../11-BOE-Budget-Books/FY2016-Approved-Budget.pdf`
- [ ] FY2017 budget and enrollment → check `../11-BOE-Budget-Books/FY2017-Approved-Budget.pdf`
- [ ] FY2018 budget and enrollment → check `../11-BOE-Budget-Books/FY2018-Approved-Budget.pdf`
- [ ] FY2019 budget and enrollment → check `../11-BOE-Budget-Books/FY19-BOE-Budget-Book.pdf`
- [ ] FY2020 budget and enrollment → check `../11-BOE-Budget-Books/FY20-Board-of-Education-Budget-Book.pdf`
- [ ] FY2021 budget and enrollment → check `../11-BOE-Budget-Books/FY21-BOE-Budget-Book.pdf`
- [ ] District ranking 2018 interpolation → verify against SchoolDigger historical data
- [ ] District ranking 2020 interpolation → verify against SchoolDigger historical data
- [ ] Climate survey percentages → verify exact figures from `../17-School-Climate/2025-12-03_School-Climate.pdf`
- [ ] Budget composition breakdown (salaries, benefits, SPED, transportation) → extract from FY2027 budget book
- [ ] Fact-check claims → read Drummer articles and populate `FACT_CHECK_DATA` in data.js
- [ ] Demographic data → verify Census ACS figures for Granby population, age distribution

---

## Final Checklist Before Deploy

- [ ] Every number has a clickable source citation (`<SourceCitation>`)
- [ ] Estimated figures are marked with asterisks and explanatory notes
- [ ] All charts render correctly on mobile (test at 375px width)
- [ ] Netlify Form submits successfully (test with `netlify dev`)
- [ ] Honeypot spam prevention is working (hidden `bot-field`)
- [ ] Hidden form exists in `index.html` for Netlify form detection
- [ ] HTTPS is active (Netlify default)
- [ ] Security headers are set in netlify.toml
- [ ] Footer includes First Amendment notice and error reporting
- [ ] Tab 7 (Fact-Check) correctly represents both Drummer articles
- [ ] No broken source links
- [ ] Color scheme is consistent and professional
- [ ] Typography is readable at all screen sizes
- [ ] Bundle size is under 500KB (`npm run build` + check dist output)
- [ ] All Chart.js components are registered (no console errors)
