import React, { useState } from 'react';
import SourceCitation from './SourceCitation';
import { FACT_CHECK_DATA } from '../data/data';
import { SOURCES } from '../data/sources';

const VERDICT_CONFIG = {
  misleading: {
    label: 'Misleading — The Claim Leaves Out Important Context',
    shortLabel: 'MISLEADING',
    bg: 'bg-orange-100',
    border: 'border-orange-500',
    text: 'text-orange-700',
    dot: 'bg-orange-500',
  },
  false: {
    label: 'False — The Data Doesn\'t Support This',
    shortLabel: 'FALSE',
    bg: 'bg-red-100',
    border: 'border-alert-red',
    text: 'text-alert-red',
    dot: 'bg-alert-red',
  },
  'missing-context': {
    label: 'Partly True — But Missing Key Details',
    shortLabel: 'PARTLY TRUE',
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-700',
    dot: 'bg-yellow-500',
  },
  true: {
    label: 'True — The Data Backs This Up',
    shortLabel: 'ACCURATE',
    bg: 'bg-green-50',
    border: 'border-green-600',
    text: 'text-green-700',
    dot: 'bg-green-600',
  },
};

function VerdictBadge({ verdict }) {
  const cfg = VERDICT_CONFIG[verdict] || VERDICT_CONFIG['missing-context'];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${cfg.bg} ${cfg.text}`}>
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
      {cfg.shortLabel}
    </span>
  );
}

function ClaimCard({ claim, index }) {
  const cfg = VERDICT_CONFIG[claim.verdict] || VERDICT_CONFIG['missing-context'];
  return (
    <div className="mb-8">
      <div className="flex items-start gap-2 mb-2 flex-wrap">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Claim {index}</span>
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded ${cfg.bg} ${cfg.text}`}>
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded overflow-hidden border border-gray-200">
        {/* Left: What was claimed */}
        <div className="claim-box">
          <p className="text-xs font-bold uppercase tracking-widest text-alert-red mb-2">
            What Was Claimed
          </p>
          <p className="text-sm text-granby-maroon leading-relaxed italic">
            "{claim.claim}"
          </p>
        </div>
        {/* Right: What the data shows */}
        <div className="data-box">
          <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">
            What the Data Shows
          </p>
          <p className="text-sm text-granby-maroon leading-relaxed">
            {claim.data}
          </p>
          {claim.dataSources && claim.dataSources.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1 items-center">
              <span className="text-xs text-gray-500">Sources:</span>
              {claim.dataSources.map((id, i) => (
                <SourceCitation key={id} id={id} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ArticleSection({ article }) {
  const source = SOURCES[article.source];
  const counts = article.claims.reduce((acc, c) => {
    acc[c.verdict] = (acc[c.verdict] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mb-12">
      {/* Article header */}
      <div className="bg-granby-maroon text-white rounded-t px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-0.5">
          {article.date}
        </p>
        <h3 className="font-heading text-lg font-bold">
          {article.author}
        </h3>
        {source && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-yellow-300 hover:text-yellow-100 underline mt-0.5 inline-block"
          >
            {source.name} ↗
          </a>
        )}
      </div>

      {/* Verdict summary bar */}
      <div className="bg-granby-maroon/80 text-white px-5 py-2 flex flex-wrap gap-4 text-xs font-semibold">
        <span className="text-gray-200">{article.claims.length} claims checked:</span>
        {Object.entries(counts).map(([verdict, n]) => {
          const cfg = VERDICT_CONFIG[verdict];
          return cfg ? (
            <span key={verdict} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              {n} {cfg.shortLabel}
            </span>
          ) : null;
        })}
      </div>

      {/* Claims */}
      <div className="pt-5">
        {article.claims.map((claim, i) => (
          <ClaimCard key={i} claim={claim} index={i + 1} />
        ))}
      </div>
    </div>
  );
}

function FactCheck() {
  const { loganArticle, burkeArticle } = FACT_CHECK_DATA;

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold text-granby-maroon mb-2">
        Drummer Article Fact-Check
      </h2>

      {/* Plain-English intro */}
      <p className="text-granby-maroon leading-relaxed mb-4">
        People say a lot about Granby schools and taxes — some of it accurate, some not. We checked
        the most common claims against actual public records. Below you'll see each claim, what the
        data actually shows, and our verdict.
      </p>

      <p className="text-muted text-sm mb-3">
        Two opinion pieces published in the Granby Drummer on March 28, 2026 — one week before
        the April 6 public hearing and three weeks before the April 20 referendum. Each claim
        is checked against the sourced data on this dashboard.
      </p>

      {/* Methodology note */}
      <div className="bg-warm border-l-4 border-granby-maroon px-5 py-3 rounded-r mb-8 text-sm text-granby-maroon">
        <p className="font-semibold mb-1">How We Rate Claims</p>
        <p className="leading-relaxed text-muted">
          Claims are rated on four levels:{' '}
          <span className="font-bold text-green-700">True</span> — factually correct and in context;{' '}
          <span className="font-bold text-yellow-700">Partly True</span> — technically true but
          omits information that changes the picture;{' '}
          <span className="font-bold text-orange-600">Misleading</span> — framed to create a false
          impression;{' '}
          <span className="font-bold text-alert-red">False</span> — factually incorrect.
          Every data point used in a rebuttal is sourced and clickable.
        </p>
      </div>

      <ArticleSection article={loganArticle} />
      <ArticleSection article={burkeArticle} />

      {/* Editorial note */}
      <div className="mt-4 border-t border-gray-200 pt-6 text-xs text-gray-500 leading-relaxed">
        <p>
          <strong>Editorial note:</strong> This fact-check is based on the text of the published
          articles as fetched on April 3, 2026, and compared against the sourced data in this
          dashboard. If either article has been updated or corrected since publication, this
          analysis may not reflect those changes.{' '}
          <a
            href={SOURCES.DRUMMER_LOGAN.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-granby-maroon"
          >
            Read the Logan article ↗
          </a>{' '}
          ·{' '}
          <a
            href={SOURCES.DRUMMER_BURKE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-granby-maroon"
          >
            Read the Burke article ↗
          </a>
        </p>
      </div>
    </section>
  );
}

export default FactCheck;
