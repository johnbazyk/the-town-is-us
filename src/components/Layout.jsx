import React from 'react';

function Layout({ tabs, activeTab, onTabChange, children }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip navigation for keyboard and screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-granby-maroon focus:text-white focus:px-4 focus:py-2 focus:rounded focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="bg-granby-maroon text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-2xl md:text-3xl font-bold">
            Granby Accountability Dashboard
          </h1>
          <p className="text-gray-200 mt-1 text-sm md:text-base">
            Sourced, fact-checked data on Granby CT's schools, budget, and taxes
          </p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-granby-maroon border-b border-granby-maroon/40 sticky top-0 z-10" aria-label="Dashboard sections">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                className={`px-4 py-3 min-h-[44px] text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-granby-maroon border-b-2 border-granby-gold'
                    : 'text-gray-200 hover:text-white hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-granby-maroon text-gray-300 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-sm space-y-2">
          <p>Built by a Granby taxpayer using public data and AI-assisted analysis.</p>
          <p>All data sourced from official government records and public databases.</p>
          <p>
            Found an error? Submit a correction via the{' '}
            <button
              onClick={() => onTabChange('submit')}
              className="text-white underline hover:text-gray-200"
            >
              submission form
            </button>{' '}
            above.
          </p>
          <p className="font-semibold text-gray-200 mt-4">
            This is a First Amendment-protected civic publication.
          </p>
          <p className="text-gray-400 mt-2">
            Last updated: April 3, 2026 |{' '}
            <a
              href="https://granbyschools.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              Download source documents
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
