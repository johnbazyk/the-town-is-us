/**
 * Granby Accountability Dashboard — All Data
 * ============================================
 * Fact-checked April 3, 2026 against source PDFs.
 * Every object includes a 'source' key referencing SOURCES (see sources.js).
 *
 * IMPORTANT: Figures marked with isEstimate: true are APPROXIMATIONS
 * that need verification from the original BOE budget books (Granby Public Schools).
 * Display these with an asterisk (*) in the UI.
 *
 * VERIFICATION STATUS (April 3, 2026):
 *  - FY2016-FY2020: Budget totals verified April 4, 2026 from Budget Summary pages in each
 *    year's scanned BOE budget book. Enrollment verified from enrollment history tables in
 *    later budget books (FY2016-FY2019) and the FY27 actuals table (FY2020). isEstimate removed.
 *  - FY2021: Budget verified from history tables in FY26+FY27 books. Enrollment from FY27
 *    actuals table.
 *  - FY2022-FY2027: All budget totals confirmed from primary budget books or history tables.
 *    All enrollment figures confirmed from the FY27 enrollment actuals table.
 *    Previous values for FY2022-FY2025 were significantly wrong (see FACT-CHECK-REPORT.md).
 */

// ─── BUDGET DATA ────────────────────────────────────────────────
export const BUDGET_DATA = {
  years: [
    // FY2016-FY2020: Verified April 4, 2026 from Budget Summary pages in each year's scanned BOE
    // budget book. Budget totals cross-confirmed via prior-year columns in consecutive books.
    // Enrollment: FY2016-FY2017 actuals from FY2018 book enrollment history table;
    // FY2018 actual from FY2020 book enrollment history table; FY2019 from FY2020 book table.
    // FY2020 enrollment unchanged — FY27 actuals table (1,799) is more authoritative than
    // the FY20 book projection (1,819).
    { fy: "FY2016", boeBudget: 28718507, enrollment: 1953, millRate: null, source: "FY2016_BUDGET_BOOK" },
    { fy: "FY2017", boeBudget: 28432636, enrollment: 1874, millRate: null, source: "FY2017_BUDGET_BOOK" },
    { fy: "FY2018", boeBudget: 28656152, enrollment: 1862, millRate: null, source: "FY2018_BUDGET_BOOK" },
    { fy: "FY2019", boeBudget: 29654842, enrollment: 1863, millRate: null, source: "FY2019_BUDGET_BOOK" },
    { fy: "FY2020", boeBudget: 31134620, enrollment: 1799, millRate: null, source: "FY2020_BUDGET_BOOK" },
    // FY2021: Budget verified from history tables in FY26+FY27 books. Enrollment from FY27 actuals table.
    { fy: "FY2021", boeBudget: 32043750, enrollment: 1729, millRate: null, source: "FY2022_BUDGET_BOOK" },
    // FY2022-FY2027: All budget totals and enrollments verified from primary source PDFs.
    { fy: "FY2022", boeBudget: 33183506, enrollment: 1765, millRate: 39.98, source: "FY2022_BUDGET_BOOK" },
    { fy: "FY2023", boeBudget: 34406357, enrollment: 1738, millRate: 31.89, source: "FY2023_BUDGET_BOOK" },
    { fy: "FY2024", boeBudget: 36155291, enrollment: 1742, millRate: 33.13, source: "FY2024_BUDGET_BOOK" },
    { fy: "FY2025", boeBudget: 38118521, enrollment: 1709, millRate: 34.21, source: "FY2025_BUDGET_BOOK" },
    { fy: "FY2026", boeBudget: 39418142, enrollment: 1675, millRate: 34.21, source: "FY2026_BUDGET_BOOK" },
    { fy: "FY2027", boeBudget: 40916434, enrollment: 1648, millRate: 35.19, source: "FY27_TOWN_BUDGET", isProjected: true },
  ],
  note: "FY2016-FY2020 budget totals verified April 4, 2026 from Budget Summary pages in each year's scanned BOE budget book, cross-confirmed via prior-year columns in consecutive books. FY2016-FY2019 enrollment from enrollment history tables in later budget books. FY2020-FY2027 enrollment from the 'Granby Public Schools Enrollment Numbers' actuals table in the FY27 budget book. FY2021-FY2027 budgets verified from the 'Past BOE Approved Operating Budgets' history table in the FY26 and FY27 budget books.",
  source: "FY27_TOWN_BUDGET",
};

