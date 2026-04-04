import React from 'react';
import SourceCitation from './SourceCitation';

const SUMMARY_ROWS = [
  {
    category: 'Budget Totals & Enrollment',
    subtext: 'FY2016–FY2027, BOE budget books',
    total: '24 fields',
    verified: 'All 24',
    estimates: '—',
    lastChecked: 'April 4, 2026',
    sourceId: 'FY27_TOWN_BUDGET',
  },
  {
    category: 'Tax Bills',
    subtext: '4 bills × 3 fields (assessment, mill rate, total)',
    total: '12 fields',
    verified: 'All 12',
    estimates: '—',
    lastChecked: 'April 4, 2026',
    sourceId: 'TAX_BILLS',
  },
  {
    category: 'Bullying Incidents',
    subtext: '5 years × 5 schools/columns',
    total: '25 cells',
    verified: 'All 25',
    estimates: '—',
    lastChecked: 'April 4, 2026',
    sourceId: 'CLIMATE_DEC2025',
  },
  {
    category: 'Climate Survey',
    subtext: '4 schools — bar-chart reads',
    total: '4 values',
    verified: '—',
    estimates: '4 (±2%)',
    lastChecked: 'April 4, 2026',
    sourceId: 'CLIMATE_DEC2025',
  },
  {
    category: 'Budget Composition',
    subtext: 'FY2027 pie chart, 7 categories',
    total: '7 percentages',
    verified: 'All 7',
    estimates: '—',
    lastChecked: 'April 4, 2026',
    sourceId: 'FY27_BOE_BUDGET',
  },
  {
    category: 'Housing Values (ZHVI)',
    subtext: 'Granby, Simsbury, Suffield',
    total: '3 values',
    verified: 'All 3',
    estimates: '—',
    lastChecked: 'April 4, 2026',
    sourceId: 'ZILLOW_GRANBY',
  },
  {
    category: 'District Rankings',
    subtext: '6 confirmed years + 2 interpolated',
    total: '8 data points',
    verified: '6',
    estimates: '2 (interpolated)',
    lastChecked: 'April 4, 2026',
    sourceId: 'SCHOOLDIGGER',
  },
  {
    category: 'Demographic Data',
    subtext: 'U.S. Census ACS — population, age distribution',
    total: 'Multiple series',
    verified: 'Verified',
    estimates: '—',
    lastChecked: 'April 4, 2026',
    sourceId: 'CENSUS_ACS',
  },
];

const CORRECTIONS = [
  { field: 'FY2016 BOE Budget', old: '$28,435,000', corrected: '$28,718,507', sourceId: 'FY2016_BUDGET_BOOK', sourceLabel: 'FY2016 Budget Book' },
  { field: 'FY2017 BOE Budget', old: '$29,100,000', corrected: '$28,432,636', sourceId: 'FY2017_BUDGET_BOOK', sourceLabel: 'FY2017 Budget Book' },
  { field: 'FY2018 BOE Budget', old: '$29,800,000', corrected: '$28,656,152', sourceId: 'FY2018_BUDGET_BOOK', sourceLabel: 'FY2018 Budget Book' },
  { field: 'FY2019 BOE Budget', old: '$30,200,000', corrected: '$29,654,842', sourceId: 'FY2019_BUDGET_BOOK', sourceLabel: 'FY2019 Budget Book' },
  { field: 'FY2020 BOE Budget', old: '$31,100,000', corrected: '$31,134,620', sourceId: 'FY2020_BUDGET_BOOK', sourceLabel: 'FY2020 Budget Book' },
  { field: 'FY2016 Enrollment', old: '2,050', corrected: '1,953', sourceId: 'FY2018_BUDGET_BOOK', sourceLabel: 'FY2018 Budget Book (enrollment history table)' },
  { field: 'FY2017 Enrollment', old: '1,980', corrected: '1,874', sourceId: 'FY2018_BUDGET_BOOK', sourceLabel: 'FY2018 Budget Book (enrollment history table)' },
  { field: 'FY2018 Enrollment', old: '1,920', corrected: '1,862', sourceId: 'FY2020_BUDGET_BOOK', sourceLabel: 'FY2020 Budget Book (enrollment history table)' },
  { field: 'FY2019 Enrollment', old: '1,870', corrected: '1,863', sourceId: 'FY2020_BUDGET_BOOK', sourceLabel: 'FY2020 Budget Book (enrollment history table)' },
  { field: 'Simsbury ZHVI', old: '$448,920', corrected: '$511,119', sourceId: 'ZILLOW_SIMSBURY', sourceLabel: 'Zillow Home Value Index' },
  { field: 'Suffield ZHVI', old: '$418,677', corrected: '$470,264', sourceId: 'ZILLOW_SUFFIELD', sourceLabel: 'Zillow Home Value Index' },
  { field: 'Granby ZHVI', old: '$392,291', corrected: '$465,615', sourceId: 'ZILLOW_GRANBY', sourceLabel: 'Zillow Home Value Index' },
  { field: 'PA 23-167 Source URL', old: 'Bill status page (broken link)', corrected: 'Direct PDF link', sourceId: 'PA_23_167', sourceLabel: 'CT General Assembly' },
];

