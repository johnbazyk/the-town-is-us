# /data-audit — Granby Dashboard Data Integrity Audit

Run a complete data integrity audit against the local source documents. This command reads every numeric data point from `src/data/data.js`, cross-references it against the original source PDF on disk, and reports the result. Do NOT use live internet sources to verify — local PDFs are the source of truth.

**Cardinal rule:** When a local PDF and a live internet source disagree, flag it for human review. Do not auto-correct in either direction. Only report findings.

---

## Setup

Before beginning, read two files in full:

1. `src/data/data.js` — extract every numeric field from every exported constant.
2. `src/data/sources.js` — build a map of every source ID to its URL and description.

Also note the local PDF root: `../` relative to the repo root (`~/Desktop/Granby-Budget-Project/`).

---

## 1. BUDGET_DATA Audit

**Source map:**

| FY | Local PDF | Key pages |
|---|---|---|
| FY2016 | `../11-BOE-Budget-Books/FY2016-Approved-Budget.pdf` | Budget Summary (book p.38) |
| FY2017 | `../11-BOE-Budget-Books/FY2017-Approved-Budget.pdf` | Budget Summary (book p.38) |
| FY2018 | `../11-BOE-Budget-Books/FY2018-Approved-Budget.pdf` | Budget Summary (book p.38) |
| FY2019 | `../11-BOE-Budget-Books/FY19-BOE-Budget-Book.pdf` | Budget Summary (book p.38) |
| FY2020 | `../11-BOE-Budget-Books/FY20-Board-of-Education-Budget-Book.pdf` | Budget Summary (book p.36) |
| FY2021 | `../11-BOE-Budget-Books/FY26-BOE-Budget-Book.pdf` | "Past BOE Approved Operating Budgets" history table |
| FY2022–FY2026 | `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf` | History table (book p.3) |
| FY2027 | `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf` | Proposed total (book p.3) |
| Enrollment FY2020–FY2027 | `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf` | Enrollment actuals table |

**For each year in `BUDGET_DATA.years`:**

1. Read the appropriate PDF page(s) as listed above.
2. Extract `boeBudget` (Total All row, current-year Budget column in Budget Summary).
3. Extract `enrollment` (from enrollment history table).
4. Compare to `data.js` values.
5. Record: MATCH, MISMATCH (show both values), or UNREADABLE (scanned/garbled page).
6. Note the `isEstimate` flag status — if present and you verified the value, flag it for removal.

**Cross-confirmation rule:** For FY2016–FY2020, confirm the value appears as the prior-year column in the next year's book. Both must agree before recording MATCH.

---

## 2. TAX_BILLS Audit

**Source map:**

| Bill | Local PDF |
|---|---|
| GL2020 (FY22) | `../02-Tax-Bills/Tax-Bill-GL2020-FY22-9380.92.pdf` |
| GL2021 (FY23) | `../02-Tax-Bills/Tax-Bill-GL2021-FY23-9804.26.pdf` |
| GL2022 (FY24) | `../02-Tax-Bills/Tax-Bill-GL2022-FY24-10185.50.pdf` |
| GL2023 (FY25) | `../02-Tax-Bills/Tax-Bill-GL2023-FY25-10517.52.pdf` |

**For each bill in `TAX_BILLS.bills`:**

Read the PDF and confirm:
- `assessment` — the assessed value on the bill
- `millRate` — the mill rate on the bill
- `tax` — the total tax amount (must match to the cent)

Record MATCH or MISMATCH for each of the 12 fields (4 bills × 3 fields).

---

## 3. ACADEMIC_DATA Audit

Academic data comes from external sources with no local PDF equivalents for most fields. For each data point:

- **District rankings (`districtRanking`):** Source is SchoolDigger (`SCHOOLDIGGER` in sources.js). Note any `isEstimate: true` entries and why they cannot be verified locally. Flag the 2018 and 2020 interpolations explicitly.
- **Math proficiency (`mathProficiency`):** Source is CT EdSight. Check if a local PDF exists at `../16-School-Profiles/` that contains these figures.
- **SAT benchmarks (`satBenchmarks2024`):** Check `../16-School-Profiles/GranbySummative-State-Testing-Report-Summary-2024.pdf` for the three percentages (math, ELA, science).
- **Peer comparison (`peerComparison`):** Source is NCEP report (`NCEP_2026`). Check if the local PDF at the URL in sources.js contains the per-pupil figures.

For any value that cannot be verified against a local PDF, record as UNVERIFIABLE-EXTERNAL and note the source URL.

---

## 4. BULLYING_DATA Audit

**Source:** `../17-School-Climate/2025-12-03_School-Climate.pdf`

**For `verifiedIncidents`:** Read the bullying data table in the PDF. Confirm each cell value (5 years × 5 schools = 25 cells). Record MATCH or MISMATCH for every cell.