// ─── TAX BILL DATA ──────────────────────────────────────────────
export const TAX_BILLS = {
  bills: [
    { year: "GL2020 (FY22)", assessment: 234640, millRate: 39.98, tax: 9380.92, source: "TAX_BILLS" },
    { year: "GL2021 (FY23)", assessment: 307440, millRate: 31.89, tax: 9804.26, source: "TAX_BILLS" },
    { year: "GL2022 (FY24)", assessment: 307440, millRate: 33.13, tax: 10185.50, source: "TAX_BILLS" },
    { year: "GL2023 (FY25)", assessment: 307440, millRate: 34.21, tax: 10517.52, source: "TAX_BILLS" },
  ],
  property: "82 Harmony Hill Road, Parcel 06500082",
  ratchetExplanation: "In FY23, the property was reassessed: value jumped 31% ($234,640 → $307,440). The mill rate dropped 20% (39.98 → 31.89). But the tax bill STILL increased by $423. This is the ratchet — assessments go up more than mill rates come down, so the net bill always rises.",
  source: "TAX_BILLS",
};

// ─── ACADEMIC PERFORMANCE DATA ──────────────────────────────────
export const ACADEMIC_DATA = {
  districtRanking: [
    { year: 2013, rank: 4, totalDistricts: 156, source: "PUBLIC_SCHOOL_REVIEW" },
    { year: 2018, rank: 25, totalDistricts: 156, source: "SCHOOLDIGGER", isEstimate: true, note: "approximate interpolation" }, // UNVERIFIED — interpolated between known years
    { year: 2020, rank: 35, totalDistricts: 156, source: "SCHOOLDIGGER", isEstimate: true, note: "approximate interpolation" }, // UNVERIFIED — interpolated between known years
    { year: 2023, rank: 46, totalDistricts: 156, source: "SCHOOLDIGGER" },
    { year: 2025, rank: 46, totalDistricts: 156, source: "SCHOOLDIGGER" },
  ],
  mathProficiency: [
    { year: "2016-17", pct: 64, source: "CT_EDSIGHT" },
    { year: "2017-18", pct: 60, source: "CT_EDSIGHT" },
    { year: "2018-19", pct: 58, source: "CT_EDSIGHT" },
    { year: "2021-22", pct: 50, source: "CT_EDSIGHT", note: "Post-COVID" },
    { year: "2022-23", pct: 54, source: "CT_EDSIGHT" },
  ],
  satBenchmarks2024: {
    math: { pct: 49.6, source: "CT_EDSIGHT" },
    ela: { pct: 83.2, source: "CT_EDSIGHT" },
    science: { pct: 75.9, source: "CT_EDSIGHT" },
  },
  peerComparison: [
    { district: "Avon", perPupil: 21637, math: 70, reading: 78, rank: 5, source: "NCEP_2026" },
    { district: "Farmington", perPupil: 20726, math: 68, reading: 75, rank: 8, source: "NCEP_2026" },
    { district: "Simsbury", perPupil: 21751, math: 66, reading: 76, rank: 12, source: "NCEP_2026" },
    { district: "Granby", perPupil: 21748, math: 54, reading: 66, rank: 46, source: "NCEP_2026", highlight: true },
    { district: "Suffield", perPupil: 21164, math: 59, reading: 65, rank: 35, source: "NCEP_2026" },
  ],
  note: "Ranking data for 2018 and 2020 are approximate interpolations. The 2013 #4 ranking is from Public School Review. The 2023/2025 #46 ranking is from SchoolDigger.",
};

// ─── BULLYING & SCHOOL CLIMATE DATA ─────────────────────────────
export const BULLYING_DATA = {
  verifiedIncidents: [
    { year: "2020-21", kellyLane: 0, wellsRoad: 0, gmms: 0, gmhs: 0, total: 0 },
    { year: "2021-22", kellyLane: 0, wellsRoad: 0, gmms: 3, gmhs: 1, total: 4 },
    { year: "2022-23", kellyLane: 0, wellsRoad: 2, gmms: 2, gmhs: 3, total: 7 },
    { year: "2023-24", kellyLane: 0, wellsRoad: 2, gmms: 1, gmhs: 6, total: 9 },
    { year: "2024-25", kellyLane: 0, wellsRoad: 0, gmms: 4, gmhs: 3, total: 7 },
  ],
  climateSurvey: {
    question: "My child is physically and emotionally safe at school",
    gmhs: 87,
    gmms: 76,
    wellsRoad: 93,
    kellyLane: 93,
    source: "CLIMATE_DEC2025",
    note: "Percentages are approximate readings from the bar chart in the Dec 3, 2025 presentation (page 2). Updated April 3, 2026 after re-reading the PDF chart: GMHS ~87%, GMMS ~76%, Wells Road ~93%, Kelly Lane ~93%. Exact figures should be verified from full survey data if published.",
    isEstimate: true,
  },
  source: "CLIMATE_DEC2025",
};

