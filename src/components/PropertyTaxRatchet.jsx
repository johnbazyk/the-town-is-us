import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import SourceCitation from './SourceCitation';
import { TAX_BILLS, BUDGET_DATA } from '../data/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PropertyTaxRatchet() {
  const bills = TAX_BILLS.bills;

  // Mill rate data — only years where we have a mill rate
  const millRateYears = BUDGET_DATA.years.filter(y => y.millRate != null);

  // ── Mill rate line chart ────────────────────────────────────────
  const millData = {
    labels: millRateYears.map(y => y.fy),
    datasets: [
      {
        label: 'Tax Rate (per $1,000)',
        data: millRateYears.map(y => y.millRate),
        borderColor: '#8C1D40',
        backgroundColor: 'rgba(140,29,64,0.1)',
        borderWidth: 2.5,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const millOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` Tax rate: ${ctx.parsed.y} mills`,
        },
      },
    },
    scales: {
      y: {
        min: 28,
        title: { display: true, text: 'Tax Rate (mills per $1,000)', color: '#666666', font: { size: 11 } },
        ticks: { color: '#666666' },
        grid: { color: '#e5e5e5' },
      },
    },
  };

  // ── Tax bill bar chart ──────────────────────────────────────────
  const billColors = bills.map((_, i) =>
    i === bills.length - 1 ? '#c0392b' : '#8C1D40'
  );

  const taxData = {
    labels: bills.map(b => b.year),
    datasets: [
      {
        label: 'Actual Tax Bill',
        data: bills.map(b => b.tax),
        backgroundColor: billColors,
        borderColor: billColors.map(c => c === '#c0392b' ? '#a93226' : '#7a1836'),
        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  };

  const taxOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const b = bills[ctx.dataIndex];
            return [
              ` Tax bill: $${b.tax.toLocaleString()}`,
              ` Assessment: $${b.assessment.toLocaleString()}`,
              ` Tax rate: ${b.millRate} mills`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        min: 9000,
        title: { display: true, text: 'Annual Tax Bill ($)', color: '#666666', font: { size: 11 } },
        ticks: { callback: (v) => `$${v.toLocaleString()}`, color: '#666666' },
        grid: { color: '#e5e5e5' },
      },
    },
  };

  // ── Derived stats ───────────────────────────────────────────────
  const firstBill = bills[0];
  const lastBill = bills[bills.length - 1];
  const totalIncrease = lastBill.tax - firstBill.tax;
  const pctIncrease = ((totalIncrease / firstBill.tax) * 100).toFixed(1);

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold text-granby-maroon mb-2">
        How Property Taxes Work — and Why They Keep Going Up
      </h2>

      {/* Plain-English intro */}
      <p className="text-granby-maroon leading-relaxed mb-4">
        If you own a home in Granby, you pay property taxes that fund the school district. This
        section explains how those taxes are calculated, how they've changed over the years, and
        why they tend to go up even when the tax rate drops.
      </p>

      <p className="text-muted text-sm mb-8">
        How tax bills keep rising even when the tax rate falls. Actual bills for{' '}
        <span className="font-semibold">{TAX_BILLS.property}</span>.
        <SourceCitation id="TAX_BILLS" index={1} />
      </p>

      {/* ── Summary stats ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-warm border-l-4 border-granby-maroon px-4 py-4 rounded-r text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">FY22 Tax Bill</p>
          <p className="font-heading text-3xl font-black text-granby-maroon">
            ${firstBill.tax.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Tax rate: {firstBill.millRate} mills</p>
        </div>
        <div className="bg-alert-red/10 border-l-4 border-alert-red px-4 py-4 rounded-r text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-alert-red mb-1">FY25 Tax Bill</p>
          <p className="font-heading text-3xl font-black text-alert-red">
            ${lastBill.tax.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Tax rate: {lastBill.millRate} mills</p>
        </div>
        <div className="bg-warm border-l-4 border-granby-gold px-4 py-4 rounded-r text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">3-Year Increase</p>
          <p className="font-heading text-3xl font-black text-granby-maroon">
            +${totalIncrease.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">+{pctIncrease}% in 3 years</p>
        </div>
      </div>

      {/* ── Ratchet Explanation ──────────────────────────────────── */}
      <div className="bg-warm border-l-4 border-granby-gold px-5 py-4 rounded-r mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-granby-maroon mb-2">How the Ratchet Works</p>
        <p className="text-granby-maroon leading-relaxed text-sm">
          {TAX_BILLS.ratchetExplanation}
          <SourceCitation id="TAX_BILLS" index={1} />
        </p>
        <p className="text-sm text-muted mt-3">
          In plain terms: a reassessment lets the town reset home values upward at a rate that
          exceeds any tax rate cut. The net result — higher bills — becomes the new baseline.
          The next reassessment repeats the cycle.
        </p>
      </div>

      {/* ── Tax Bill Chart ──────────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Actual Tax Bills — Year Over Year
          <SourceCitation id="TAX_BILLS" index={1} />
        </h3>
        <p className="text-sm text-muted mb-4">
          82 Harmony Hill Road, Parcel 06500082. Most recent year shown in red.
        </p>
        <div
          role="img"
          aria-label="Bar chart showing annual school property tax bills rising each year from FY2022 to FY2025"
          className="bg-warm rounded p-4"
          style={{ height: 280 }}
        >
          <Bar data={taxData} options={taxOptions} />
        </div>
      </div>

      {/* ── Mill Rate Chart ─────────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Tax Rate History (FY2022–FY2027)
          <SourceCitation id="FY27_TOWN_BUDGET" index={2} />
        </h3>
        <p className="text-sm text-muted mb-4">
          The tax rate dropped sharply in FY2023 due to the town-wide reassessment — but tax bills
          still increased because assessed values jumped more than the rate dropped.
        </p>
        <div
          role="img"
          aria-label="Line chart showing Granby mill rate history from FY2022 to FY2027, with a sharp drop in FY2023 followed by gradual increases"
          className="bg-warm rounded p-4"
          style={{ height: 260 }}
        >
          <Line data={millData} options={millOptions} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Tax rate data only available FY2022–FY2027. FY2016–FY2021 not yet extracted from budget books.
        </p>
      </div>

      {/* ── Detail Table ─────────────────────────────────────────── */}
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-4 border-b border-gray-200 pb-2">
          Assessment, Tax Rate &amp; Bill Detail
          <SourceCitation id="TAX_BILLS" index={1} />
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-granby-maroon text-white">
                <th className="text-left px-4 py-2 font-semibold">Year</th>
                <th className="text-right px-4 py-2 font-semibold">Home Assessment</th>
                <th className="text-right px-4 py-2 font-semibold">Tax Rate (per $1,000)</th>
                <th className="text-right px-4 py-2 font-semibold">Tax Bill</th>
                <th className="text-right px-4 py-2 font-semibold">Change from Prior Year</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b, i) => {
                const prev = bills[i - 1];
                const change = prev ? b.tax - prev.tax : null;
                const changePct = prev ? ((change / prev.tax) * 100).toFixed(1) : null;
                return (
                  <tr
                    key={b.year}
                    className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-warm' : 'bg-white'}`}
                  >
                    <td className="px-4 py-2 font-medium">{b.year}</td>
                    <td className="px-4 py-2 text-right">${b.assessment.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">{b.millRate}</td>
                    <td className="px-4 py-2 text-right font-semibold">${b.tax.toLocaleString()}</td>
                    <td className={`px-4 py-2 text-right ${change > 0 ? 'text-alert-red font-semibold' : 'text-gray-500'}`}>
                      {change != null
                        ? `+$${change.toFixed(2)} (+${changePct}%)`
                        : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Source: Actual property tax bills, {TAX_BILLS.property}.
          All four years verified from original tax bill documents.
        </p>
      </div>
    </section>
  );
}

export default PropertyTaxRatchet;