const REMAINING_ESTIMATES = [
  {
    field: 'School Climate Survey — 4 schools',
    why: 'Percentages read from a bar chart in the December 3, 2025 climate presentation, not from a published data table. No exact figures are publicly available. Tolerance ±2%.',
    sourceId: 'CLIMATE_DEC2025',
  },
  {
    field: 'District Ranking — 2018 (#25) and 2020 (#35)',
    why: 'SchoolDigger does not provide a historical archive for these years. Values are interpolated between confirmed data points: 2013 (#4) and 2023 (#46). No primary source exists to verify. These points are labeled isEstimate in the data and marked with * in the dashboard.',
    sourceId: 'SCHOOLDIGGER',
  },
];

function StatusBadge({ value }) {
  if (value === '—') return <span className="text-gray-400">—</span>;
  if (typeof value === 'string' && value.startsWith('All')) {
    return <span className="text-green-700 font-semibold">{value}</span>;
  }
  if (value === 'Verified') {
    return <span className="text-green-700 font-semibold">Verified</span>;
  }
  return <span className="text-amber-700 font-semibold">{value}</span>;
}

function DataVerification() {
  return (
    <section className="space-y-10">

      {/* Page header */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-granby-maroon mb-3">
          Data Verification Audit
        </h2>
        <p className="text-granby-maroon leading-relaxed max-w-3xl">
          Every figure on this dashboard has been cross-referenced against its original source
          document — a PDF on file, a government data portal, or an official tax bill. This page
          shows the complete verification audit trail: what was checked, when, what the source
          showed, and whether the dashboard matched. Corrections applied during the audit are
          listed below with the old and new values.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Audit completed: <strong>April 4, 2026</strong> · Source documents: 1,102 PDFs on file
          from Granby Public Schools, Town of Granby, and CT state agencies.
        </p>
      </div>

      {/* Verification Summary */}
      <div>
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-4 border-b border-gray-200 pb-2">
          Verification Summary
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-granby-maroon text-white">
                <th className="text-left px-4 py-2 font-semibold">Data Category</th>
                <th className="text-left px-4 py-2 font-semibold">Scope</th>
                <th className="text-right px-4 py-2 font-semibold">Verified</th>
                <th className="text-right px-4 py-2 font-semibold">Estimates</th>
                <th className="text-right px-4 py-2 font-semibold">Last Checked</th>
              </tr>
            </thead>
            <tbody>
              {SUMMARY_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 odd:bg-warm">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-granby-maroon">
                      {row.category}
                    </span>
                    <SourceCitation id={row.sourceId} index={i + 1} />
                    <br />
                    <span className="text-xs text-gray-500">{row.subtext}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{row.total}</td>
                  <td className="px-4 py-3 text-right">
                    <StatusBadge value={row.verified} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <StatusBadge value={row.estimates} />
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500 whitespace-nowrap">{row.lastChecked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Corrections Log */}
      <div>
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-2 border-b border-gray-200 pb-2">
          Corrections Applied — April 4, 2026
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          These figures were wrong in the original dashboard and have been corrected against source
          documents. All prior values were estimates; all corrected values are verified.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-granby-maroon text-white">
                <th className="text-left px-4 py-2 font-semibold">Field</th>
                <th className="text-right px-4 py-2 font-semibold">Was</th>
                <th className="text-right px-4 py-2 font-semibold">Corrected To</th>
                <th className="text-left px-4 py-2 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {CORRECTIONS.map((c, i) => (
                <tr key={i} className="border-b border-gray-100 odd:bg-warm">
                  <td className="px-4 py-2 font-semibold text-granby-maroon">{c.field}</td>
                  <td className="px-4 py-2 text-right text-gray-400 line-through">{c.old}</td>
                  <td className="px-4 py-2 text-right text-green-700 font-semibold">{c.corrected}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {c.sourceLabel}
                    <SourceCitation id={c.sourceId} index={i + 1} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Remaining Estimates */}
      <div>
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-2 border-b border-gray-200 pb-2">
          Remaining Estimates
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          The following figures cannot be verified against a primary source document and remain
          as estimates. They are marked with * in the dashboard.
        </p>
        <div className="space-y-4">
          {REMAINING_ESTIMATES.map((item, i) => (
            <div key={i} className="border border-amber-200 bg-amber-50 rounded px-5 py-4">
              <p className="font-semibold text-granby-maroon mb-1">
                * {item.field}
                <SourceCitation id={item.sourceId} index={i + 1} />
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{item.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology note */}
      <div className="bg-warm border border-gray-200 rounded px-5 py-4 text-sm text-gray-600 leading-relaxed">
        <p className="font-semibold text-granby-maroon mb-1">Verification methodology</p>
        <p>
          Budget totals were confirmed from the Budget Summary page of each year's BOE budget book,
          then cross-confirmed as the prior-year column in the following year's book (5-way
          consecutive-year chain for FY2016–FY2020). Tax bill figures were confirmed field-by-field
          against original paper bills. Bullying incident data was confirmed cell-by-cell against the
          December 3, 2025 BOE climate presentation. ZHVI figures were confirmed by the project owner
          directly on Zillow.com in April 2026. All source documents are on file locally; none of this
          audit relied on live internet requests except where noted.
        </p>
      </div>

    </section>
  );
}

export default DataVerification;
