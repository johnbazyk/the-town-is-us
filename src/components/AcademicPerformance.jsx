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
import { ACADEMIC_DATA } from '../data/data';

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

function AcademicPerformance() {
  const { districtRanking, mathProficiency, satBenchmarks2024, peerComparison } = ACADEMIC_DATA;

  // ── District ranking chart (inverted Y: lower rank number = higher position) ──
  const rankingData = {
    labels: districtRanking.map(d => d.year.toString()),
    datasets: [
      {
        label: 'State Ranking (out of 156)',
        data: districtRanking.map(d => d.rank),
        borderColor: '#c0392b',
        backgroundColor: 'rgba(192,57,43,0.1)',
        borderWidth: 2.5,
        pointRadius: districtRanking.map(d => (d.isEstimate ? 3 : 5)),
        pointStyle: districtRanking.map(d => (d.isEstimate ? 'rect' : 'circle')),
        pointHoverRadius: 7,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const rankingOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const d = districtRanking[ctx.dataIndex];
            return ` Rank #${ctx.parsed.y} of ${d.totalDistricts}${d.isEstimate ? ' (estimated)' : ''}`;
          },
        },
      },
    },
    scales: {
      y: {
        reverse: true,
        min: 1,
        max: 60,
        title: { display: true, text: '← Better          State Ranking          Worse →', color: '#666666', font: { size: 11 } },
        ticks: {
          callback: (v) => `#${v}`,
          color: '#666666',
        },
        grid: { color: '#e5e5e5' },
      },
      x: {
        grid: { color: '#e5e5e5' },
      },
    },
  };

  // ── Math proficiency chart ──────────────────────────────────────
  const mathData = {
    labels: mathProficiency.map(d => d.year),
    datasets: [
      {
        label: 'Math Proficiency (%)',
        data: mathProficiency.map(d => d.pct),
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

  const mathOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const d = mathProficiency[ctx.dataIndex];
            return ` ${ctx.parsed.y}% proficient${d.note ? ` — ${d.note}` : ''}`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 40,
        max: 75,
        title: { display: true, text: 'Students meeting the standard (%)', color: '#666666', font: { size: 11 } },
        ticks: { callback: (v) => `${v}%`, color: '#666666' },
        grid: { color: '#e5e5e5' },
      },
    },
  };

  // ── SAT benchmarks bar chart ────────────────────────────────────
  const satData = {
    labels: ['Math', 'ELA / Reading', 'Science'],
    datasets: [
      {
        label: '% Meeting Benchmark (2024)',
        data: [
          satBenchmarks2024.math.pct,
          satBenchmarks2024.ela.pct,
          satBenchmarks2024.science.pct,
        ],
        backgroundColor: ['#8C1D40', '#D4A843', '#5a6f7a'],
        borderColor: ['#7a1836', '#c09a3a', '#4e6069'],
        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  };

  const satOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y}% met benchmark`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: { display: true, text: '% of students meeting the SAT benchmark', color: '#666666', font: { size: 11 } },
        ticks: { callback: (v) => `${v}%`, color: '#666666' },
        grid: { color: '#e5e5e5' },
      },
    },
  };

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold text-granby-maroon mb-2">Academic Performance</h2>

      {/* Plain-English intro */}
      <p className="text-granby-maroon leading-relaxed mb-4">
        How are Granby students actually doing? This section shows test scores, state rankings,
        and how we compare to towns that spend about the same amount per student. The goal isn't
        to alarm anyone — it's to show where we're strong and where there's room to improve.
      </p>

      <p className="text-muted text-sm mb-8">
        Figures marked <span className="estimate-marker">*</span> are approximate interpolations.
        Ranking source: SchoolDigger (Aug 2025).
        <SourceCitation id="SCHOOLDIGGER" index={1} />
        <SourceCitation id="CT_EDSIGHT" index={2} />
      </p>

      {/* What Does 'Proficiency' Mean? explainer */}
      <div className="bg-granby-gold-light border-l-4 border-granby-gold px-5 py-4 rounded-r mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-granby-maroon mb-2">What Does "Proficiency" Mean?</p>
        <p className="text-granby-maroon leading-relaxed text-sm">
          When we say a student is "proficient," it means they scored at the level Connecticut
          considers grade-appropriate on standardized tests. It doesn't mean perfect — it means
          on track. A proficiency rate of 60% means 6 out of 10 students met the state's benchmark.
        </p>
      </div>

      {/* ── Ranking callout ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-warm border-l-4 border-granby-maroon px-4 py-4 rounded-r text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">2013 State Rank</p>
          <p className="font-heading text-3xl sm:text-4xl font-black text-granby-maroon">#4</p>
          <p className="text-xs text-gray-500 mt-1">out of 156 districts</p>
          <SourceCitation id="PUBLIC_SCHOOL_REVIEW" index={3} />
        </div>
        <div className="bg-alert-red/10 border-l-4 border-alert-red px-4 py-4 rounded-r text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-alert-red mb-1">2025 State Rank</p>
          <p className="font-heading text-3xl sm:text-4xl font-black text-alert-red">#46</p>
          <p className="text-xs text-gray-500 mt-1">out of 156 districts</p>
          <SourceCitation id="SCHOOLDIGGER" index={1} />
        </div>
        <div className="bg-warm border-l-4 border-granby-gold px-4 py-4 rounded-r text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Math Proficiency Drop</p>
          <p className="font-heading text-3xl sm:text-4xl font-black text-granby-maroon">−10 pts</p>
          <p className="text-xs text-gray-500 mt-1">64% → 54% since 2016–17</p>
          <SourceCitation id="CT_EDSIGHT" index={2} />
        </div>
      </div>

      {/* ── Ranking Chart ───────────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Granby's State Ranking Dropped from #4 to #46 in 12 Years
          <SourceCitation id="PUBLIC_SCHOOL_REVIEW" index={3} />
          <SourceCitation id="SCHOOLDIGGER" index={1} />
        </h3>
        <p className="text-sm text-muted mb-4">
          Chart is inverted: higher on the chart means a better rank.
          Square markers = interpolated estimates.
          <span className="estimate-marker">*</span>
        </p>
        <div
          role="img"
          aria-label="Line chart showing Granby's state ranking falling from #4 in 2013 to #46 in 2025 out of 156 Connecticut school districts"
          className="bg-warm rounded p-4"
          style={{ height: 300 }}
        >
          <Line data={rankingData} options={rankingOptions} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {ACADEMIC_DATA.note}
        </p>
      </div>

      {/* ── Math Proficiency Chart ──────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Fewer Granby Students Are Meeting Math Standards
          <SourceCitation id="CT_EDSIGHT" index={2} />
        </h3>
        <p className="text-sm text-muted mb-4">
          Percentage of students scoring at or above grade level on state math assessments.
          COVID year (2019–20) was not assessed — gap in data.
        </p>
        <div
          role="img"
          aria-label="Line chart showing Granby math proficiency falling from 64% in 2016-17 to 54% in 2023-24"
          className="bg-warm rounded p-4"
          style={{ height: 280 }}
        >
          <Line data={mathData} options={mathOptions} />
        </div>
      </div>

      {/* ── SAT Benchmarks Chart ────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          How Granby SAT Scores Compare to State Benchmarks
          <SourceCitation id="CT_EDSIGHT" index={2} />
        </h3>
        <p className="text-sm text-muted mb-4">
          Percentage of Granby Memorial High School students meeting SAT college-readiness benchmarks (2024).
        </p>
        <div
          role="img"
          aria-label="Bar chart showing percentage of GMHS students meeting SAT benchmarks in 2024: Math, ELA/Reading, and Science"
          className="bg-warm rounded p-4"
          style={{ height: 240 }}
        >
          <Bar data={satData} options={satOptions} />
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-sm">
          <div className="bg-warm rounded p-2">
            <span className="font-bold text-granby-maroon">{satBenchmarks2024.math.pct}%</span>
            <p className="text-xs text-gray-500">Math</p>
          </div>
          <div className="bg-warm rounded p-2">
            <span className="font-bold text-granby-gold">{satBenchmarks2024.ela.pct}%</span>
            <p className="text-xs text-gray-500">ELA / Reading</p>
          </div>
          <div className="bg-warm rounded p-2">
            <span className="font-bold text-muted">{satBenchmarks2024.science.pct}%</span>
            <p className="text-xs text-gray-500">Science</p>
          </div>
        </div>
      </div>

      {/* ── Peer Comparison Table ───────────────────────────────── */}
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-4 border-b border-gray-200 pb-2">
          Peer District Comparison
          <SourceCitation id="NCEP_2026" index={4} />
          <SourceCitation id="SCHOOLDIGGER" index={1} />
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
              {peerComparison.map((row) => (
                <tr
                  key={row.district}
                  className={
                    row.highlight
                      ? 'bg-alert-red/10 border-l-4 border-alert-red font-semibold'
                      : 'border-b border-gray-100 odd:bg-warm'
                  }
                >
                  <td className="px-4 py-2">
                    {row.district}
                    {row.highlight && ' ◄'}
                  </td>
                  <td className="px-4 py-2 text-right">${row.perPupil.toLocaleString()}</td>
                  <td className={`px-4 py-2 text-right ${row.highlight && row.math < 60 ? 'text-alert-red font-bold' : ''}`}>
                    {row.math}%
                  </td>
                  <td className={`px-4 py-2 text-right ${row.highlight && row.reading < 70 ? 'text-alert-red font-bold' : ''}`}>
                    {row.reading}%
                  </td>
                  <td className={`px-4 py-2 text-right ${row.highlight ? 'text-alert-red font-bold' : ''}`}>
                    #{row.rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Cost Per Student = Net Current Expenditure Per Pupil (CT Bureau of Fiscal Services, Jan 2026).
          Granby's per-student spending is comparable to top-10 districts — outcomes are not.
        </p>
      </div>
    </section>
  );
}

export default AcademicPerformance;
