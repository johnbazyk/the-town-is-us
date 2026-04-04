/**
 * Source Citation Registry
 * ========================
 * Every data point on the dashboard must reference a source from this file.
 * Usage: import { SOURCES } from './sources';
 *        <SourceCitation id="CT_EDSIGHT" />
 *
 * URL notes:
 *  - Budget books FY2016–FY2023: hosted on granbyschools.org via a JS-rendered CMS.
 *    Direct PDF links are not exposed in static HTML. Where a specific document page
 *    URL was verified, it is used. Otherwise the BOE budget information index is linked.
 *  - "localPdf" field (optional): path under /sources/ for a hosted copy of the PDF.
 *    Enables the "Local copy" link in SourceCitation tooltip for source resilience.
 */

const SOURCES = {
  CT_EDSIGHT: {
    name: "CT EdSight",
    url: "https://public-edsight.ct.gov",
    description: "Connecticut State Department of Education public data portal",
  },
  SCHOOLDIGGER: {
    name: "SchoolDigger",
    url: "https://www.schooldigger.com/go/CT/districtrank.aspx",
    description: "District rankings based on CT EdSight assessment data, updated Aug 2025",
  },
  NCEP_2026: {
    name: "CT Bureau of Fiscal Services — NCEP Report",
    url: "https://portal.ct.gov/-/media/SDE/Grants-Management/Report1/basiccon_PDF.pdf",
    description: "Net Current Expenditure Per Pupil, January 2026",
  },
  FY27_TOWN_BUDGET: {
    name: "FY2027 BOS Recommended Budget — Granby Adopted Budgets",
    url: "https://www.granby-ct.gov/541/Adopted-Budgets",
    description: "Town of Granby FY2027 Budget. Access via Adopted Budgets archive page.",
  },
  FY27_BOE_BUDGET: {
    name: "FY2027 Proposed BOE Budget Book",
    url: "https://granby.k12.ct.us/article/2745486",
    description: "Board of Education proposed budget for FY2027",
  },
  CLIMATE_DEC2025: {
    name: "School Climate Presentation — December 3, 2025",
    url: "https://files-backend.assets.thrillshare.com/documents/asset/uploaded_file/991/Gps/54ea552f-a1e5-4711-991b-d8d1ce3e7fb8/School-Climate-12.3.2025.pdf",
    description: "BOE presentation showing bullying data, climate survey results, PA 23-167 changes",
  },
  ZILLOW_GRANBY: {
    name: "Zillow Home Value Index — Granby CT",
    url: "https://www.zillow.com/home-values/397625/granby-ct/",
    description: "Zillow Home Value Index, updated monthly",
  },
  ZILLOW_SIMSBURY: {
    name: "Zillow Home Value Index — Simsbury CT",
    url: "https://www.zillow.com/home-values/34004/simsbury-ct/",
    description: "Zillow Home Value Index, updated monthly",
  },
  ZILLOW_SUFFIELD: {
    name: "Zillow Home Value Index — Suffield CT",
    url: "https://www.zillow.com/home-values/60137/suffield-ct-06080/",
    description: "Zillow Home Value Index, updated monthly",
  },
  USNEWS: {
    name: "U.S. News Best High Schools",
    url: "https://www.usnews.com/education/best-high-schools/connecticut/districts/granby-school-district/granby-memorial-high-school-3484",
    description: "U.S. News & World Report high school rankings",
  },
  NICHE: {
    name: "Niche.com — Granby School District",
    url: "https://www.niche.com/k12/d/granby-school-district-ct/",
    description: "School ratings and reviews",
  },
  CENSUS_ACS: {
    name: "U.S. Census Bureau — American Community Survey",
    url: "https://data.census.gov",
    description: "Demographic data for Granby, CT",
  },
  GPS_WEBSITE: {
    name: "Granby Public Schools — Board of Education Documents",
    url: "https://www.granbyschools.org/documents/board-of-education",
    description: "Official BOE documents page — source of 1,102 downloaded documents",
  },
  DRUMMER_LOGAN: {
    name: "Granby Drummer — Monica Logan, BOE Chair",
    url: "https://granbydrummer.com/2026/03/school-budget-reflects-community-values/",
    description: "\"School Budget Reflects Community Values\" — BOE Chair article, March 28, 2026. Verified live April 3, 2026.",
  },
  DRUMMER_BURKE: {
    name: "Granby Drummer — Cheri P. Burke, Superintendent",
    url: "https://granbydrummer.com/2026/03/stretching-budget-to-support-every-student/",
    description: "\"Stretching Budget to Support Every Student\" — Superintendent article, March 28, 2026. Verified live April 3, 2026.",
  },
  AMANDA_DOE_LAWSUIT: {
    name: "Amanda Doe v. Town of Granby — Hartford Superior Court",
    url: "https://patch.com/connecticut/granby-eastgranby/ex-granby-middle-school-student-files-lawsuit-over-bullying",
    description: "Bullying/sexual harassment lawsuit filed September 2024",
  },
  PA_23_167: {
    name: "Connecticut Public Act 23-167",
    url: "https://www.cga.ct.gov/2023/ACT/PA/PDF/2023PA-00167-R00SB-00001-PA.PDF",
    description: "School climate legislation mandating new framework effective 2025-26",
  },
  BULLYING_FORM: {
    name: "CT Parent's Guide — Filing a Formal Bullying Complaint",
    url: "https://portal.ct.gov/sde/publications/parents-guide-to-bullying-and-harassment-in-connecticut/filing-a-formal-bullying-complaint",
    description: "Connecticut SDE guide for parents on how to file a formal bullying complaint",
  },
  PUBLIC_SCHOOL_REVIEW: {
    name: "Public School Review — Granby District",
    url: "https://www.publicschoolreview.com/connecticut/granby-school-district/901680-school-district",
    description: "Historical district ranking data showing #4 in 2013",
  },
  CT_EDSIGHT_GRAD: {
    name: "CT EdSight — Four-Year Graduation Rates",
    url: "https://public-edsight.ct.gov/performance/four-year-graduation-rates",
    description: "Connecticut four-year graduation rates by district, 2023-24",
  },
  BLS_NORTHEAST: {
    name: "Bureau of Labor Statistics — Northeast Region",
    url: "https://www.bls.gov/regions/northeast/connecticut.htm",
    description: "Consumer Price Index data for the Northeast region, used for inflation context",
  },

  // === Budget Book Sources ===
  // BOE budget books are hosted on granbyschools.org via a JS-rendered CMS (Thrillshare).
  // Direct PDF links are not accessible from static HTML. Specific document page URLs are
  // used where verified; otherwise the BOE budget information index page is the fallback.
  // Original PDFs are on file in ../11-BOE-Budget-Books/ and can be copied to public/sources/.

  FY2016_BUDGET_BOOK: {
    name: "FY2016 Approved Budget",
    url: "https://www.granbyschools.org/documents/board-of-education/budget-information",
    description: "FY2016 Approved Budget. Direct PDF link unavailable — search the BOE budget information page.",
  },
  FY2017_BUDGET_BOOK: {
    name: "FY2017 Approved Budget",
    url: "https://www.granbyschools.org/documents/board-of-education/budget-information",
    description: "FY2017 Approved Budget. Direct PDF link unavailable — search the BOE budget information page.",
  },
  FY2018_BUDGET_BOOK: {
    name: "FY2018 Approved Budget",
    url: "https://www.granbyschools.org/documents/board-of-education/budget-information",
    description: "FY2018 Approved Budget. Direct PDF link unavailable — search the BOE budget information page.",
  },
  FY2019_BUDGET_BOOK: {
    name: "FY2019 BOE Budget Book",
    url: "https://www.granbyschools.org/documents/board-of-education/budget-information",
    description: "FY2019 BOE Budget Book. Direct PDF link unavailable — search the BOE budget information page.",
  },
  FY2020_BUDGET_BOOK: {
    name: "FY2020 Board of Education Budget Book",
    url: "https://www.granbyschools.org/documents/board-of-education/budget-information",
    description: "FY2020 BOE Budget Book. Direct PDF link unavailable — search the BOE budget information page.",
  },
  FY2021_BUDGET_BOOK: {
    name: "FY2021 BOE Budget Book",
    url: "https://www.granbyschools.org/documents/board-of-education/budget-information",
    description: "FY2021 BOE Budget Book. Direct PDF link unavailable — search the BOE budget information page.",
  },
  FY2022_BUDGET_BOOK: {
    name: "FY2022 BOE Budget Book",
    url: "https://www.granbyschools.org/documents/board-of-education/budget-information",
    description: "FY2022 BOE Budget Book. Direct PDF link unavailable — search the BOE budget information page.",
  },
  FY2023_BUDGET_BOOK: {
    name: "FY2023 Board of Education Budget Book",
    url: "https://www.granbyschools.org/documents/board-of-education/budget-information",
    description: "FY2023 BOE Budget Book. Direct PDF link unavailable — search the BOE budget information page.",
  },
  FY2024_BUDGET_BOOK: {
    name: "FY2024 BOE Budget Book (Revised)",
    url: "https://www.granby.k12.ct.us/documents/board-of-education/budget-information/fy2023-2024-budget/21150759",
    description: "FY2024 BOE Budget Book — verified document page on granby.k12.ct.us.",
  },
  FY2025_BUDGET_BOOK: {
    name: "FY2025 BOE Budget Book",
    url: "https://www.granbyschools.org/documents/board-of-education/budget-information",
    description: "FY2025 BOE Budget Book. Direct PDF link unavailable — search the BOE budget information page.",
  },
  FY2026_BUDGET_BOOK: {
    name: "FY2026 BOE Budget Book",
    url: "https://www.granbyschools.org/documents/board-of-education/budget-information/fy2025-2026-budget/21150768",
    description: "FY2026 BOE Budget Book — verified document page on granbyschools.org.",
  },
  TAX_BILLS: {
    name: "Property Tax Bills — 82 Harmony Hill Road",
    url: "https://www.granby-ct.gov",
    description: "Actual property tax bills for 82 Harmony Hill Road, Parcel 06500082. Original bills on file.",
  },
};

export { SOURCES };
export default SOURCES;
