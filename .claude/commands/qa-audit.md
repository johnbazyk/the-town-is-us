# /qa-audit — Granby Dashboard Site Quality Audit

Run a comprehensive quality audit of the Granby Accountability Dashboard. Work through each check below in order. Output a PASS/FAIL checklist at the end. Do NOT modify any files — this is read-only except for writing the results file.

---

## 1. Build Check — Bundle Size

Run the production build and report the output size.

```bash
npm run build
```

- Check the Vite build output for total JS/CSS bundle sizes.
- Run `du -sh build/` for total directory size.
- **PASS:** Total JS bundle under 500KB (check build/assets/*.js sizes).
- **FAIL:** Any individual JS chunk over 500KB, or build errors.

---

## 2. Component Code Audit

Read every file in `src/components/`. For each component, check the following:

### 2a. SourceCitation usage

Every component that displays a data value from `src/data/data.js` MUST import and use `<SourceCitation>`. Data-displaying components are: `ExecutiveSummary`, `BudgetAnalysis`, `AcademicPerformance`, `PropertyTaxes` (or `PropertyTaxRatchet`), `TownHousingData` (or `DemographicsHousing`), `SchoolClimate`, `FactCheck`.

- **PASS:** Each data-displaying component has `import SourceCitation` and at least one `<SourceCitation` usage.
- **FAIL:** Any data-displaying component with zero SourceCitation usages.

### 2b. Estimate markers

Search `src/data/data.js` for all fields with `isEstimate: true`. For each, confirm the corresponding UI component renders an asterisk `*` or estimate marker near that value.

- **PASS:** All `isEstimate: true` fields have a visible disclosure in the UI.
- **FAIL:** Any estimated figure displayed without a marker.

### 2c. Chart.js registration

Read every component that imports from `chart.js` or `react-chartjs-2`. Confirm `ChartJS.register(...)` is called (either inline or via a shared `chartSetup.js`). Required registrations: `CategoryScale`, `LinearScale`, `PointElement`, `LineElement`, `BarElement`, `ArcElement`, `Title`, `Tooltip`, `Legend`.

- **PASS:** Every chart component registers all required Chart.js components before use.
- **FAIL:** Any chart component missing registration, or any console-error-prone missing scale.

### 2d. Responsive patterns

In every component that renders a chart: confirm `responsive: true` and `maintainAspectRatio: false` are set in chart options, and the chart is wrapped in a container with a defined height (e.g., `style={{ height: '300px' }}` or equivalent Tailwind `h-*` class).

In every component that renders a `<table>`: confirm it is wrapped in `<div className="overflow-x-auto">`.

- **PASS:** All charts are responsive; all tables have horizontal scroll wrapper.
- **FAIL:** Any chart without responsive options, or any table without overflow wrapper.

---

## 3. Source URL Verification

Read `src/data/sources.js`. Extract every `url` field. For each URL, check the HTTP status using curl:

```bash
curl -sI --max-time 10 "<URL>" | head -1
```

- **PASS:** HTTP 200 or 301/302 redirect to a working page.
- **FAIL:** HTTP 4xx, 5xx, SSL error, or connection timeout.
- **NOTE:** Some URLs (Zillow, CT.gov PDFs) may return 403 due to bot protection. Flag these as UNVERIFIABLE rather than FAIL — note the date and the HTTP response.

Report each URL with its status code. Flag any that are broken or unverifiable.

---

## 4. Netlify Form Consistency Check

Read `index.html` and `src/components/SubmitData.jsx`.

Confirm the hidden form in `index.html` matches the React form in `SubmitData.jsx` on:

1. **Form name:** both must have `name="citizen-data"` (and `netlify` / `data-netlify="true"` respectively).
2. **Field names:** every `name=` attribute in the React form must exist in the hidden HTML form.
3. **Category options:** every `<option value="...">` in the React `<select>` must have a matching `<option>` in the hidden HTML `<select>`.
4. **Honeypot:** both forms must reference `bot-field`.

- **PASS:** All fields and category options match exactly.
- **FAIL:** Any field name or option value present in one form but missing from the other.

---

## 5. Footer Completeness Check

Read `src/components/Layout.jsx`. Locate the `<footer>` element. Confirm all of the following are present:

1. First Amendment notice — must contain the words "First Amendment" and "civic publication".
2. Error reporting link — must contain a reference to the submission form (button or link with `onTabChange`).
3. Last updated date — must contain "Last updated:" followed by a date.
4. Data verification date — must contain "Data last verified:" followed by a date.
5. Source document link — must contain a link to an external source document archive.

- **PASS:** All 5 elements present.
- **FAIL:** Any element missing or the dates are more than 30 days old relative to today.

---

## 6. Output — PASS/FAIL Checklist

After completing all checks, output results in this exact format:

```
GRANBY DASHBOARD — QA AUDIT RESULTS
Date: [today's date]
=====================================

[ ] 1. Build — Bundle size under 500KB
[ ] 2a. SourceCitation — all data components
[ ] 2b. Estimate markers — all isEstimate fields
[ ] 2c. Chart.js registration — all chart components
[ ] 2d. Responsive — charts + table wrappers
[ ] 3. Source URLs — all return 200 (note any UNVERIFIABLE)
[ ] 4. Netlify form — hidden HTML matches React form
[ ] 5. Footer — all 5 required elements present

PASSED: x/8
FAILED: x/8
UNVERIFIABLE: x (list items)

--- DETAILS ---
[For each FAIL or UNVERIFIABLE, explain what was found and what the fix is]
```

Replace `[ ]` with `[PASS]`, `[FAIL]`, or `[UNVERIFIABLE]` as appropriate.

Save the full results to `qa-reports/QA-AUDIT-[DATE].md` (create the `qa-reports/` directory if it doesn't exist). Then summarize findings to the user.
