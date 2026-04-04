# The Town Is Us — Site Review & Update Specification

**Version:** 2.0
**Date:** April 4, 2026
**Author:** John Bazyk / Claude (Anthropic)
**Classification:** First Amendment–Protected Civic Publication
**Project:** Granby Accountability Dashboard
**Live URL:** https://thetownisus.netlify.app
**Repo:** `~/Desktop/Granby-Budget-Project/granby-dashboard`

---

## 0. Purpose and Scope

This is an execution specification for Claude Code. It defines every task required to harden, verify, and upgrade the Granby Accountability Dashboard — a live, public-facing civic transparency site that presents sourced, fact-checked data about Granby CT's school budget, academic performance, property taxes, and school climate.

This site is a First Amendment–protected publication under active public scrutiny. Every claim, every number, and every source link must be defensible. The standard is not "good enough" — the standard is that a hostile reader can click any citation and confirm it independently.

**Cardinal rule:** All data verification MUST be performed against the local source documents in `~/Desktop/Granby-Budget-Project/`, NOT against internet URLs. The source PDFs were downloaded from official government websites, renamed for clarity, and organized into numbered folders. They are the primary evidence. URLs break, CMS platforms change, and government websites reorganize. The PDFs on disk do not change.

---

## 1. Source Document Inventory

The project owner downloaded 1,102 official documents from Granby Public Schools, the Town of Granby, the State of Connecticut, and other public sources. They are stored at:

```
~/Desktop/Granby-Budget-Project/
```

The following folders contain the primary source documents referenced by the dashboard. Claude Code MUST use these file paths — not web URLs — when verifying data.

### 1.1 Budget Data — Primary Sources

These are the original BOE budget books. They are the authoritative source for all budget totals, enrollment figures, per-pupil spending, and budget composition displayed on the dashboard.

| Fiscal Year | Local File Path | Verification Status |
|---|---|---|
| FY2016 | `../11-BOE-Budget-Books/FY2016-Approved-Budget.pdf` | UNVERIFIED — scanned/image PDF, not text-extractable |
| FY2017 | `../11-BOE-Budget-Books/FY2017-Approved-Budget.pdf` | UNVERIFIED — scanned/image PDF |
| FY2018 | `../11-BOE-Budget-Books/FY2018-Approved-Budget.pdf` | UNVERIFIED — scanned/image PDF |
| FY2019 | `../11-BOE-Budget-Books/FY19-BOE-Budget-Book.pdf` | UNVERIFIED — scanned/image PDF |
| FY2020 | `../11-BOE-Budget-Books/FY20-Board-of-Education-Budget-Book.pdf` | UNVERIFIED — scanned/image PDF |
| FY2021 | `../11-BOE-Budget-Books/FY21-BOE-Budget-Book.pdf` | VERIFIED via history tables in FY26+FY27 books |
| FY2021 (Admin) | `../11-BOE-Budget-Books/FY21-Administrative-Budget-Book.pdf` | Secondary source |
| FY2022 | `../11-BOE-Budget-Books/FY22-BOE-Budget-Book.pdf` | VERIFIED — intro + history tables |
| FY2022 (Admin) | `../11-BOE-Budget-Books/FY22-Administrative-Budget-Book.pdf` | Secondary source |
| FY2023 | `../11-BOE-Budget-Books/FY23-Board-of-Education-Budget-Book.pdf` | VERIFIED via history tables |
| FY2023 (Admin) | `../11-BOE-Budget-Books/FY23-Adminitrative-Budget-Book.pdf` | Secondary source (note: typo in original filename) |
| FY2024 | `../11-BOE-Budget-Books/FY24-BOE-Budget-Book-Rev.pdf` | VERIFIED — intro + history tables |
| FY2024 (Admin) | `../11-BOE-Budget-Books/FY24-Administrative-Budget-Book.pdf` | Secondary source |
| FY2025 | `../11-BOE-Budget-Books/FY25-BOE-Budget-Book.pdf` | VERIFIED via history tables |
| FY2025 (Proposed) | `../11-BOE-Budget-Books/FY25-Superintendent-s-Proposed-Budget-Book.pdf` | Reference — shows proposed vs. approved |
| FY2026 | `../11-BOE-Budget-Books/FY26-BOE-Budget-Book.pdf` | VERIFIED — primary book + history tables |
| FY2026 (Proposed) | `../11-BOE-Budget-Books/FY26-Superintendent-s-Proposed-Budget-Book.pdf` | Reference |
| FY2027 | `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf` | VERIFIED — primary source for FY27 figures + history tables for FY22–FY26 |
| FY2027 (Town) | `../01-Budget/FY2027-BOS-Recommended-Budget-Book.pdf` | VERIFIED — town-side budget including mill rate |

**Key verification chain:** The FY27 budget book (page 3) contains a "Past BOE Approved Operating Budgets" table listing exact dollar amounts for FY22–FY26. The FY26 book contains the same table for FY21–FY25. These history tables are the cross-reference that caught the original errors in data.js (see FACT-CHECK-REPORT.md, Step 2).

### 1.2 Tax Bills — Primary Sources

These are John Bazyk's actual property tax bills for 82 Harmony Hill Road, Parcel 06500082. They are the authoritative source for all tax bill figures displayed on Tab 4 (Property Taxes).

