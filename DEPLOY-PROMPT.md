# Granby Accountability Dashboard — Deploy & Open-Source Prompt

## Project Context

This is a **React 18 + Vite 6 + Tailwind 3 + Chart.js 4** dashboard for Granby, CT school budget accountability. The codebase has already been fully overhauled (color scheme, plain language, accessibility, data validation) and the production build passes with zero errors (371KB gzipped).

**Current state:**
- All source code is finalized in `src/` (13 component/data files)
- `npm run build` produces a clean production build to `build/`
- `netlify.toml` is configured (build command: `npm run build`, publish: `build`)
- Netlify Forms integration exists in `index.html`
- **GitHub repo exists:** `johnbazyk/the-town-is-us` (public, main branch, only has README.md — no code pushed yet)
- **Netlify team:** bazykjohn (https://app.netlify.com/teams/bazykjohn/projects)
- **Not yet deployed to production**

**Known issues to check after deploy:**
- Form submissions: confirm they route to Netlify Forms (hidden form in index.html)
- SPA routing: React client-side routing needs Netlify redirect rules (`/* → /index.html 200`)
- External links (EdSight, CT.gov, Zillow) should open in new tabs
- Colors should render as maroon (#8C1D40) / gold (#D4A843) / alert red (#c0392b) — no navy/blue
- Charts should load without console errors

---

## Phase 1 — Push Code to GitHub

The repo already exists at: https://github.com/johnbazyk/the-town-is-us

1. Initialize git in the local project directory (if not already done):
```bash
cd /path/to/granby-dashboard
git init
```

2. Create `.gitignore`:
```
node_modules/
build/
dist/
.env
.DS_Store
*.log
```

3. Add the remote (the repo already exists with an initial commit, so we need to handle that):
```bash
git remote add origin https://github.com/johnbazyk/the-town-is-us.git
```

4. Create a proper `README.md` for the project:
   - **Title:** The Town Is Us — Granby Budget Accountability Dashboard
   - **What:** Public accountability dashboard for Granby, CT school budget and academic outcomes
   - **Why:** Taxpayer transparency — every number sourced from public Connecticut state data
   - **Tech stack:** React 18, Vite 6, Tailwind CSS 3, Chart.js 4
   - **Data sources:** CT EdSight (Smarter Balanced assessments), CT Bureau of Fiscal Services NCEP report, Zillow ZHVI, Granby BOE budget books FY2016–FY2027
   - **How to run locally:** `npm install && npm run dev`
   - **How to build:** `npm run build`
   - **License:** MIT

5. Add MIT LICENSE file

6. Stage all source files, commit, and force-push to main (since the remote only has the auto-generated README):
```bash
git add -A
git commit -m "Initial codebase: Granby Budget Accountability Dashboard"
git branch -M main
git push -u origin main --force
```

**Important:** The `build/` directory should NOT be committed — Netlify will build it. Only push source code.

---

## Phase 2 — Verify netlify.toml Before Deploy

Check that `netlify.toml` has these critical settings:

```toml
[build]
  command = "npm run build"
  publish = "build"

# SPA redirect — CRITICAL for React Router
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

If the SPA redirect rule (`/* → /index.html 200`) is missing, **add it** — without this, refreshing on any tab other than the homepage will 404 on Netlify.

---

## Phase 3 — Netlify Deploy

1. Connect the GitHub repo `johnbazyk/the-town-is-us` to a new Netlify site on team `bazykjohn`
2. Use these build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - **Node version:** 18+ (add `NODE_VERSION = "18"` to environment variables if needed)
3. Deploy to production
4. Verify the live URL loads
5. Check that Netlify Forms is detecting the form (check Netlify dashboard → Forms)

If using Netlify CLI instead of MCP:
```bash
npm install -g netlify-cli
netlify login
netlify init  # Link to existing site or create new one
netlify deploy --prod
```

---

## Phase 4 — Post-Deploy Verification

After deployment, verify against `VISUAL-QA-CHECKLIST.md`:

1. **Page loads:** Site loads without blank screen or errors
2. **SPA routing:** Click through all 8 tabs, then refresh the page on a non-root tab — should NOT 404
3. **Colors:** Maroon header, gold active tab underline, no navy/blue anywhere
4. **Charts:** All Chart.js charts render (Budget Analysis, Academic Performance, Property Taxes, Town & Housing, School Climate)
5. **External links:** EdSight, CT.gov, Zillow links open correctly in new tabs
6. **Forms:** Submit a test entry on the "Submit Your Data" tab — verify it appears in Netlify Forms dashboard
7. **Console:** Open browser DevTools → Console — no JS errors
8. **Mobile:** Check responsive layout on mobile viewport
9. **Performance:** Target < 3s load on 4G (Lighthouse audit)
10. **Security headers:** Verify X-Frame-Options, CSP headers are present (check in DevTools → Network → Response Headers)

---

## Phase 5 — Fix Any Issues Found

For each issue found in Phase 4:
1. Describe the issue
2. Identify the file and line to fix
3. Make the fix
4. Run `npm run build` to verify zero errors
5. Commit with a descriptive message
6. Push to GitHub — Netlify auto-deploys from main

---

## Rules

- Always run `npm run build` after any code change — verify zero errors before committing
- Every commit message should be descriptive (not "fix stuff")
- Do NOT modify data values in `src/data/data.js` without explicit approval — the numbers have been verified against CT state sources
- If any external URL is broken, flag it but do not remove the citation
- Keep `VISUAL-QA-CHECKLIST.md` updated if any UI changes are made
- The `netlify.toml` security headers must remain in place
- The `build/` directory must be in `.gitignore` — never commit build artifacts
