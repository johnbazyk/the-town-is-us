import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import SourceCitation from './SourceCitation';
import { BULLYING_DATA, SCHOOL_CLIMATE_TIMELINE } from '../data/data';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SCHOOL_LABELS = {
  kellyLane: 'Kelly Lane',
  wellsRoad: "Wells Road",
  gmms: 'GMMS',
  gmhs: 'GMHS',
};

const SCHOOL_COLORS = {
  kellyLane: '#8C1D40',
  wellsRoad: '#D4A843',
  gmms: '#5a6f7a',
  gmhs: '#c0392b',
};

function SchoolClimate() {
  const { verifiedIncidents, climateSurvey } = BULLYING_DATA;

  // ── Grouped bar chart: incidents by school ──────────────────────
  const schools = ['kellyLane', 'wellsRoad', 'gmms', 'gmhs'];

  const incidentData = {
    labels: verifiedIncidents.map(d => d.year),
    datasets: schools.map(school => ({
      label: SCHOOL_LABELS[school],
      data: verifiedIncidents.map(d => d[school]),
      backgroundColor: SCHOOL_COLORS[school],
      borderColor: 'transparent',
      borderRadius: 2,
    })),
  };

  const incidentOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#2d2d2d' } },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} verified incident${ctx.parsed.y !== 1 ? 's' : ''}`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: { stepSize: 1, color: '#666666' },
        title: { display: true, text: 'Verified bullying incidents', color: '#666666', font: { size: 11 } },
        grid: { color: '#e5e5e5' },
      },
    },
  };

  // ── Horizontal bar chart: climate survey ───────────────────────
  const surveySchools = [
    { key: 'kellyLane', label: 'Kelly Lane', pct: climateSurvey.kellyLane },
    { key: 'wellsRoad', label: "Wells Road", pct: climateSurvey.wellsRoad },
    { key: 'gmms', label: 'GMMS', pct: climateSurvey.gmms },
    { key: 'gmhs', label: 'GMHS', pct: climateSurvey.gmhs },
  ];

  const surveyData = {
    labels: surveySchools.map(s => s.label),
    datasets: [
      {
        label: '% Agreeing Child is Safe',
        data: surveySchools.map(s => s.pct),
        backgroundColor: surveySchools.map(s =>
          s.pct >= 90 ? '#8C1D40' : s.pct >= 80 ? '#D4A843' : '#c0392b'
        ),
        borderColor: 'transparent',
        borderRadius: 3,
      },
    ],
  };

  const surveyOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.x}% of parents agree`,
        },
      },
    },
    scales: {
      x: {
        min: 60,
        max: 100,
        title: { display: true, text: 'Families agreeing their child is safe (%)', color: '#666666', font: { size: 11 } },
        ticks: { callback: (v) => `${v}%`, color: '#666666' },
        grid: { color: '#e5e5e5' },
      },
    },
  };

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold text-granby-maroon mb-2">School Climate &amp; Safety</h2>

      {/* Plain-English intro */}
      <p className="text-granby-maroon leading-relaxed mb-4">
        School climate is about more than test scores — it includes how safe students feel, how
        bullying is handled, and what families say in surveys. This section shows Granby's bullying
        reports and parent/student survey results over time.
      </p>

      <p className="text-muted text-sm mb-8">
        Data from the December 3, 2025 BOE climate presentation and PA 23-167 mandatory reporting.
        <SourceCitation id="CLIMATE_DEC2025" index={1} />
        <SourceCitation id="PA_23_167" index={2} />
      </p>

      {/* ── Kelly Lane callout ─────────────────────────────────── */}
      <div className="bg-granby-maroon text-white rounded px-5 py-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="text-3xl font-black font-heading">0</div>
        <div>
          <p className="font-bold">Kelly Lane: Zero verified bullying incidents — every year on record.</p>
          <p className="text-gray-200 text-sm mt-0.5">
            5 consecutive years with zero incidents across all recorded periods.
            <SourceCitation id="CLIMATE_DEC2025" index={1} />
          </p>
        </div>
      </div>

      {/* ── Verified Incidents Chart ─────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Verified Bullying Incidents by School
          <SourceCitation id="CLIMATE_DEC2025" index={1} />
          <SourceCitation id="PA_23_167" index={2} />
        </h3>
        <p className="text-sm text-muted mb-4">
          Only verified incidents under PA 23-167 reporting standards. Reports that were investigated
          and found unsubstantiated are not counted.
        </p>
        <div
          role="img"
          aria-label="Grouped bar chart showing verified bullying incidents by school over five years, with Kelly Lane showing zero incidents each year"
          className="bg-warm rounded p-4"
          style={{ height: 300 }}
        >
          <Bar data={incidentData} options={incidentOptions} />
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm">
          {schools.map(school => {
            const total = verifiedIncidents.reduce((sum, y) => sum + y[school], 0);
            return (
              <div key={school} className="bg-warm rounded p-2">
                <span className="font-bold text-granby-maroon">{total}</span>
                <p className="text-xs text-gray-500">{SCHOOL_LABELS[school]} (5yr total)</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Climate Survey Chart ─────────────────────────────────── */}
      <div className="mb-10">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-1">
          Climate Survey: "My child is physically and emotionally safe at school"
          <SourceCitation id="CLIMATE_DEC2025" index={1} />
        </h3>
        <p className="text-sm text-muted mb-1">
          Percentage of families agreeing with the statement, by school.
          <span className="estimate-marker">*</span>
        </p>
        <p className="text-xs text-gray-500 mb-4">{climateSurvey.note}</p>
        <div
          role="img"
          aria-label="Horizontal bar chart showing percentage of families who agree their child is safe at each Granby school"
          className="bg-warm rounded p-4"
          style={{ height: 200 }}
        >
          <Bar data={surveyData} options={surveyOptions} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          <span className="estimate-marker">*</span> {climateSurvey.note}
        </p>
      </div>

      {/* ── Bullying Form Accessibility ──────────────────────────── */}
      <div className="mb-8">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-3 border-b border-gray-200 pb-2">
          Reporting Access: Is the Form Easy to Find?
          <SourceCitation id="GPS_WEBSITE" index={3} />
        </h3>
        <div className="bg-warm rounded p-5 text-sm text-granby-maroon leading-relaxed">
          <p className="mb-2">
            Connecticut PA 23-167 requires each school to make bullying report forms accessible to
            students and families. The Granby Public Schools website hosts these forms — but finding
            them requires navigating multiple menu levels. There is no direct link from the school
            homepage or the student/parent portal.
            <SourceCitation id="PA_23_167" index={2} />
          </p>
          <p>
            Barriers to reporting are a documented factor in underreporting. If families can't find
            the form, incidents go uninvestigated — and the "verified incidents" count stays
            artificially low.
          </p>
        </div>
      </div>

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-granby-maroon mb-4 border-b border-gray-200 pb-2">
          Notable Incidents &amp; Events
        </h3>
        <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
          {SCHOOL_CLIMATE_TIMELINE.map((event, i) => (
            <div key={i} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full bg-granby-maroon border-2 border-white ring-2 ring-granby-maroon" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted mb-0.5">
                {event.date}
              </p>
              <p className="font-heading font-bold text-granby-maroon">{event.event}</p>
              <p className="text-sm text-muted mt-0.5 leading-relaxed">{event.description}</p>
              <span className="mt-1 inline-block">
                <SourceCitation id={event.source} index={i + 4} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Amanda Doe Lawsuit callout ──────────────────────────── */}
      <div className="mt-8 bg-alert-red/10 border-l-4 border-alert-red px-5 py-4 rounded-r">
        <p className="text-xs font-bold uppercase tracking-widest text-alert-red mb-2">Active Litigation</p>
        <p className="text-granby-maroon text-sm leading-relaxed">
          The Amanda Doe lawsuit (Hartford Superior Court, filed September 2024) alleges that the
          Town of Granby failed to protect a former GMMS student from bullying and sexual harassment.
          The lawsuit is ongoing. No finding of liability has been made.
          <SourceCitation id="AMANDA_DOE_LAWSUIT" index={5} />
        </p>
      </div>
    </section>
  );
}

export default SchoolClimate;
