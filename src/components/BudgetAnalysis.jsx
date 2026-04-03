import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import SourceCitation from './SourceCitation';
import { BUDGET_DATA, BUDGET_COMPOSITION } from '../data/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function fmt$(n) {
  return '$' + (n / 1_000_000).toFixed(2) + 'M';
}

function BudgetAnalysis() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const years = BUDGET_DATA.years;
  const labels = years.map(y => y.fy);

  // ── Scissors chart data ──────────────────────────────────────────
  const scissorsData = {
    labels,
    datasets: [
      {
        label: 'BOE Budget ($M)',
        data: years.map(y => +(y.boeBudget / 1_000_000).toFixed(3)),
        borderColor: '#8C1D40',
        backgroundColor: 'rgba(140,29,64,0.08)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'Enrollment',
        data: years.map(y => y.enrollment),
        borderColor: '#c0392b',
        backgroundColor: 'rgba(192,57,43,0.08)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: false,
        yAxisID: 'y1',
        borderDash: [5, 3],
      },
    ],
  };

  const scissorsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top', labels: { color: '#2d2d2d' } },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            if (ctx.datasetIndex === 0) return ` Budget: $${ctx.parsed.y.toFixed(2)}M`;
            return ` Enrollment: ${ctx.parsed.y.toLocaleString()} students`;
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        title: { display: true, text: 'BOE Budget ($M)', color: '#8C1D40', font: { size: 12 } },
        ticks: {
          callback: (v) => `$${v}M`,
          color: '#666666',
        },
        grid: { color: '#e5e5e5' },
      },
      y1: {
        type: 'linear',
        position: 'right',
        title: { display: true, text: 'Students enrolled', color: '#c0392b', font: { size: 12 } },
        grid: { drawOnChartArea: false },
        ticks: { color: '#c0392b' },
      },
    },
  };

  // ── Per-pupil spending data ─────────────────────────────────────
  const perPupilData = {
    labels,
    datasets: [
      {
        label: 'Cost Per Student',
        data: years.map(y => Math.round(y.boeBudget / y.enrollment)),
        borderColor: '#D4A843',
        backgroundColor: 'rgba(212,168,67,0.15)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const perPupilOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` $${ctx.parsed.y.toLocaleString()} per student`,
        },
      },
    },
    scales: {
      y: {
        title: { display: true, text: 'Cost Per Student ($)', color: '#666666', font: { size: 12 } },
        ticks: { callback: (v) => '$' + v.toLocaleString(), color: '#666666' },
        grid: { color: '#e5e5e5' },
      },
    },
  };

  // ── Pie chart data ──────────────────────────────────────────────
  const pieColors = ['#8C1D40', '#D4A843', '#c0392b', '#5a6f7a', '#2d2d2d', '#a67c52'];
  const pieData = {
    labels: BUDGET_COMPOSITION.categories.map(c => c.label),
    datasets: [
      {
        data: BUDGET_COMPOSITION.categories.map(c => c.pct),
        backgroundColor: pieColors,
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        labels: { boxWidth: 14, padding: isMobile ? 8 : 12, color: '#2d2d2d' },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  };

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold text-granby-maroon mb-2">Budget Analysis</h2>

      {/* Plain-English intro */}
      <p className="text-granby-maroon leading-relaxed mb-4">
        This section breaks down Granby's school spending year by year. You'll see how the total
        budget has changed, where the money goes, and how student enrollment has shifted. When
        budgets grow but enrollment shrinks, the cost per student rises — that's a pattern worth
        understanding.
      </p>

      <p className="text-muted text-sm mb-8">
        FY2016–FY2027. Figures marked <span className="estimate-marker">*</span> are approximate
        and pending verification from budget books.
        <SourceCitation id="FY27_TOWN_BUDGET" index={1} />
      </p>

      {/* What's a Mill Rate? explainer */}
      <div className="bg-granby-gold-light border-l-4 border-granby-gold px-5 py-4 rounded-r mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-granby-maroon mb-2">What's a Mill Rate?</p>
        <p className="text-granby-maroon leading-relaxed text-sm">
          Your property tax bill depends on two things: your home's assessed value and the mill rate.
          The mill rate is the amount of tax per $1,000 of assessed value. For example, if your home
          is assessed at $300,000 and the mill rate is 12, your school tax would be about $3,600 per
          year (300 × $12).
        </p>
      </div>

      {/* ── Scissors Chart ───────────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          The School Budget Grew While Student Numbers Fell
          <SourceCitation id="FY27_TOWN_BUDGET" index={1} />
          <SourceCitation id="FY2016_BUDGET_BOOK" index={2} />
        </h3>
        <p className="text-sm text-muted mb-4">
          Budget rising as enrollment falls — the two lines diverge like scissor blades.
          As of FY2027, the district spends on 350 fewer students than in FY2016 but budgets $12.5M more.
        </p>
        <div
          role="img"
          aria-label="Line chart showing the school budget growing from $28.4 million in FY2016 to $40.9 million in FY2027 while student enrollment fell from about 2,050 to 1,648"
          className="bg-warm rounded p-4"
          style={{ height: 320 }}
        >
          <Line data={scissorsData} options={scissorsOptions} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          FY2016–FY2021 budget and enrollment figures are approximate estimates.
          <span className="estimate-marker">*</span>{' '}
          FY2022–FY2027 are from verified budget documents.
        </p>
      </div>

      {/* ── Per-Pupil Chart ──────────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Granby Has About 350 Fewer Students Than a Decade Ago — But Spends More Per Student
          <SourceCitation id="NCEP_2026" index={3} />
        </h3>
        <p className="text-sm text-muted mb-4">
          Cost per student is calculated as BOE budget ÷ enrollment. Granby now spends as much per
          student as districts consistently ranked in the state's top 10 — but without top-10 outcomes.
        </p>
        <div
          role="img"
          aria-label="Line chart showing cost per student rising from roughly $13,800 in FY2016 to nearly $24,800 in FY2027"
          className="bg-warm rounded p-4"
          style={{ height: 280 }}
        >
          <Line data={perPupilData} options={perPupilOptions} />
        </div>
      </div>

      {/* ── Ratchet Effect Explanation ───────────────────────────── */}
      <div className="bg-warm border-l-4 border-granby-gold px-5 py-4 rounded-r mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-granby-maroon mb-2">Why Costs Don't Go Down When Enrollment Drops</p>
        <p className="text-granby-maroon leading-relaxed text-sm">
          Schools have "fixed costs" — buildings, buses, heating, and base staffing — that stay
          roughly the same whether there are 1,700 students or 2,000. When fewer students are
          enrolled, those fixed costs get divided among fewer families, so the cost per student
          rises. Economists call this the "ratchet effect" because spending ratchets up easily
          but rarely comes back down.
        </p>
      </div>

      {/* ── Pie Chart ───────────────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Where Your School Tax Dollars Go
          <SourceCitation id="FY27_BOE_BUDGET" index={4} />
        </h3>
        <p className="text-sm text-muted mb-1">
          Approximate breakdown of the proposed $40.9M BOE budget.
          <span className="estimate-marker">*</span>
        </p>
        <p className="text-xs text-gray-500 mb-4">
          {BUDGET_COMPOSITION.note}
        </p>
        <div
          role="img"
          aria-label="Pie chart showing FY2027 budget composition: Salaries and wages 56%, Benefits 17%, Purchased services 11%, Tuition 8%, Maintenance and utilities 4%, Supplies 3%, Activities 1%"
          className="bg-warm rounded p-4 flex justify-center"
          style={{ height: 280 }}
        >
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* ── Data Table ──────────────────────────────────────────── */}
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-4 border-b border-gray-200 pb-2">
          Year-Over-Year Data Table
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-granby-maroon text-white">
                <th className="text-left px-3 py-2 font-semibold">Year</th>
                <th className="text-right px-3 py-2 font-semibold">BOE Budget</th>
                <th className="text-right px-3 py-2 font-semibold">Students</th>
                <th className="text-right px-3 py-2 font-semibold">Cost Per Student</th>
                <th className="text-right px-3 py-2 font-semibold">Tax Rate (per $1,000)</th>
                <th className="text-center px-3 py-2 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {years.map((row) => {
                const perPupil = Math.round(row.boeBudget / row.enrollment);
                return (
                  <tr
                    key={row.fy}
                    className="border-b border-gray-100 odd:bg-warm hover:bg-granby-gold-light transition-colors"
                  >
                    <td className="px-3 py-2 font-medium">
                      {row.fy}
                      {row.isProjected && (
                        <span className="ml-1 text-xs text-muted italic">(proj.)</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {fmt$(row.boeBudget)}
                      {row.isEstimate && <span className="estimate-marker" title="Estimated — needs verification">*</span>}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {row.enrollment.toLocaleString()}
                      {row.isEstimate && <span className="estimate-marker" title="Estimated — needs verification">*</span>}
                    </td>
                    <td className="px-3 py-2 text-right">
                      ${perPupil.toLocaleString()}
                      {row.isEstimate && <span className="estimate-marker" title="Estimated — needs verification">*</span>}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {row.millRate != null ? row.millRate : '—'}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <SourceCitation id={row.source} index={row.isEstimate ? 2 : 1} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          <span className="estimate-marker">*</span> Estimated — original budget books available from{' '}
          <a href="https://www.granbyschools.org/documents/board-of-education/budget-information" target="_blank" rel="noopener noreferrer" className="text-granby-maroon hover:underline">Granby Public Schools</a>.
          Tax rate (mill rate) for FY2016–FY2021 not extracted yet.
        </p>
      </div>

      <div className="mt-6 text-xs text-gray-500 border-t border-gray-200 pt-4">
        {BUDGET_DATA.note}
      </div>
    </section>
  );
}

export default BudgetAnalysis;
