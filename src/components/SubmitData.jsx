import React, { useState } from 'react';

/**
 * Tab 8: Submit Your Data
 *
 * Netlify Form with honeypot spam prevention.
 * Fields: Name (optional), Email (optional), Category dropdown,
 *         Data/Question textarea, Source URL (optional)
 *
 * Uses Netlify Forms — the form must have:
 *   - name="citizen-data"
 *   - data-netlify="true"
 *   - data-netlify-honeypot="bot-field"
 *   - hidden input: name="form-name" value="citizen-data"
 */
function SubmitData() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((err) => {
        console.error('Form submission error:', err);
        alert('Submission failed. Please try again.');
      });
  };

  if (submitted) {
    return (
      <section className="max-w-2xl mx-auto text-center py-12">
        <h2 className="font-heading text-2xl font-bold text-granby-maroon mb-4">
          Thank You
        </h2>
        <p className="text-muted text-lg">
          Submissions are reviewed and added to the dashboard when verified.
        </p>
        <p className="text-muted text-sm mt-2">We read every submission. Your information is never shared or published.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 px-6 py-3 min-h-[44px] bg-granby-maroon text-white rounded hover:bg-granby-maroon/80 transition-colors font-semibold"
        >
          Submit Another
        </button>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="font-heading text-2xl font-bold text-granby-maroon mb-2">
        Submit Your Data
      </h2>
      <p className="text-muted mb-6">
        Help us get it right. If you spot an error, have a source we missed, or think something
        is unclear, we want to hear from you. This dashboard is a community resource — your input
        makes it better.
      </p>

      <form
        name="citizen-data"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input type="hidden" name="form-name" value="citizen-data" />
        <p className="hidden">
          <label>Don't fill this out: <input name="bot-field" /></label>
        </p>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-granby-maroon mb-1">
            Name <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-granby-maroon"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-granby-maroon mb-1">
            Email <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-granby-maroon"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-granby-maroon mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-granby-maroon"
          >
            <option value="">Select a category...</option>
            <option value="Budget">Budget</option>
            <option value="Academic Performance">Academic Performance</option>
            <option value="Property Tax">Property Tax</option>
            <option value="School Climate">School Climate</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="data" className="block text-sm font-semibold text-granby-maroon mb-1">
            Data or Question
          </label>
          <textarea
            id="data"
            name="data"
            rows="5"
            required
            placeholder="Share data, a correction, or a question..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-granby-maroon"
          />
        </div>

        <div>
          <label htmlFor="source-url" className="block text-sm font-semibold text-granby-maroon mb-1">
            Source URL <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="url"
            id="source-url"
            name="source-url"
            placeholder="https://..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-granby-maroon"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-granby-maroon text-white font-semibold py-3 min-h-[44px] rounded hover:bg-granby-maroon/80 transition-colors"
        >
          Send Feedback
        </button>

        <p className="text-xs text-muted text-center">
          We read every submission. Your information is never shared or published.
        </p>
      </form>
    </section>
  );
}

export default SubmitData;
