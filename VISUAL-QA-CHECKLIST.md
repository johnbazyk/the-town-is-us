# Granby Accountability Dashboard — Visual QA Checklist

Use this checklist after any code changes to verify the dashboard renders correctly at http://localhost:5173/. Open the dev server (`npm run dev`) and walk through each tab.

---

## Global Checks (All Tabs)

- [ ] Header bar is **maroon** (#8C1D40), not navy/dark blue
- [ ] Active tab has a **gold underline** (#D4A843), not blue
- [ ] Inactive tabs have no leftover navy/steel/gray coloring
- [ ] All tab nav buttons are at least 44px tall (easy to tap)
- [ ] No leftover "navy", "steel", or gray-bg anywhere in the UI
- [ ] Base font size is 18px (text should look noticeably larger than default 16px)
- [ ] Skip-to-content link appears on Tab key press (screen reader accessible)
- [ ] Estimate markers (*) appear next to FY2016–FY2020 budget figures wherever shown

---

## Tab 1 — Executive Summary

- [ ] Gold-background callout box at top: **"What This Means in Plain English"**
- [ ] Thesis paragraphs are in plain, accessible language (no jargon)
- [ ] No "Prove us wrong" text anywhere — replaced with "See something that doesn't look right? We'd love to hear from you"
- [ ] Maroon numbered circles on the 5 key correlations
- [ ] "Cost Per Student" label (not "Per Pupil" or "Per-Pupil Expenditure")
- [ ] "Key Finding" callout box present
- [ ] "About This Dashboard" footer callout present

---

## Tab 2 — Budget Analysis

- [ ] **"What's a Mill Rate?"** gold callout box visible
- [ ] **"Why Costs Don't Go Down When Enrollment Drops"** explainer present
- [ ] Main chart title: **"The School Budget Grew While Student Numbers Fell"**
- [ ] Column header says **"Cost Per Student"** (not "Per Pupil")
- [ ] Column header says **"Tax Rate (per $1,000)"** (not "Mill Rate")
- [ ] Column header says **"Year"** (not "FY")
- [ ] Scissors/divergence chart: **maroon line** for budget, **red dashed** for enrollment
- [ ] Chart.js bars/lines use maroon (#8C1D40), gold (#D4A843), alert red (#c0392b) — no blue/navy
- [ ] FY2016–FY2020 rows show asterisk (*) estimate markers

---

## Tab 3 — Academic Performance

- [ ] **"What Does 'Proficiency' Mean?"** gold callout box visible
- [ ] Chart title: **"Granby's State Ranking Dropped from #4 to #46 in 12 Years"**
- [ ] "Cost Per Student" terminology throughout (not "Per Pupil")
- [ ] Chart colors are maroon/gold/red — no navy/blue
- [ ] 2018 and 2020 ranking data points show estimate markers (*)

---

## Tab 4 — Property Taxes

- [ ] Tab label reads **"Property Taxes"** (not old name)
- [ ] Section title: **"How Property Taxes Work — and Why They Keep Going Up"**
- [ ] **"How the Ratchet Works"** explainer box present
- [ ] Table headers: Year, Home Assessment, **Tax Rate (per $1,000)**, Tax Bill
- [ ] Summary stats callout boxes (3 stat boxes) visible
- [ ] Chart colors: maroon/gold/red palette
- [ ] FY2016–FY2021 footnote about estimates present

---

## Tab 5 — Town & Housing Data

- [ ] Tab label reads **"Town & Housing Data"** (not old name)
- [ ] **ZHVI definition box** visible (explains Zillow Home Value Index)
- [ ] **"Why Demographics Matter for the Budget"** explainer present
- [ ] Age distribution chart colors: maroon = kids, gold = working age, red = retirement age
- [ ] No navy/blue/steel colors in any chart

---

## Tab 6 — School Climate

- [ ] Intro paragraph visible at top of tab
- [ ] Timeline entries written in **plain English** (3+ sentences each)
- [ ] Amanda Doe entry is factual, measured (3 sentences, notes case is ongoing, no finding of liability)
- [ ] Hot Mic incident described factually with context
- [ ] Chart colors use gold (#D4A843) — no navy/blue

---

## Tab 7 — Fact-Check

- [ ] **"How We Rate Claims"** methodology explainer at top
- [ ] Verdict labels are verbose/descriptive: e.g., "Partly True — But Missing Key Details"
- [ ] Article headers are in **maroon** (not dark navy)
- [ ] Claim boxes have red-tinted background with red border

---

## Tab 8 — Submit Data

- [ ] Button says **"Send Feedback"** (not "Submit" or old label)
- [ ] Reassurance line below button: **"We read every submission..."**
- [ ] Form fields are functional and accessible

---

## WCAG / Accessibility Spot Checks

- [ ] White text on maroon background has ≥ 4.5:1 contrast ratio (target: 8.9:1)
- [ ] No white text on gold backgrounds anywhere
- [ ] Every Chart.js canvas has `role="img"` and descriptive `aria-label`
- [ ] All SourceCitation badge links have `aria-label` attributes
- [ ] Active tab button has `aria-current="page"`

---

## How to Use This File with Claude Code

When running Claude Code on this project, include this instruction:

```
After making changes to the dashboard, run `npm run build` to verify zero errors,
then start the dev server with `npm run dev` and walk through VISUAL-QA-CHECKLIST.md
tab by tab. Report any items that don't pass.
```

For automated visual testing, consider using Playwright or Puppeteer to screenshot each tab and compare against reference images.