**For `climateSurvey`:** These percentages are bar-chart reads (`isEstimate: true`). Read the bar chart and record your visual estimate of each school's "My child is safe" percentage. Compare to data.js values. Record as ESTIMATE with the observed range (e.g., "appears to be 85–89%").

Do not remove the `isEstimate` flag from climate survey values — bar-chart reads are inherently approximate.

---

## 5. HOUSING_DATA Audit

**Source:** Zillow Home Value Index (live web source — no local PDF)

**For each town in `HOUSING_DATA.values`:**

1. Check that the `ZILLOW_[TOWN]` URL in sources.js is reachable:
   ```bash
   curl -sI --max-time 10 "<URL>" | head -1
   ```
2. If reachable, note the current ZHVI on the page (Zillow updates monthly — the value in data.js may be stale).
3. If not reachable (403/bot block), record as UNVERIFIABLE-EXTERNAL.
4. Record the `asOf` date in data.js and flag if it is more than 60 days old.

**Do not update data.js values** — report the discrepancy and flag for human review.

---

## 6. DEMOGRAPHIC_DATA Audit

**Source:** U.S. Census Bureau American Community Survey (`CENSUS_ACS` in sources.js)

No local PDF exists for demographic data. For each series in `DEMOGRAPHIC_DATA`:

1. Check that the Census ACS URL in sources.js is reachable.
2. Note the `isEstimate` status of each field.
3. Record all as UNVERIFIABLE-EXTERNAL unless a local file is found in `../` with Census data.

---

## 7. BUDGET_COMPOSITION Audit

**Source:** `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf` — Operating Budget Summary pie chart (book p.12).

For each category in `BUDGET_COMPOSITION.categories`:

1. Read the pie chart page in the FY27 budget book.
2. Locate the percentage for each slice.
3. Compare to data.js `percentage` fields.
4. Record MATCH or MISMATCH.

Note: percentages must sum to 100%. If they don't in data.js, flag as a data integrity error.

---

## 8. Source ID Coverage Check

For every numeric field in `data.js`, confirm there is a `source` key pointing to a valid ID in `sources.js`. Specifically:

1. Read all `source` fields from every object in every exported constant.
2. Check each source ID exists as a key in `sources.js`.
3. Flag any field with a missing or undefined `source`.
4. Flag any field with `source: null` or no `source` key at all.

---

## 9. Output

### Console summary (show to user immediately)

```
GRANBY DASHBOARD — DATA INTEGRITY AUDIT
Date: [today's date]
========================================

BUDGET_DATA:    [x] MATCH  [x] MISMATCH  [x] UNREADABLE  [x] ESTIMATE
TAX_BILLS:      [x] MATCH  [x] MISMATCH
ACADEMIC_DATA:  [x] MATCH  [x] UNVERIFIABLE-EXTERNAL  [x] ESTIMATE
BULLYING_DATA:  [x] MATCH  [x] MISMATCH  [x] ESTIMATE
HOUSING_DATA:   [x] MATCH  [x] UNVERIFIABLE-EXTERNAL
DEMOGRAPHIC:    [x] UNVERIFIABLE-EXTERNAL
BUDGET_COMP:    [x] MATCH  [x] MISMATCH
SOURCE IDs:     [x] valid  [x] missing

TOTAL DATA POINTS AUDITED: x
  Verified (MATCH):          x
  Estimated (ESTIMATE):      x
  Mismatched (MISMATCH):     x
  Unverifiable (EXTERNAL):   x
  Unreadable (PDF issue):    x

ACTION REQUIRED: [list any MISMATCHes with old → correct value]
```

### Written report

Save the full detailed findings to `qa-reports/DATA-AUDIT-[DATE].md` using this structure:

```markdown
# Data Integrity Audit — [DATE]

## Summary
[counts table]

## Budget Data
[one row per FY: FY | boeBudget (data.js) | boeBudget (PDF) | Result | enrollment (data.js) | enrollment (PDF) | Result]

## Tax Bills
[one row per field: Bill | Field | data.js value | PDF value | Result]

## Academic Data
[one row per field: Field | data.js value | Source | Result]

## Bullying Data
[25-cell grid: School × Year | data.js | PDF | Result]

## Climate Survey
[4 rows: School | data.js % | Visual read range | Result]

## Housing Data
[3 rows: Town | data.js ZHVI | asOf | URL status | Result]

## Demographic Data
[Series list with UNVERIFIABLE-EXTERNAL status]

## Budget Composition
[7 rows: Category | data.js % | PDF % | Result]

## Source ID Coverage
[List any missing or broken source IDs]

## Recommendations
[Ordered list of corrections needed, by priority]
```

Create the `qa-reports/` directory if it doesn't exist. Do not commit the output file — it is in `.gitignore`.