// ─── BUDGET COMPOSITION (for pie chart) ─────────────────────────
// Verified April 3, 2026 from the FY27 budget book's "Budget Summary Pie Chart" section
// (Operating Budget Summary page, FY27-Budget-Book-Proposed-FY27-FINAL.pdf).
// These are the exact percentages from the Superintendent's Proposed FY27 budget.
// NOTE: The budget is organized by spending category (Personnel, Purchased Services, etc.),
// not by program (Special Education, Transportation are cross-cutting costs within these).
export const BUDGET_COMPOSITION = {
  fiscalYear: "FY2027",
  categories: [
    { label: "Salaries & Wages", pct: 56.43, source: "FY27_BOE_BUDGET" },
    { label: "Employee Benefits", pct: 17.10, source: "FY27_BOE_BUDGET" },
    { label: "Purchased Services", pct: 10.52, source: "FY27_BOE_BUDGET" },
    { label: "Tuition (Out-of-District)", pct: 7.71, source: "FY27_BOE_BUDGET" },
    { label: "Maintenance & Utilities", pct: 3.59, source: "FY27_BOE_BUDGET" },
    { label: "Supplies/Books/Software", pct: 3.24, source: "FY27_BOE_BUDGET" },
    { label: "Activities/PD/Dues", pct: 1.42, source: "FY27_BOE_BUDGET" },
  ],
  note: "Exact percentages from the FY27 Superintendent's Proposed Budget pie chart. Categories are functional (how money is spent), not programmatic. Special education and transportation costs are distributed across multiple categories (primarily Purchased Services and Tuition).",
  source: "FY27_BOE_BUDGET",
};

// ─── DEMOGRAPHIC DATA (Census ACS) ─────────────────────────────
// Data from U.S. Census Bureau American Community Survey for Granby, CT
// TODO: Verify all figures at https://data.census.gov — search for Granby town, Hartford County, CT
export const DEMOGRAPHIC_DATA = {
  population: [
    { year: 2010, pop: 11282, source: "CENSUS_ACS" },
    { year: 2012, pop: 11150, source: "CENSUS_ACS", isEstimate: true },
    { year: 2014, pop: 11050, source: "CENSUS_ACS", isEstimate: true },
    { year: 2016, pop: 10980, source: "CENSUS_ACS", isEstimate: true },
    { year: 2018, pop: 10900, source: "CENSUS_ACS", isEstimate: true },
    { year: 2020, pop: 11086, source: "CENSUS_ACS", note: "2020 Decennial Census" },
    { year: 2022, pop: 10850, source: "CENSUS_ACS", isEstimate: true },
    { year: 2024, pop: 10750, source: "CENSUS_ACS", isEstimate: true },
  ],
  note: "Population figures between Census years (2010, 2020) are ACS estimates and may have margins of error. The 2010 and 2020 figures are from the Decennial Census. Post-2020 figures need verification from latest ACS release.",

  // Age distribution — approximate from ACS 5-year estimates
  // TODO: Replace with exact figures from Census ACS
  ageDistribution: [
    { range: "0-4", pct: 4.2, source: "CENSUS_ACS", isEstimate: true },
    { range: "5-17", pct: 17.5, source: "CENSUS_ACS", isEstimate: true },
    { range: "18-24", pct: 6.8, source: "CENSUS_ACS", isEstimate: true },
    { range: "25-34", pct: 7.5, source: "CENSUS_ACS", isEstimate: true },
    { range: "35-44", pct: 11.2, source: "CENSUS_ACS", isEstimate: true },
    { range: "45-54", pct: 14.0, source: "CENSUS_ACS", isEstimate: true },
    { range: "55-64", pct: 17.8, source: "CENSUS_ACS", isEstimate: true },
    { range: "60-64", pct: 9.5, source: "CENSUS_ACS", isEstimate: true, note: "Peak bulge" },
    { range: "65-74", pct: 13.5, source: "CENSUS_ACS", isEstimate: true },
    { range: "75+", pct: 7.5, source: "CENSUS_ACS", isEstimate: true },
  ],
  ageDistributionNote: "Age distribution is approximate from ACS 5-year estimates. The 60-64 bulge is a subset shown separately to highlight the demographic peak. Verify from latest ACS data.",

  // Under-18 vs 65+ trends
  ageTrends: [
    { year: 2010, under18Pct: 27.5, over65Pct: 11.8, source: "CENSUS_ACS" },
    { year: 2015, under18Pct: 24.0, over65Pct: 14.0, source: "CENSUS_ACS", isEstimate: true },
    { year: 2020, under18Pct: 21.7, over65Pct: 17.5, source: "CENSUS_ACS", isEstimate: true },
    { year: 2024, under18Pct: 19.5, over65Pct: 21.0, source: "CENSUS_ACS", isEstimate: true },
  ],
  ageTrendsNote: "Under-18 and 65+ percentages are approximate and should be verified from ACS 5-year estimates. The crossover (65+ exceeding under-18) is the key demographic story.",
};

