import React, { useState, useRef } from 'react';
import { SOURCES } from '../data/sources';

/**
 * SourceCitation — clickable [·] citation badge with interactive tooltip
 *
 * Usage:
 *   <SourceCitation id="CT_EDSIGHT" />
 *   <SourceCitation id="SCHOOLDIGGER" index={2} />
 *
 * Renders a small superscript badge. Hovering shows an interactive tooltip with:
 *   - Source name and description
 *   - "View source" link → external government/reference URL
 *   - "Local copy" link → /sources/filename.pdf (only shown if source.localPdf is set)
 *
 * Add localPdf to a source entry in sources.js to enable the local copy link:
 *   localPdf: "/sources/FY24-BOE-Budget-Book-Rev.pdf"
 */
function SourceCitation({ id, index }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const hideTimer = useRef(null);
  const source = SOURCES[id];

  if (!source) {
    return <span className="source-cite text-alert-red" title={`Unknown source: ${id}`}>[?]</span>;
  }

  const handleMouseEnter = () => {
    clearTimeout(hideTimer.current);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    // Small delay so the user can move the mouse into the tooltip
    hideTimer.current = setTimeout(() => setShowTooltip(false), 150);
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={source.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="source-cite"
        aria-label={`Source: ${source.name}`}
        onClick={(e) => {
          if (!source.url) e.preventDefault();
        }}
      >
        [{typeof index === 'number' ? index : '·'}]
      </a>

      {showTooltip && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-granby-maroon text-white text-xs rounded shadow-lg p-3 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="font-bold mb-1 leading-snug">{source.name}</p>
          <p className="text-gray-200 leading-snug mb-2">{source.description}</p>
          <div className="flex flex-wrap gap-3 border-t border-white/20 pt-2">
            {source.url && (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:text-yellow-100 underline"
              >
                ↗ View source
              </a>
            )}
            {source.localPdf && (
              <a
                href={source.localPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-300 hover:text-green-100 underline"
              >
                ⬇ Local copy
              </a>
            )}
          </div>
        </div>
      )}
    </span>
  );
}

export default SourceCitation;