| Grand List Year | Local File Path | Figures in Filename |
|---|---|---|
| GL2020 (FY22) | `../02-Tax-Bills/Tax-Bill-GL2020-FY22-9380.92.pdf` | $9,380.92 |
| GL2021 (FY23) | `../02-Tax-Bills/Tax-Bill-GL2021-FY23-9804.26.pdf` | $9,804.26 |
| GL2022 (FY24) | `../02-Tax-Bills/Tax-Bill-GL2022-FY24-10185.50.pdf` | $10,185.50 |
| GL2023 (FY25) | `../02-Tax-Bills/Tax-Bill-GL2023-FY25-10517.52.pdf` | $10,517.52 |

**Note:** The filenames encode the verified amounts. These match data.js exactly. When verifying, read the actual PDF to confirm assessment value and mill rate — not just the total.

### 1.3 School Climate — Primary Sources

| Document | Local File Path | Content |
|---|---|---|
| Climate Presentation (Dec 2025) | `../17-School-Climate/2025-12-03_School-Climate.pdf` | Verified bullying counts by school, climate survey results, PA 23-167 changes |
| Bullying Form | `../17-School-Climate/Bullying-5131.911-Form.pdf` | Official bullying complaint form |
| GMMS Climate Improvement Plan | `../17-School-Climate/GMMS-School-Climate-Improvement-Plan-25.pdf` | School-level climate plan |
| Kelly Lane Climate Plan | `../17-School-Climate/Kelly-Lane-School-Climate-Improvement-Plan-2025.pdf` | School-level climate plan |
| District Climate Plan (2018) | `../17-School-Climate/District-Climate-Plan-2018.pdf` | Historical baseline |
| CT Climate Guidance | `../17-School-Climate/connecticut-school-climate-guidance.pdf` | State-level reference |

**Critical for Tab 6:** The `2025-12-03_School-Climate.pdf` is the primary source for all bullying incident counts and climate survey percentages. The climate survey percentages in data.js are marked `isEstimate: true` because they were read from a bar chart, not from a data table. If the district publishes exact survey numbers, they should replace these estimates.

### 1.4 Budget Presentations — Secondary Sources

These support and contextualize the budget book data. They are useful for verifying claims in the Fact-Check tab and for understanding year-over-year narratives.

| Date | Local File Path |
|---|---|
| 2020-03-04 | `../12-BOE-Budget-Presentations/2020-03-04_FY21-Administrative-Budget-Presentation.pdf` |
| 2021-03-03 | `../12-BOE-Budget-Presentations/2021-03-03_FY22-Administrative-Budget-Presentation.pdf` |
| 2022-03-02 | `../12-BOE-Budget-Presentations/2022-03-02_FY23-Administrative-Budget-Presentation.pdf` |
| 2023-03-01 | `../12-BOE-Budget-Presentations/2023-03-01_FY24-Administrative-Budget-Presentation.pdf` |
| 2024-03-25 | `../12-BOE-Budget-Presentations/2024-03-25_BOE-Presentation-to-BOF.pdf` |
| 2025-03-19 | `../12-BOE-Budget-Presentations/2025-03-19_BOE-Budget-Presentation.pdf` |
| 2026-01-07 | `../12-BOE-Budget-Presentations/2026-01-07_FY27-Proposed-Budget-Boe.pdf` |
| 2026-03-04 | `../12-BOE-Budget-Presentations/2026-03-04_FY27-Proposed-Budget-Boe.pdf` |
| 2026-03-11 | `../12-BOE-Budget-Presentations/2026-03-11_FY27-Proposed-Budget-Boe.pdf` |
| 2026-04-01 | `../12-BOE-Budget-Presentations/2026-04-01_BOE-mtg-Reduction-ot-Budget.pdf` |

### 1.5 Enrollment Projections

| Document | Local File Path |
|---|---|
| 2025 Executive Summary | `../20-Enrollment-Projections/Granby-Enrollment-Projections-2025-Executive-Summary.pdf` |

### 1.6 School Profiles & Academic Data

| Document | Local File Path | Content |
|---|---|---|
| 2024 State Testing Report | `../16-School-Profiles/Granby-Summative-State-Testing-Report-Presentation-2024.pdf` | SAT benchmarks, proficiency data |
| 2024 Testing Summary | `../16-School-Profiles/GranbySummative-State-Testing-Report-Summary-2024.pdf` | Summary version |
| District Profile 2023 | `../16-School-Profiles/Granby-Public-Schools-District-Profile-Repor.pdf` | District-level overview |
| GMHS Report 2025 | `../16-School-Profiles/GMHS-Report-2025.pdf` | High school–specific data |
| GMMS Report 2025 | `../16-School-Profiles/GMMS-Report-2025.pdf` | Middle school–specific data |
| Kelly Lane Report 2025 | `../16-School-Profiles/Kelly-Lane-Report-2025.pdf` | Primary school–specific data |
| Wells Road Report 2025 | `../16-School-Profiles/Wells-Road-Report-2025.pdf` | Intermediate school–specific data |

### 1.7 Finance Subcommittee Records

