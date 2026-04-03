import React from 'react';
import SourceCitation from './SourceCitation';
import { EXECUTIVE_SUMMARY, KEY_DATES, ACADEMIC_DATA, BUDGET_DATA } from '../data/data';

function ExecutiveSummary() {
  const firstYear = BUDGET_DATA.years[0];
  const lastYear = BUDGET_DATA.years[BUDGET_DATA.years.length - 1];
  const granby = ACADEMIC_DATA.peerComparison.find(d => d.highlight);

  return (
    <section>
      {/* Key Dates Banner */}
      <div className="bg-granby-maroon text-white px-5 py-3 rounded mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="font-semibold text-sm">
          ⚠ Upcoming: Budget Referendum
        </div>
        <div className="flex gap-6 text-sm">
          <span>
            <span className="font-bold">{KEY_DATES.publicHearing.date}</span> — {KEY_DATES.publicHearing.description}
          </span>
          <span>
            <span className="font-bold">{KEY_DATES.referendum.date}</span> — {KEY_DATES.referendum.description}
          </span>
        </div>
      </div>

      {/* Plain English intro callout */}
      <div className="bg-granby-gold-light border-l-4 border-granby-gold px-5 py-4 rounded-r mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-granby-maroon mb-1">What This Means in Plain English</p>
        <p className="text-granby-maroon leading-relaxed text-sm">
          This dashboard shows how Granby spends school tax dollars, how our students are performing,
          and how we compare to similar Connecticut towns. Every number comes from public records.
          We built this so every resident can see the facts for themselves.
        </p>
      </div>

      {/* Hero Stat */}
      <div className="bg-warm border-l-4 border-alert-red px-6 py-5 mb-8 rounded-r">
        <p className="text-xs font-bold uppercase tracking-widest text-alert-red mb-1">Key Finding</p>
        <p className="font-heading text-xl font-bold text-granby-maroon leading-snug">
          {EXECUTIVE_SUMMARY.heroStat.label}
        </p>
        <p className="text-muted mt-2 text-sm">
          {EXECUTIVE_SUMMARY.heroStat.detail}
          {EXECUTIVE_SUMMARY.heroStat.sources.map((id, i) => (
            <SourceCitation key={id} id={id} index={i + 1} />
          ))}
        </p>
      </div>

      {/* Thesis */}
      <div className="prose max-w-none mb-8 space-y-4 text-granby-maroon leading-relaxed">
        <p>
          Granby's school budget has grown 44% over the past decade — from approximately $28.4M in FY2016
          to $40.9M proposed for FY2027
          <SourceCitation id="FY2016_BUDGET_BOOK" index={3} />
          <SourceCitation id="FY27_TOWN_BUDGET" index={4} /> — while the number of students has
          fallen from roughly 2,050 to 1,648, a drop of about 20%.
          <SourceCitation id="FY2016_BUDGET_BOOK" index={3} />
          <SourceCitation id="FY27_TOWN_BUDGET" index={4} />
          That means we're spending more money on fewer kids. Per-student costs have risen sharply
          as a result, now matching districts that consistently rank in the state's top 15.
        </p>
        <p>
          Despite this investment, student outcomes have moved in the opposite direction.
          Granby ranked <strong>#4 out of 156 Connecticut districts in 2013</strong>
          <SourceCitation id="PUBLIC_SCHOOL_REVIEW" index={5} /> and now ranks
          <strong> #46</strong>
          <SourceCitation id="SCHOOLDIGGER" index={6} />. Math proficiency has fallen from 64% to 54%
          over six years.
          <SourceCitation id="CT_EDSIGHT" index={7} />
          Simsbury, with nearly identical per-student spending ($21,751 vs. Granby's $21,748), ranks #12.
          <SourceCitation id="NCEP_2026" index={2} />
          <SourceCitation id="SCHOOLDIGGER" index={6} />
        </p>
        <p>
          Meanwhile, property taxes keep rising. When Granby reassessed in FY2023, the mill rate fell —
          but assessed values jumped, and tax bills still went up. This is the ratchet effect: once
          spending locks in, it rarely comes back down. Every number on this dashboard is clickable
          and sourced. See something that doesn't look right? We'd love to hear from you — use the
          Submit Data tab.
          <SourceCitation id="TAX_BILLS" index={8} />
        </p>
      </div>

      {/* 5 Correlations */}
      <div className="mb-8">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-4 border-b border-gray-200 pb-2">
          Five Things the Data Shows
        </h3>
        <ol className="space-y-3">
          {EXECUTIVE_SUMMARY.correlations.map((item, i) => {
            const sources = [
              ['FY2016_BUDGET_BOOK', 'FY27_TOWN_BUDGET'],
              ['NCEP_2026', 'SCHOOLDIGGER'],
              ['CT_EDSIGHT'],
              ['PUBLIC_SCHOOL_REVIEW', 'SCHOOLDIGGER'],
              ['TAX_BILLS'],
            ];
            const sourceIndexBase = [3, 2, 7, 5, 8];
            return (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-granby-maroon text-white text-sm font-bold rounded-full flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-granby-maroon leading-snug pt-0.5">
                  {item}
                  {sources[i].map((id, j) => (
                    <SourceCitation key={id} id={id} index={sourceIndexBase[i] + j} />
                  ))}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Peer Comparison Snapshot */}
      <div className="mb-8">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-4 border-b border-gray-200 pb-2">
          Peer District Snapshot
          <SourceCitation id="NCEP_2026" index={2} />
          <SourceCitation id="SCHOOLDIGGER" index={6} />
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-granby-maroon text-white">
                <th className="text-left px-4 py-2 font-semibold">District</th>
                <th className="text-right px-4 py-2 font-semibold">Cost Per Student</th>
                <th className="text-right px-4 py-2 font-semibold">Math %</th>
                <th className="text-right px-4 py-2 font-semibold">Reading %</th>
                <th className="text-right px-4 py-2 font-semibold">State Rank</th>
              </tr>
            </thead>
            <tbody>
              {ACADEMIC_DATA.peerComparison.map((row) => (
                <tr
                  key={row.district}
                  className={row.highlight
                    ? 'bg-alert-red/10 border-l-4 border-alert-red font-semibold'
                    : 'border-b border-gray-100 odd:bg-warm'}
                >
                  <td className="px-4 py-2">{row.district}{row.highlight && ' ◄'}</td>
                  <td className="px-4 py-2 text-right">${row.perPupil.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{row.math}%</td>
                  <td className="px-4 py-2 text-right">{row.reading}%</td>
                  <td className={`px-4 py-2 text-right ${row.highlight ? 'text-alert-red font-bold' : ''}`}>
                    #{row.rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Source: CT Bureau of Fiscal Services NCEP Report (Jan 2026) and SchoolDigger (Aug 2025).
          Granby row highlighted.
        </p>
      </div>

      {/* Bottom callout */}
      <div className="bg-granby-maroon text-white rounded p-5 text-sm">
        <p className="font-heading font-bold text-base mb-1">About This Dashboard</p>
        <p className="text-gray-200 leading-relaxed">
          Every number on this site is sourced from official government records and public databases.
          Click any citation badge <span className="source-cite inline-flex">·</span> to see the source.
          Estimated figures are marked with <span className="text-yellow-300 font-bold">*</span>.
          This is a First Amendment-protected civic publication built by a Granby taxpayer.
        </p>
      </div>
    </section>
  );
}

export default ExecutiveSummary;
