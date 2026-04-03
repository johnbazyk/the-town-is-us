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
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import SourceCitation from './SourceCitation';
import { HOUSING_DATA, DEMOGRAPHIC_DATA } from '../data/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function DemographicsHousing() {
  const { population, ageDistribution, ageTrends } = DEMOGRAPHIC_DATA;

  // ── Population trend ───────────────────────────────────────────
  const popData = {
    labels: population.map(d => d.year.toString()),
    datasets: [
      {
        label: 'Population',
        data: population.map(d => d.pop),
        borderColor: '#8C1D40',
        backgroundColor: 'rgba(140,29,64,0.1)',
        borderWidth: 2.5,
        pointRadius: population.map(d => (d.isEstimate ? 3 : 5)),
        pointStyle: population.map(d => (d.isEstimate ? 'rect' : 'circle')),
        pointHoverRadius: 7,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const popOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const d = population[ctx.dataIndex];
            return ` ${ctx.parsed.y.toLocaleString()} residents${d.isEstimate ? ' (estimated)' : ''}${d.note ? ` — ${d.note}` : ''}`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 10500,
        max: 11500,
        title: { display: true, text: 'Population', color: '#666666', font: { size: 11 } },
        ticks: { callback: (v) => v.toLocaleString(), color: '#666666' },
        grid: { color: '#e5e5e5' },
      },
    },
  };

  // ── Age distribution bar chart ──────────────────────────────────
  // Filter out the 60-64 subset (it's a subset of 55-64, not a separate group)
  const ageGroups = ageDistribution.filter(d => d.range !== '60-64');

  const ageData = {
    labels: ageGroups.map(d => d.range),
    datasets: [
      {
        label: '% of Population',
        data: ageGroups.map(d => d.pct),
        backgroundColor: ageGroups.map(d =>
          d.range === '55-64' || d.range === '65-74' || d.range === '75+'
            ? '#c0392b'
            : d.range === '0-4' || d.range === '5-17'
            ? '#8C1D40'
            : '#D4A843'
        ),
        borderColor: 'transparent',
        borderRadius: 3,
      },
    ],
  };

  const ageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y}% of population`,
        },
      },
    },
    scales: {
      y: {
        title: { display: true, text: 'Share of population (%)', color: '#666666', font: { size: 11 } },
        ticks: { callback: (v) => `${v}%`, color: '#666666' },
        grid: { color: '#e5e5e5' },
      },
      x: {
        title: { display: true, text: 'Age group', color: '#666666', font: { size: 11 } },
      },
    },
  };

  // ── Under-18 vs 65+ trends ─────────────────────────────────────
  const trendData = {
    labels: ageTrends.map(d => d.year.toString()),
    datasets: [
      {
        label: 'Under 18 (%)',
        data: ageTrends.map(d => d.under18Pct),
        borderColor: '#8C1D40',
        backgroundColor: 'transparent',
        borderWidth: 2.5,
        pointRadius: ageTrends.map(d => (d.isEstimate ? 3 : 5)),
        tension: 0.3,
      },
      {
        label: '65+ (%)',
        data: ageTrends.map(d => d.over65Pct),
        borderColor: '#c0392b',
        backgroundColor: 'transparent',
        borderWidth: 2.5,
        pointRadius: ageTrends.map(d => (d.isEstimate ? 3 : 5)),
        borderDash: [5, 3],
        tension: 0.3,
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#2d2d2d' } },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const d = ageTrends[ctx.dataIndex];
            return ` ${ctx.dataset.label}: ${ctx.parsed.y}%${d.isEstimate ? ' (estimated)' : ''}`;
          },
        },
      },
    },
    scales: {
      y: {
        title: { display: true, text: '% of population', color: '#666666', font: { size: 11 } },
        ticks: { callback: (v) => `${v}%`, color: '#666666' },
        grid: { color: '#e5e5e5' },
      },
    },
  };

  // ── Housing value bar chart ─────────────────────────────────────
  const housingData = {
    labels: HOUSING_DATA.values.map(d => d.town),
    datasets: [
      {
        label: 'Zillow Home Value Index',
        data: HOUSING_DATA.values.map(d => d.zhvi),
        backgroundColor: HOUSING_DATA.values.map(d => d.highlight ? '#8C1D40' : '#D4A843'),
        borderColor: 'transparent',
        borderRadius: 3,
      },
    ],
  };

  const housingOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const d = HOUSING_DATA.values[ctx.dataIndex];
            return [
              ` Typical home value: $${ctx.parsed.y.toLocaleString()}`,
              ` Year-over-year change: +${d.yoyChange}%`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        min: 400000,
        title: { display: true, text: 'Typical home value ($)', color: '#666666', font: { size: 11 } },
        ticks: { callback: (v) => `$${(v / 1000).toFixed(0)}K`, color: '#666666' },
        grid: { color: '#e5e5e5' },
      },
    },
  };

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold text-granby-maroon mb-2">Town &amp; Housing Data</h2>

      {/* Plain-English intro */}
      <p className="text-granby-maroon leading-relaxed mb-4">
        Who lives in Granby, and what's happening with home values? This section puts the school
        data in context by showing enrollment trends alongside housing and demographic information.
      </p>

      <p className="text-muted text-sm mb-8">
        Figures marked <span className="estimate-marker">*</span> are ACS estimates with margins of error.
        <SourceCitation id="CENSUS_ACS" index={1} />
        <SourceCitation id="ZILLOW_GRANBY" index={2} />
      </p>

      {/* ── Demographic Narrative ────────────────────────────────── */}
      <div className="bg-granby-gold-light border-l-4 border-granby-maroon px-5 py-4 rounded-r mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-granby-maroon mb-2">Why Demographics Matter for the Budget</p>
        <p className="text-granby-maroon leading-relaxed text-sm">
          Granby's population has been flat-to-declining since its 2010 peak of 11,282. The share
          of residents under 18 has fallen from 27.5% to an estimated 19.5%, while residents 65+
          have risen from 11.8% to an estimated 21%. Fewer school-age children means fewer students —
          driving enrollment down about 20% since FY2016. With fixed costs spread over a shrinking
          student body, the cost per student rises even when the overall budget grows modestly.
          <SourceCitation id="CENSUS_ACS" index={1} />
        </p>
      </div>

      {/* ── Population Trend ─────────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Population Trend
          <SourceCitation id="CENSUS_ACS" index={1} />
        </h3>
        <p className="text-sm text-muted mb-4">
          Granby's population peaked around 2010. Square markers = ACS estimates.
          <span className="estimate-marker">*</span>
        </p>
        <div
          role="img"
          aria-label="Line chart showing Granby population peaking around 11,282 in 2010 and declining to an estimated 10,700 by 2023"
          className="bg-warm rounded p-4"
          style={{ height: 280 }}
        >
          <Line data={popData} options={popOptions} />
        </div>
        <p className="text-xs text-gray-500 mt-2">{DEMOGRAPHIC_DATA.note}</p>
      </div>

      {/* ── Under-18 vs 65+ ─────────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Fewer Young Residents, More Seniors
          <SourceCitation id="CENSUS_ACS" index={1} />
        </h3>
        <p className="text-sm text-muted mb-4">
          The lines are converging. When seniors outnumber school-age residents, it changes how the
          community thinks about school spending — and who bears the tax burden.
          <span className="estimate-marker">*</span>
        </p>
        <div
          role="img"
          aria-label="Line chart showing residents under 18 declining and residents 65 and over increasing, with the lines converging over time"
          className="bg-warm rounded p-4"
          style={{ height: 260 }}
        >
          <Line data={trendData} options={trendOptions} />
        </div>
        <p className="text-xs text-gray-500 mt-2">{DEMOGRAPHIC_DATA.ageTrendsNote}</p>
      </div>

      {/* ── Age Distribution ─────────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Age Distribution
          <SourceCitation id="CENSUS_ACS" index={1} />
        </h3>
        <p className="text-sm text-muted mb-1">
          Red bars = retirement-age cohorts (55+). Maroon bars = children under 18.
          Gold bars = working-age adults.
          <span className="estimate-marker">*</span>
        </p>
        <p className="text-xs text-gray-500 mb-4">{DEMOGRAPHIC_DATA.ageDistributionNote}</p>
        <div
          role="img"
          aria-label="Bar chart showing Granby age distribution, with notable concentrations in the 55-64 and 65-74 age groups"
          className="bg-warm rounded p-4"
          style={{ height: 280 }}
        >
          <Bar data={ageData} options={ageOptions} />
        </div>
      </div>

      {/* ── ZHVI Definition ──────────────────────────────────────── */}
      <div className="bg-granby-gold-light border-l-4 border-granby-gold px-5 py-4 rounded-r mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-granby-maroon mb-2">What Is the Zillow Home Value Index?</p>
        <p className="text-granby-maroon leading-relaxed text-sm">
          The Zillow Home Value Index (ZHVI) estimates what a typical home is worth in a given area.
          It's calculated from all homes — not just the ones that sold recently. We use it here
          because it gives a more stable picture than individual sale prices.
        </p>
      </div>

      {/* ── Housing Values ──────────────────────────────────────── */}
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Home Values: Granby vs. Peers ({HOUSING_DATA.asOf})
          <SourceCitation id="ZILLOW_GRANBY" index={2} />
          <SourceCitation id="ZILLOW_SIMSBURY" index={3} />
          <SourceCitation id="ZILLOW_SUFFIELD" index={4} />
        </h3>
        <p className="text-sm text-muted mb-4">
          Granby home values trail Simsbury by about $57K but exceed Suffield. Despite comparable
          property values, Granby ranks 34 spots lower in school quality than Simsbury.
        </p>
        <div
          role="img"
          aria-label="Bar chart comparing typical home values in Simsbury, Suffield, and Granby as of February 2026"
          className="bg-warm rounded p-4"
          style={{ height: 260 }}
        >
          <Bar data={housingData} options={housingOptions} />
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-sm">
          {HOUSING_DATA.values.map(d => (
            <div key={d.town} className={`rounded p-2 ${d.highlight ? 'bg-alert-red/10 border border-alert-red/30' : 'bg-warm'}`}>
              <span className={`font-bold ${d.highlight ? 'text-granby-maroon' : 'text-muted'}`}>
                ${d.zhvi.toLocaleString()}
              </span>
              <p className="text-xs text-gray-500">{d.town} (+{d.yoyChange}% YoY)</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">{HOUSING_DATA.note}</p>
      </div>
    </section>
  );
}

export default DemographicsHousing;