The `../14-Finance-Subcommittee/` folder contains 100+ Finance Subcommittee meeting packets and approved minutes from 2019 through 2025. These are relevant for verifying claims about budget deliberations, spending breakdowns, and financial oversight.

### 1.8 BOE Meeting Minutes

The `../08-BOE-Meeting-Minutes/` folder contains approved minutes from 2018 forward. The `../03-BOE-Minutes/` folder may contain additional minutes. These are relevant for verifying timeline events on Tab 6 (School Climate) and for any claims about what was or was not discussed at public meetings.

### 1.9 Plus-One Budget Memos

The `../21-Plus-One-Budget/` folder contains Plus-One budget memos for FY21 through FY27 and associated presentations. These document what each additional 1% of budget funding would cover — useful context for the Budget Analysis tab.

### 1.10 Deep-Dive Spreadsheet

| Document | Local File Path | Content |
|---|---|---|
| Budget deep dive | `../Granby-Budget-Deep-Dive-FY20-FY27.xlsx` | Multi-year analysis spreadsheet |

### 1.11 External Sources (Internet Required)

The following data points have NO local source file. They require internet verification. Claude Code should verify these via web fetch and clearly label the verification date:

| Data Point | Source | Why No Local File |
|---|---|---|
| District ranking (#46) | SchoolDigger.com | Live website, updates periodically |
| Math proficiency trends | CT EdSight | Live state data portal |
| SAT benchmarks | CT EdSight | Live state data portal |
| Peer comparison (per-pupil, ranks) | NCEP Report + SchoolDigger | PDF available at CT.gov but rankings are live |
| Demographic data (population, age) | U.S. Census ACS | Live data portal |
| Housing values (ZHVI) | Zillow | Live website, updates monthly |
| 2013 #4 ranking | PublicSchoolReview.com | Historical reference, live website |

**For these sources:** Verify if possible, but if the URL is inaccessible (403, JS-rendered, wrong redirect), mark the data point as `UNVERIFIABLE-EXTERNAL` and note the date of the attempt. Do NOT change the data based on a failed web fetch. Only change data when you can confirm the correct value from a reachable source.

---

## 2. Repo Housekeeping

### 2.1 Archive Spent Prompt Files

The following markdown files in the repo root are one-time prompts that have been executed. They should be moved to `archive/build-prompts/` to declutter the working directory.

```
mkdir -p archive/build-prompts
mv DEPLOY-PROMPT.md archive/build-prompts/
mv FACT-CHECK-PROMPT.md archive/build-prompts/
mv OVERHAUL-PROMPT.md archive/build-prompts/
mv PRE-DEPLOY-FIX-PROMPT.md archive/build-prompts/
mv FULL-UPDATE-PROMPT.md archive/build-prompts/
mv ENHANCEMENT-PROMPT.md archive/build-prompts/
```

### 2.2 Files to KEEP in Root

| File | Purpose |
|---|---|
| `CLAUDE.md` | Canonical project reference. Must be updated (see 2.3). |
| `README.md` | Public GitHub project description. |
| `FACT-CHECK-REPORT.md` | Evidence of verification work (April 3, 2026). |
| `QA-AUDIT-RESULTS.md` | Evidence of quality assurance (April 3, 2026). |
| `VISUAL-QA-CHECKLIST.md` | Manual QA reference. Keep until Phase 1 automation replaces it. |
| `SITE-UPDATE-SPEC.md` | This file. |
| `LICENSE` | MIT license. |

### 2.3 Update CLAUDE.md

The following are stale in the current CLAUDE.md and must be corrected:

- **Line 30:** Live site URL is `https://courageous-babka-ef216d.netlify.app` → change to `https://thetownisus.netlify.app`
- **Color palette table:** Still references `navy`, `steel`, `gray-bg` → update to current `granby-maroon (#8C1D40)`, `granby-gold (#D4A843)`, `alert-red (#c0392b)`, `warm-bg`
- **Project structure:** Add `archive/`, `netlify/functions/`, `ChatWidget.jsx` to the tree
- **Tab names:** Update "Property Tax Ratchet" → "Property Taxes", "Demographics & Housing" → "Town & Housing Data"

### 2.4 Verify .gitignore Coverage

Confirm the following are NOT tracked in git: `.DS_Store`, `node_modules/`, `build/`, `qa-reports/`, `data-audit/`. Add any missing entries.

---

## 3. Known Fixes — Existing Issues from QA and Fact-Check Reports

These were identified in FACT-CHECK-REPORT.md and QA-AUDIT-RESULTS.md. Fix before adding new features.

### 3.1 Broken Source Link: PA 23-167

- **File:** `src/data/sources.js`, key `PA_23_167`
- **Issue:** URL returns SSL error / 404. The `url` field points to a PDF that is not resolving.
- **Fix:** Navigate to https://www.cga.ct.gov and search for "Public Act 23-167" to find the current URL. Update `sources.js`. If the state has removed the PDF, use the Wayback Machine URL or link to the bill status page.
- **Verify:** Click the new URL in a browser. Confirm it loads.
- **Risk:** LOW — URL replacement only.

### 3.2 Zillow URLs for Simsbury and Suffield

- **File:** `src/data/sources.js`, keys `ZILLOW_SIMSBURY` and `ZILLOW_SUFFIELD`
- **Issue:** FACT-CHECK-REPORT (Step 1) confirms these URLs redirect to wrong towns (Lengby MN, Streetsboro OH).
- **Fix:** Navigate to Zillow.com manually. Search "Simsbury CT home values" and "Suffield CT home values." Copy the correct ZHVI page URLs. Update `sources.js`.
- **Also verify:** The ZHVI dollar figures in `data.js` → `HOUSING_DATA.values`. The current figures ($448,920 Simsbury, $418,677 Suffield, $392,291 Granby) predate the Zillow URL breakage. They may be stale. If current Zillow values differ, update the figures AND the `asOf` date.
- **Risk:** MEDIUM — involves changing displayed dollar amounts.
- **Human checkpoint:** Confirm the new URLs and the new dollar amounts yourself before deploying.

### 3.3 Verify FY2021–FY2025 Budget Corrections Were Applied

- **File:** `src/data/data.js`, `BUDGET_DATA.years`
- **Issue:** FACT-CHECK-REPORT (Step 2) documented major corrections: FY2021 was $32,500,000 → $32,043,750, FY2022 was $34,200,000 → $33,183,506, FY2023 was $35,800,000 → $34,406,357, FY2024 was $37,100,000 → $36,155,291.
- **Action:** Read data.js and confirm the CORRECTED values are present. DO NOT re-correct if already done.
- **Verify against local source:** Open `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf`, navigate to the "Past BOE Approved Operating Budgets" table (page 3). Confirm at least 3 of the values match what's in data.js.
- **Risk:** HIGH if these corrections were reverted or lost. This is the core data.
- **Human checkpoint:** John must spot-check at least FY2023 and FY2025 against the PDF himself.

### 3.4 Scanned PDFs (FY2016–FY2020)

- **Files:** `../11-BOE-Budget-Books/FY2016-Approved-Budget.pdf` through `FY20-Board-of-Education-Budget-Book.pdf`
- **Issue:** These are image-based (scanned) PDFs. Text extraction fails. Budget and enrollment figures for these years are estimates in data.js marked `isEstimate: true`.
- **Options:**
  - **Option A (recommended):** Run OCR on each PDF using Tesseract, extract the budget total and enrollment figure, update data.js with verified values, remove `isEstimate: true`.
  - **Option B (safer but less complete):** Leave as estimates, ensure the dashboard clearly labels them with asterisks and a note explaining why.
  - **Option C (hybrid):** Use the enrollment figures from the FY27 book's enrollment history table (which goes back further than the budget history table) to verify enrollment. Leave budgets as estimates for years not in any history table.
- **OCR command (for Option A):**
  ```bash
  # Install Tesseract if needed
  brew install tesseract

  # Convert PDF pages to images, then OCR
  # For each FY2016-FY2020 budget book:
  pdftoppm -png "../11-BOE-Budget-Books/FY2016-Approved-Budget.pdf" /tmp/fy16
  tesseract /tmp/fy16-1.png /tmp/fy16-text
  # Then search the output for budget totals and enrollment
  ```
- **Risk:** MEDIUM — OCR can misread numbers. Every OCR-extracted figure must be visually confirmed by a human against the original PDF image.
- **Human checkpoint:** John opens each scanned PDF, reads the budget total with his own eyes, and confirms or corrects the OCR result.

---

## 4. Data Verification Audit (Phase 2)

This is the core of the spec. Every data point on the dashboard must be verified against a local source document or explicitly marked as unverifiable.

### 4.1 Verification Protocol

For each data point in `src/data/data.js`:

1. **Identify the local source file** from Section 1 above.
2. **Open the PDF** and locate the specific page, table, or chart containing the figure.
3. **Record:** the page number, the exact figure in the source, and whether it matches data.js.
4. **Status codes:**
   - `✅ MATCH` — data.js value matches source exactly
   - `✅ CORRECTED` — data.js was wrong, now fixed (log old and new values)
   - `⚠️ ESTIMATE` — value is approximate; source is a chart/image, not a table; clearly labeled
   - `⚠️ OCR` — value extracted via OCR from scanned PDF; visually confirmed by human
   - `❌ MISMATCH` — data.js does not match source; MUST be fixed before deploy
   - `📄 UNVERIFIABLE-LOCAL` — local PDF exists but figure cannot be extracted (scanned, garbled)
   - `🌐 UNVERIFIABLE-EXTERNAL` — no local source; internet source inaccessible
5. **Output:** Save the verification log to `data-audit/verification-log.md`

### 4.2 Budget Data Verification Matrix

Each row is a data point in `BUDGET_DATA.years`. Claude Code must verify each against the specified local file.

| data.js Key | FY | Field | Current Value | Verify Against | Page/Table |
|---|---|---|---|---|---|
| years[0] | FY2016 | boeBudget | $28,435,000 | `../11-BOE-Budget-Books/FY2016-Approved-Budget.pdf` | Find "Total Operating Budget" or equivalent (OCR required) |
| years[0] | FY2016 | enrollment | 2,050 | `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf` | Enrollment history table — check if FY16 is listed |
| years[1] | FY2017 | boeBudget | $29,100,000 | `../11-BOE-Budget-Books/FY2017-Approved-Budget.pdf` | OCR required |
| years[1] | FY2017 | enrollment | 1,980 | FY27 book enrollment table | Check if FY17 is listed |
| years[2] | FY2018 | boeBudget | $29,800,000 | `../11-BOE-Budget-Books/FY2018-Approved-Budget.pdf` | OCR required |
| years[2] | FY2018 | enrollment | 1,920 | FY27 book enrollment table | Check if FY17 is listed |
| years[3] | FY2019 | boeBudget | $30,200,000 | `../11-BOE-Budget-Books/FY19-BOE-Budget-Book.pdf` | OCR required |
| years[3] | FY2019 | enrollment | 1,870 | FY27 book enrollment table | Check if FY19 is listed |
| years[4] | FY2020 | boeBudget | $31,100,000 | `../11-BOE-Budget-Books/FY20-Board-of-Education-Budget-Book.pdf` | OCR required |
| years[4] | FY2020 | enrollment | 1,799 | FY27 book enrollment table | VERIFIED previously |
| years[5] | FY2021 | boeBudget | $32,043,750 | `../11-BOE-Budget-Books/FY26-BOE-Budget-Book.pdf` | History table |
| years[5] | FY2021 | enrollment | 1,729 | FY27 book enrollment table | VERIFIED |
| years[6] | FY2022 | boeBudget | $33,183,506 | `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf` | Page 3 history table |
| years[6] | FY2022 | enrollment | 1,765 | FY27 book enrollment table | VERIFIED |
| years[7] | FY2023 | boeBudget | $34,406,357 | FY27 book history table | Page 3 |
| years[7] | FY2023 | enrollment | 1,738 | FY27 book enrollment table | VERIFIED |
| years[8] | FY2024 | boeBudget | $36,155,291 | FY27 book history table + `../11-BOE-Budget-Books/FY24-BOE-Budget-Book-Rev.pdf` | Cross-reference |
| years[8] | FY2024 | enrollment | 1,742 | FY27 book enrollment table | VERIFIED |
| years[9] | FY2025 | boeBudget | $38,118,521 | FY27 book history table | Page 3 |
| years[9] | FY2025 | enrollment | 1,709 | FY27 book enrollment table | VERIFIED |
| years[10] | FY2026 | boeBudget | $39,418,142 | `../11-BOE-Budget-Books/FY26-BOE-Budget-Book.pdf` | Primary source |
| years[10] | FY2026 | enrollment | 1,675 | FY27 book enrollment table | VERIFIED |
| years[11] | FY2027 | boeBudget | $40,916,434 | `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf` | Proposed total |
| years[11] | FY2027 | enrollment | 1,648 | FY27 book enrollment table | Projected |

### 4.3 Tax Bill Verification Matrix

| data.js Key | Year | Field | Current Value | Verify Against |
|---|---|---|---|---|
| bills[0] | GL2020 (FY22) | assessment | $234,640 | `../02-Tax-Bills/Tax-Bill-GL2020-FY22-9380.92.pdf` |
| bills[0] | GL2020 (FY22) | millRate | 39.98 | Same PDF |
| bills[0] | GL2020 (FY22) | tax | $9,380.92 | Same PDF (also in filename) |
| bills[1] | GL2021 (FY23) | assessment | $307,440 | `../02-Tax-Bills/Tax-Bill-GL2021-FY23-9804.26.pdf` |
| bills[1] | GL2021 (FY23) | millRate | 31.89 | Same PDF |
| bills[1] | GL2021 (FY23) | tax | $9,804.26 | Same PDF |
| bills[2] | GL2022 (FY24) | assessment | $307,440 | `../02-Tax-Bills/Tax-Bill-GL2022-FY24-10185.50.pdf` |
| bills[2] | GL2022 (FY24) | millRate | 33.13 | Same PDF |
| bills[2] | GL2022 (FY24) | tax | $10,185.50 | Same PDF |
| bills[3] | GL2023 (FY25) | assessment | $307,440 | `../02-Tax-Bills/Tax-Bill-GL2023-FY25-10517.52.pdf` |
| bills[3] | GL2023 (FY25) | millRate | 34.21 | Same PDF |
| bills[3] | GL2023 (FY25) | tax | $10,517.52 | Same PDF |

### 4.4 School Climate Verification Matrix

| data.js Key | Field | Current Value | Verify Against |
|---|---|---|---|
| BULLYING_DATA.verifiedIncidents (all years) | per-school counts | See data.js | `../17-School-Climate/2025-12-03_School-Climate.pdf` — bullying data table/chart |
| BULLYING_DATA.climateSurvey.gmhs | safety % | 87% | Same PDF — bar chart (page 2). ESTIMATE. |
| BULLYING_DATA.climateSurvey.gmms | safety % | 76% | Same PDF. ESTIMATE. |
| BULLYING_DATA.climateSurvey.wellsRoad | safety % | 93% | Same PDF. ESTIMATE. |
| BULLYING_DATA.climateSurvey.kellyLane | safety % | 93% | Same PDF. ESTIMATE. |

**Note on climate survey:** The percentages are read from a bar chart, not a data table. They are inherently approximate. If the district ever publishes exact survey results, replace these estimates.

### 4.5 Budget Composition Verification

| data.js Key | Category | Current % | Verify Against |
|---|---|---|---|
| BUDGET_COMPOSITION.categories[0] | Salaries & Wages | 56.43% | `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf` — Operating Budget Summary pie chart |
| BUDGET_COMPOSITION.categories[1] | Employee Benefits | 17.10% | Same page |
| BUDGET_COMPOSITION.categories[2] | Purchased Services | 10.52% | Same page |
| BUDGET_COMPOSITION.categories[3] | Tuition (Out-of-District) | 7.71% | Same page |
| BUDGET_COMPOSITION.categories[4] | Maintenance & Utilities | 3.59% | Same page |
| BUDGET_COMPOSITION.categories[5] | Supplies/Books/Software | 3.24% | Same page |
| BUDGET_COMPOSITION.categories[6] | Activities/PD/Dues | 1.42% | Same page |

### 4.6 Academic Data Verification Matrix

Academic data comes primarily from external sources (CT EdSight, SchoolDigger, NCEP). Local sources exist for some data points.

| data.js Key | Field | Current Value | Local Source | External Source |
|---|---|---|---|---|
| districtRanking[0] | 2013 rank | #4 | None | PublicSchoolReview.com (VERIFIED in fact-check) |
| districtRanking[1] | 2018 rank | #25 | None | `isEstimate: true` — interpolated, no source |
| districtRanking[2] | 2020 rank | #35 | None | `isEstimate: true` — interpolated, no source |
| districtRanking[3] | 2023 rank | #46 | None | SchoolDigger.com |
| districtRanking[4] | 2025 rank | #46 | None | SchoolDigger.com |
| mathProficiency (all years) | pct | 64→54% | `../16-School-Profiles/Granby-Summative-State-Testing-Report-Presentation-2024.pdf` | CT EdSight |
| satBenchmarks2024.math | pct | 49.6% | `../16-School-Profiles/GranbySummative-State-Testing-Report-Summary-2024.pdf` | CT EdSight |
| satBenchmarks2024.ela | pct | 83.2% | Same | CT EdSight |
| satBenchmarks2024.science | pct | 75.9% | Same | CT EdSight |
| peerComparison (all rows) | perPupil, math, reading, rank | See data.js | None | NCEP Report (CT.gov PDF) + SchoolDigger |

**Note on district rankings:** The 2018 and 2020 values are interpolated estimates with no source at all. The spec should either (a) find actual historical SchoolDigger data, or (b) remove these data points and show only the confirmed years (2013, 2023, 2025). Displaying estimated rankings as if they were real is a credibility risk. Claude Code should flag this for John's decision.

### 4.7 Demographic & Housing Data Verification

Demographic data comes from the U.S. Census. There are no local source files. Housing data comes from Zillow.

| data.js Key | Current Value | Source | Local File? |
|---|---|---|---|
| DEMOGRAPHIC_DATA.population (all years) | See data.js | Census ACS | NO — verify at data.census.gov |
| DEMOGRAPHIC_DATA.ageDistribution (all) | All `isEstimate: true` | Census ACS | NO |
| DEMOGRAPHIC_DATA.ageTrends (all) | Mixed estimates | Census ACS | NO |
| HOUSING_DATA.values (Simsbury) | $448,920 | Zillow | NO — URL broken, figure unverified |
| HOUSING_DATA.values (Suffield) | $418,677 | Zillow | NO — URL broken, figure unverified |
| HOUSING_DATA.values (Granby) | $392,291 | Zillow | NO — verify at working Granby URL |

**Action required:** All demographic and housing figures are internet-only sources. Mark each with the verification date. For Zillow, the Simsbury and Suffield URLs must be fixed (see Section 3.2) and figures updated to current ZHVI values.

### 4.8 School Climate Timeline Verification

| data.js Key | Event | Date | Verify Against |
|---|---|---|---|
| SCHOOL_CLIMATE_TIMELINE[0] | Pride Video Incident | June 2023 | `../08-BOE-Meeting-Minutes/` — search for June/July 2023 minutes |
| SCHOOL_CLIMATE_TIMELINE[1] | Amanda Doe Lawsuit | Sept 2024 | Patch.com article (external — URL verified in fact-check) |
| SCHOOL_CLIMATE_TIMELINE[2] | Hot Mic Incident | Feb 2026 | `../08-BOE-Meeting-Minutes/` — search for Feb 2026 minutes or `../09-BOE-Meeting-Packets/` |

### 4.9 Executive Summary & Key Dates

| data.js Key | Content | Verify Against |
|---|---|---|
| EXECUTIVE_SUMMARY.heroStat | "Simsbury: $21,751, Granby: $21,748" | NCEP Report (external — CT.gov PDF) |
| EXECUTIVE_SUMMARY.correlations[0] | "budget grew 44%, enrollment dropped 20%" | Compute from BUDGET_DATA.years: FY2016 $28.4M → FY2027 $40.9M = 44%; enrollment 2050 → 1648 = 19.6% |
| EXECUTIVE_SUMMARY.correlations[2] | "math proficiency 64% → 54%" | ACADEMIC_DATA.mathProficiency array |
| EXECUTIVE_SUMMARY.correlations[3] | "#4 in 2013 → #46 today = 42-spot drop" | ACADEMIC_DATA.districtRanking array |
| EXECUTIVE_SUMMARY.correlations[4] | "tax bills rise even when rate drops" | TAX_BILLS.bills — FY23 mill rate dropped but bill increased |
| KEY_DATES.publicHearing | "April 6, 2026" | Verify against town meeting calendar or `../01-Budget/` |
| KEY_DATES.referendum | "April 20, 2026" | Same — verify these dates haven't changed |

**Note on KEY_DATES:** These are time-sensitive. As of April 4, 2026, the public hearing is in 2 days. After April 20 the referendum data is historical. The site may need a post-referendum update.

### 4.10 Fact-Check Claims Verification

The Fact-Check tab (Tab 7) responds to two Drummer newspaper articles. The articles themselves are internet sources (granbydrummer.com) — but the DATA used to rebut the claims is from local sources.

| Claim | Rebuttal Uses | Local Source for Rebuttal |
|---|---|---|
| Logan: "one of the lowest BOE increases in five years" | 44% growth FY16→FY27 | Budget books (Section 1.1) |
| Logan: "90% of kindergarten students at benchmark" | District-wide math proficiency 54% | `../16-School-Profiles/Granby-Summative-State-Testing-Report-Presentation-2024.pdf` + CT EdSight |
| Logan: "#17 on U.S. News" | District rank #46 on SchoolDigger | SchoolDigger (external) |
| Burke: "$21,748 per pupil below average" | Simsbury $21,751, ranks #12 | NCEP Report (external PDF at CT.gov) |
| Burke: "2.65% net impact on taxpayers" | Tax ratchet: mill rate down but bills up | `../02-Tax-Bills/` (Section 1.2) |
| Burke: "BEAR saved $700,000" | Unverified | `../11-BOE-Budget-Books/FY27-Budget-Book-Proposed-FY27-FINAL.pdf` — search for BEAR or transition academy |

---

## 5. New Site Features

### 5.1 Data Verification Tab (NEW — Tab 9)

- **File to create:** `src/components/DataVerification.jsx`
- **Add to:** `src/App.jsx` TABS array
- **Content:** Render the verification log from Section 4 as a public, searchable page
- **Display:** Total claims, counts by status, filterable table, methodology statement, "Last verified" date
- **Principle:** This tab IS the credibility claim. Every row must be accurate. Every source must be clickable.
- **Human checkpoint:** John reads every row before deploying.

### 5.2 Methodology Section (Executive Summary)

- **File:** `src/components/ExecutiveSummary.jsx`
- **Content:** Collapsible section explaining how data was gathered, organized (1,100+ documents), verified against source PDFs, and maintained. Written at 8th-grade reading level.
- **Key message:** "We used AI to organize and cross-check documents. The verification log is published. Click any citation to check it yourself."

### 5.3 "Last Verified" Footer

- **File:** `src/components/Layout.jsx` (footer, ~line 72)
- **Change:** Replace "Last updated: April 3, 2026" with:
  - "Data last verified: [date of Phase 2 audit]"
  - "Site last audited: [date of Phase 1 audit]"

### 5.4 Corrections Log

- **Location:** Section within the Data Verification tab, or a standalone section
- **Content:** Every correction ever made, with date, old value, new value, and source
- **Seed with:** The 13 corrections from FACT-CHECK-REPORT.md (April 3, 2026)

### 5.5 Submission Form Upgrade

- **File:** `src/components/SubmitData.jsx`
- **Add:** Category options for "FOIA Document" and "Correction"
- **Add:** Brief explanation of the gated review process
- **Do NOT add file upload** unless Netlify plan supports it (free tier: 100 submissions/month, no file uploads on free)

---

## 6. Automated QA Commands

### 6.1 Phase 1: Site Defense (`/qa-audit`)

- **Create:** `.claude/commands/qa-audit.md`
- **Content:** The full Phase 1 prompt from `PHASE-1-SITE-DEFENSE.md`
- **Runs:** Playwright-based audit of the live site
- **Output:** `qa-reports/SUMMARY.md` + screenshots
- **Frequency:** Before every deploy + weekly

### 6.2 Phase 2: Data Audit (`/data-audit`)

- **Create:** `.claude/commands/data-audit.md`
- **Content:** Adapted Phase 2 prompt that reads LOCAL PDFs first, web sources second
- **Critical difference from original Phase 2:** The original Phase 2 doc fetches URLs. This version reads `~/Desktop/Granby-Budget-Project/` PDFs. The verification matrix in Section 4 of this spec defines the exact file-to-data-point mapping.
- **Output:** `data-audit/verification-log.md` + `data-audit/AUDIT-SUMMARY.md`
- **Frequency:** After any data change + monthly

### 6.3 Phase 3: Citizen Pipeline

- **No automation.** This is a human-gated workflow.
- **Document:** Create `CITIZEN-PIPELINE-PROCESS.md` describing the steps from PHASE-3-CITIZEN-DATA-PIPELINE.md
- **Frequency:** As submissions arrive via Netlify Forms

---

## 7. Implementation Order

Each step is a self-contained unit. Complete one, review the result, deploy if appropriate, then proceed.

| # | Task | Section | Est. Time | Deploy? | Human Gate |
|---|------|---------|-----------|---------|-----------|
| 1 | Archive old prompt files | 2.1 | 10 min | Yes | Review archive folder |
| 2 | Update CLAUDE.md | 2.3 | 15 min | Yes | Read the changes |
| 3 | Fix PA 23-167 URL | 3.1 | 10 min | Yes | Click the link |
| 4 | Fix Zillow URLs + verify figures | 3.2 | 20 min | Yes | Visit each URL, confirm town |
| 5 | Verify budget corrections in data.js | 3.3 | 30 min | No deploy — verify only | Spot-check 3 values against FY27 PDF |
| 6 | Run Phase 2 budget audit against local PDFs | 4.2 | 1–2 hrs | No deploy — audit only | Review verification log |
| 7 | Run Phase 2 tax bill audit | 4.3 | 20 min | No deploy — audit only | Compare 4 bills to 4 PDFs |
| 8 | Run Phase 2 climate data audit | 4.4 | 30 min | No deploy — audit only | Review survey estimates |
| 9 | Run Phase 2 budget composition audit | 4.5 | 20 min | No deploy — audit only | Check pie chart in FY27 book |
| 10 | Attempt OCR on FY2016–FY2020 scanned PDFs | 3.4 | 1–2 hrs | No deploy | John visually confirms every OCR figure |
| 11 | Apply any corrections from audits 6–10 | 4.1 | 30 min | Yes — after ALL corrections reviewed | John approves final data.js |
| 12 | Add "Last Verified" to footer | 5.3 | 5 min | Yes | Quick read |
| 13 | Add Methodology section | 5.2 | 30 min | Yes | Read the text |
| 14 | Build Data Verification tab | 5.1 | 2–3 hrs | Yes | Read every row |
| 15 | Add Corrections log | 5.4 | 1 hr | Yes | Verify entries match FACT-CHECK-REPORT |
| 16 | Upgrade submission form | 5.5 | 20 min | Yes | Test the form |
| 17 | Create `/qa-audit` command | 6.1 | 15 min | No — dev tool | Run it once, review output |
| 18 | Create `/data-audit` command | 6.2 | 30 min | No — dev tool | Run it once, review output |
| 19 | Run Phase 1 site audit on final build | 6.1 | 30 min | Gating deploy | Fix any failures |
| 20 | Final deploy | — | 10 min | YES | John confirms live site |

**Total estimated time:** 10–14 hours across multiple sessions.

---

## 8. Safety Rules

1. **Local PDFs are the source of truth.** When a local PDF and an internet source disagree, flag it for human review. Do not auto-correct in either direction.
2. **No data changes without human review.** Claude Code may identify discrepancies. John approves every correction.
3. **No auto-publishing citizen submissions.** Every submission goes through the Phase 3 gated workflow.
4. **No "best guess" corrections.** If a figure cannot be confirmed from a source, label it `UNVERIFIABLE` — do not replace it with AI's estimate of what it should be.
5. **Audit before every deploy.** Phase 1 runs before every production deploy. No exceptions.
6. **Preserve all evidence.** FACT-CHECK-REPORT.md, QA-AUDIT-RESULTS.md, and all future audit logs stay in the repo permanently. Each new audit is date-stamped.
7. **One task at a time.** Each step in Section 7 is a separate Claude Code session. Do not combine steps. This prevents cascading errors.
8. **If in doubt, stop and ask.** Claude Code should ask the human rather than guess, especially on any data point that will be displayed publicly.

---

## 9. Files This Spec Expects to Create

| File | Purpose |
|---|---|
| `archive/build-prompts/` | Folder for archived one-time prompts |
| `src/components/DataVerification.jsx` | New Tab 9: public verification log |
| `.claude/commands/qa-audit.md` | Phase 1 slash command for Claude Code |
| `.claude/commands/data-audit.md` | Phase 2 slash command for Claude Code |
| `qa-reports/` | Output folder for Phase 1 audits (add to .gitignore) |
| `data-audit/` | Output folder for Phase 2 audits (add to .gitignore) |
| `CITIZEN-PIPELINE-PROCESS.md` | Phase 3 workflow documentation |

---

## 10. Reference Files

The following files contain the detailed technical prompts and implementation instructions for each phase. This spec defines WHAT to do and in WHAT ORDER. These files define HOW.

| File | Contains |
|---|---|
| `PHASE-1-SITE-DEFENSE.md` | Playwright audit prompts, screenshot methodology, security header checks |
| `PHASE-2-DATA-ACCURACY-AUDIT.md` | Claim extraction prompts, verification workflow, status codes |
| `PHASE-3-CITIZEN-DATA-PIPELINE.md` | Submission handling, PDF conversion, gated review process |
| `FACT-CHECK-REPORT.md` | Results of the April 3, 2026 verification pass (13 corrections documented) |
| `QA-AUDIT-RESULTS.md` | Results of the April 3, 2026 site audit |

---

*This specification is designed to be executed by Claude Code under human supervision. No step produces a public-facing change without explicit human approval. The goal is a civic data platform where every number is traceable to a document that any Granby resident can read with their own eyes.*