// ─── SCHOOL CLIMATE TIMELINE ────────────────────────────────────
export const SCHOOL_CLIMATE_TIMELINE = [
  {
    date: "June 2023",
    event: "Pride Video Incident",
    description: "A video related to Pride month was shown at Granby Memorial High School. Parents had differing views on whether it was appropriate. The Board of Education discussed it at a public meeting, and it drew significant community attention.",
    source: "GPS_WEBSITE",
  },
  {
    date: "September 2024",
    event: "Amanda Doe Lawsuit Filed",
    description: "A former Granby Memorial Middle School student — identified only as \"Amanda Doe\" to protect her privacy — filed a lawsuit against the Town of Granby in Hartford Superior Court. The lawsuit alleges the town failed to protect her from bullying and sexual harassment while she was a student. No finding of liability has been made. The case is still ongoing.",
    source: "AMANDA_DOE_LAWSUIT",
  },
  {
    date: "February 2026",
    event: "Hot Mic Incident",
    description: "During a public Board of Education meeting, a board member was recorded making comments while unaware their microphone was still on. The remarks circulated on social media and sparked community discussion about board conduct.",
    source: "GPS_WEBSITE",
  },
];

// ─── HOUSING VALUE DATA ─────────────────────────────────────────
export const HOUSING_DATA = {
  values: [
    { town: "Simsbury", zhvi: 511119 },
    { town: "Suffield", zhvi: 470264 },
    { town: "Granby", zhvi: 465615, highlight: true },
  ],
  source: "ZILLOW_GRANBY",
  asOf: "April 2026",
  note: "ZHVI figures from Zillow Home Value Index, verified by project owner April 2026. YoY change not verified — removed pending Zillow page review.",
};

