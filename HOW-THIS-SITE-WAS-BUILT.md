# How I Built TheTownIsUs.com — And Why It Matters That You Know

I've gotten questions about the Granby Accountability Dashboard at thetownisus.netlify.app, specifically about how the data was gathered and whether AI was involved. The answer to the second question is yes — and I think the details matter, because this isn't what most people think when they hear "AI."

I'm going to walk through exactly what I did, step by step, so anyone can evaluate the process for themselves.

---

## What the site is

A single-page website presenting publicly available data about Granby's school budget, academic performance, property taxes, demographics, and school climate. Every number on the site has a clickable citation linking to the original source document. There are no opinions without data behind them. There is no AI on the live site — it's a static website with hardcoded, verified numbers.

## What AI did and didn't do

**AI did not:**
- Generate any claims or opinions
- Search the internet to find data
- Decide what story the data tells
- Write the editorial framing (I did)
- Make any judgment calls about what to include or exclude

**AI did:**
- Extract numbers from official PDF documents (budget books, tax records, Census data)
- Organize that data into structured formats I could review
- Build the website code (React, Chart.js, Tailwind CSS) to present the data
- Run quality assurance audits to check that every citation link works, every chart renders correctly, and every estimated figure is properly marked

Think of it like this: I'm the journalist. AI is the research assistant and the graphic designer. I directed every step, reviewed every output, and made every editorial decision.

## The source documents

The foundation of this project is approximately 1,100 official public documents — PDFs from the Board of Education, Town of Granby, CT State Department of Education, U.S. Census Bureau, SchoolDigger, Zillow, and other public sources. These include:

- BOE Budget Books for FY2016 through FY2027
- My actual property tax bills (4 years)
- School climate surveys and bullying incident reports
- Census American Community Survey demographic data
- District academic ranking data from SchoolDigger
- SAT benchmark reports from the CT State Department of Education

Every one of these documents sits on my local computer. The AI tools read directly from these files — not from the internet, not from memory, not from training data. If a number couldn't be traced to a specific page in a specific document, it didn't go on the site.

## The 20-step build process

I didn't just open ChatGPT and say "make me a website about Granby's budget." This was a structured, 20-step engineering process with human review gates at every stage. Here's the actual workflow:

**Steps 1-9 (Previous Session):** Built the initial site scaffold — data structures, source citation system, all 8 tab components, charts, tables, and the Netlify form for citizen submissions.

**Step 10 — Source Link Audit:** Checked every citation URL on the site to make sure it actually points to a real, accessible document. Fixed broken links and updated stale data sources.

**Step 11 — Bullying Form Citation Fix:** Corrected a specific source link for the CT State Department of Education complaint guide to point to the right document.

**Step 12 — Footer Update:** Added the data verification date to the site footer so visitors know when the data was last audited.

**Step 13 — Methodology Section:** Added a collapsible "Our Methodology" section to the Executive Summary tab explaining exactly how the data was gathered and verified.

**Step 14 — Data Verification Tab:** Built an entirely new tab showing the audit trail — which figures were corrected, what changed, and which numbers are still estimates with margins of error.

**Step 15 — Form Category Update:** Updated the citizen submission form to match all the data sections on the dashboard.

**Step 16 — OCR Verification of Budget Data:** This is the most important step. The FY2016-FY2020 budget books are scanned PDFs (images, not searchable text). I used OCR (optical character recognition) to extract the budget and enrollment figures, then manually verified each number against the original document. Five years of data were corrected from estimates to verified figures. Every correction is logged in the Data Verification tab.

**Step 17-18 — Slash Commands:** Created reusable audit commands so the QA process can be repeated by anyone with access to the codebase.

**Step 19 — QA Audit:** Ran a comprehensive quality assurance audit checking 9 categories: build integrity, Chart.js registrations, source citations, estimate markers, Netlify form sync, footer content, tab navigation, and bundle size. Results: 7/9 passed outright, 2/9 flagged for review (both turned out to be false positives on closer inspection).

**Step 20 — Deploy:** Final production build (433KB total JavaScript, under the 500KB target), pushed 8 commits to GitHub, Netlify auto-deployed the live site.

## How the AI tools work (for the curious)

I used two AI tools in this project:

**Claude Code** (Anthropic's command-line coding agent) — This is the tool that actually wrote the website code, read the PDF source documents, and ran the QA audits. It operates on my local machine with access to my files. I gave it specific instructions for each step and reviewed its output before approving anything. It cannot access the internet or make changes without my permission.

**Claude (Anthropic's desktop app in Cowork mode)** — This is the tool I used to plan each step, write the prompts for Claude Code, and review the results. Think of it as the project manager. It generated the detailed instructions that I then pasted into Claude Code for execution.

The key constraint I enforced throughout: **no runaway AI.** Every step required my review and approval before proceeding to the next. The AI proposed; I disposed. If something looked wrong, I sent it back for correction. If a number didn't match the source document, it got fixed.

## Why this matters

When someone dismisses this site by saying "he just used AI," they're missing the point entirely. The AI didn't have opinions about Granby's budget. It didn't decide that a 42% spending increase alongside declining enrollment and falling academic rankings is a problem. The *data* says that. The AI just helped me present it in a way that's accessible, sourced, and verifiable.

Every number has a citation. Every citation links to a public document. Every estimated figure is marked with an asterisk. The methodology is disclosed on the site itself. The source code is public on GitHub. The QA audit report is in the repository.

This is more transparency than you'll find in most government presentations — and certainly more than you'll find in a Drummer op-ed.

If you find an error, there's a form on the site to report it. I welcome corrections. That's the whole point.

— John Bazyk, Granby Taxpayer

---

*The Granby Accountability Dashboard is a First Amendment-protected civic publication. All data is sourced from official government records and public databases. The site is hosted at thetownisus.netlify.app and the source code is available at github.com/johnbazyk/the-town-is-us.*
