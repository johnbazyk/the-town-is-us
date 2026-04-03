SOURCE DOCUMENTS
================
These are copies of public government documents cited in the Granby Accountability Dashboard.
All documents are public records obtained from official government websites.
Original source URLs are listed in src/data/sources.js.
Last updated: April 2026

HOW TO ADD A PDF
----------------
Copy the PDF from ../11-BOE-Budget-Books/ (or other source folders) into this directory.
Then add a "localPdf" field to the corresponding entry in src/data/sources.js:

  FY2024_BUDGET_BOOK: {
    name: "...",
    url: "https://...",
    localPdf: "/sources/FY24-BOE-Budget-Book-Rev.pdf",
    description: "..."
  }

The SourceCitation component will automatically show a "Local copy" link in its tooltip
when a localPdf path is present.

DOCUMENTS TO ADD
----------------
Priority order — copy from ../11-BOE-Budget-Books/:
  FY24-BOE-Budget-Book-Rev.pdf       → FY2024_BUDGET_BOOK
  FY25-BOE-Budget-Book.pdf           → FY2025_BUDGET_BOOK
  FY26-BOE-Budget-Book.pdf           → FY2026_BUDGET_BOOK
  FY27-Budget-Book-Proposed-FY27-FINAL.pdf → FY27_BOE_BUDGET
  FY23-Board-of-Education-Budget-Book.pdf  → FY2023_BUDGET_BOOK
  FY22-BOE-Budget-Book.pdf           → FY2022_BUDGET_BOOK
  FY21-BOE-Budget-Book.pdf           → FY2021_BUDGET_BOOK
  FY20-Board-of-Education-Budget-Book.pdf  → FY2020_BUDGET_BOOK
  FY19-BOE-Budget-Book.pdf           → FY2019_BUDGET_BOOK
  FY2018-Approved-Budget.pdf         → FY2018_BUDGET_BOOK
  FY2017-Approved-Budget.pdf         → FY2017_BUDGET_BOOK
  FY2016-Approved-Budget.pdf         → FY2016_BUDGET_BOOK

From ../17-School-Climate/:
  2025-12-03_School-Climate.pdf      → CLIMATE_DEC2025