// ─── FACT-CHECK DATA (Drummer Articles) ─────────────────────────
// Populated from the March 28, 2026 Granby Drummer articles.
// Both articles were fetched and reviewed April 3, 2026.
export const FACT_CHECK_DATA = {
  loganArticle: {
    source: "DRUMMER_LOGAN",
    date: "March 28, 2026",
    author: "Monica Logan, BOE Chair",
    claims: [
      {
        claim: "This is one of the lowest BOE increases in five years and among the lowest increase percentages across neighboring school districts.",
        data: "The 3.8% year-over-year increase is accurate. But framing one year in isolation obscures the trend: the BOE budget has grown 44% since FY2016 ($28.4M → $40.9M) while enrollment fell 17%. A smaller percentage on top of a decade of above-inflation increases is not evidence the budget is lean.",
        dataSources: ["FY2016_BUDGET_BOOK", "FY27_TOWN_BUDGET"],
        verdict: "missing-context",
      },
      {
        claim: "90 percent of kindergarten students perform at or above benchmark in spring reading assessments.",
        data: "This result is from Kelly Lane Primary only, in one grade, on one metric. It is not a district-wide figure. District-wide math proficiency is 54% — down from 64% in 2016–17. The district ranks #46 of 156 in Connecticut. A single-school, single-grade highlight does not represent district performance.",
        dataSources: ["CT_EDSIGHT", "SCHOOLDIGGER"],
        verdict: "missing-context",
      },
      {
        claim: "Sixth-grade math proficiency at GMMS reached its highest level since 2019.",
        data: "\"Highest since 2019\" still means worse than the pre-decline baseline. District-wide math proficiency peaked at 64% in 2016–17 and stands at 54% today. Partial recovery at one school in one grade does not reverse a six-year, 10-point decline in district-wide outcomes.",
        dataSources: ["CT_EDSIGHT"],
        verdict: "missing-context",
      },
      {
        claim: "Granby Memorial High School ranked #17 among Connecticut high schools on the U.S. News Best High Schools list.",
        data: "U.S. News ranks individual high schools using a methodology that heavily weights AP course participation and AP pass rates — a self-selected subset of students. SchoolDigger ranks the Granby school district #46 of 156 by measuring all students on state assessments. The district-wide measure is broader and more representative of all students' outcomes.",
        dataSources: ["SCHOOLDIGGER", "USNEWS"],
        verdict: "missing-context",
      },
      {
        claim: "93 percent of Advanced Placement test takers earned scores of 3 or higher — the highest percentage in GMHS history.",
        data: "AP test takers are a self-selected group: high-achieving students who voluntarily enrolled in AP courses and paid to sit the exam. Reporting their pass rate as a school-wide metric misrepresents the performance of the full student body. District math proficiency for all students is 54%; only 49.6% of students met the SAT math benchmark in 2024.",
        dataSources: ["CT_EDSIGHT"],
        verdict: "misleading",
      },
    ],
  },
  burkeArticle: {
    source: "DRUMMER_BURKE",
    date: "March 28, 2026",
    author: "Superintendent Cheri P. Burke",
    claims: [
      {
        claim: "Our per-pupil spending of approximately $21,748 remains below both state and DRG averages.",
        data: "The $21,748 figure is accurate (NCEP 2026). But \"below average\" implies underfunding — the data shows otherwise. Simsbury spends $21,751 per pupil (just $3 more) and ranks #12 in the state. Avon spends $21,637 and ranks #5. Granby's spending is not the problem; the return on that spending is.",
        dataSources: ["NCEP_2026", "SCHOOLDIGGER"],
        verdict: "misleading",
      },
      {
        claim: "The only new position proposed is a certified reading intervention teacher at Granby Memorial Middle School, fully funded through grants.",
        data: "Grant funding is typically time-limited. A position \"fully funded through grants\" in year one commonly becomes a general fund line item when the grant expires. The article does not disclose the grant term or what happens to the position when funding ends.",
        dataSources: ["FY27_BOE_BUDGET"],
        verdict: "missing-context",
      },
      {
        claim: "The net impact of this budget on taxpayers is approximately 2.65 percent.",
        data: "2.65% describes the projected mill rate change — not the change to actual tax bills. Due to the assessment ratchet, real tax bills have risen every year even when the mill rate fell (e.g., FY23: mill rate dropped 20%, tax bill still rose $423). A mill rate figure systematically understates the impact on homeowners whose assessments are rising.",
        dataSources: ["TAX_BILLS", "FY27_TOWN_BUDGET"],
        verdict: "misleading",
      },
      {
        claim: "The BEAR Transition Academy and the Granby Alternative Program (GAP) serve students locally rather than through costly out-of-district placements, generating tuition revenue from other districts.",
        data: "The article claims BEAR saved taxpayers more than $700,000 this year. This is a specific, verifiable claim. The dashboard does not have independent data to confirm or contradict this figure — it has not been verified against the FY2027 budget book. Marked for follow-up.",
        dataSources: ["FY27_BOE_BUDGET"],
        verdict: "missing-context",
      },
    ],
  },
};

// ─── KEY DATES ──────────────────────────────────────────────────
export const KEY_DATES = {
  publicHearing: { date: "April 6, 2026", description: "Town Budget Public Hearing" },
  referendum: { date: "April 20, 2026", description: "Budget Referendum Vote" },
};

// ─── EXECUTIVE SUMMARY ─────────────────────────────────────────
export const EXECUTIVE_SUMMARY = {
  heroStat: {
    label: "Simsbury spends $3 more per pupil than Granby",
    detail: "Simsbury: $21,751 | Granby: $21,748 — Yet Simsbury ranks #12, Granby ranks #46",
    sources: ["NCEP_2026", "SCHOOLDIGGER"],
  },
  correlations: [
    "The school budget grew by 44% over ten years, but the number of students dropped by about 20%. That means we're spending more money on fewer kids — and now we spend more per student than most similar towns.",
    "Granby now spends as much per student as districts that consistently rank in the state's top 10. But Granby ranks #46. Money alone doesn't explain the gap.",
    "Fewer Granby students are passing state math tests. The rate has fallen from 64% to 54% over six years — a 10-point drop.",
    "Granby used to be one of the best school districts in Connecticut, ranking #4 out of 156 in 2013. Today it ranks #46. That's a 42-spot drop in 12 years.",
    "Property tax bills keep rising even when the tax rate drops. When the town raises home assessments, higher values cancel out any rate reduction — and bills go up.",
  ],
};
