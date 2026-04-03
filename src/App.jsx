import React, { useState, lazy, Suspense } from 'react';
import Layout from './components/Layout';

// Lazy-load tab content for performance
const ExecutiveSummary = lazy(() => import('./components/ExecutiveSummary'));
const BudgetAnalysis = lazy(() => import('./components/BudgetAnalysis'));
const AcademicPerformance = lazy(() => import('./components/AcademicPerformance'));
const PropertyTaxRatchet = lazy(() => import('./components/PropertyTaxRatchet'));
const DemographicsHousing = lazy(() => import('./components/DemographicsHousing'));
const SchoolClimate = lazy(() => import('./components/SchoolClimate'));
const FactCheck = lazy(() => import('./components/FactCheck'));
const SubmitData = lazy(() => import('./components/SubmitData'));

const TABS = [
  { id: 'summary', label: 'Executive Summary', component: ExecutiveSummary },
  { id: 'budget', label: 'Budget Analysis', component: BudgetAnalysis },
  { id: 'academic', label: 'Academic Performance', component: AcademicPerformance },
  { id: 'tax', label: 'Property Taxes', component: PropertyTaxRatchet },
  { id: 'demographics', label: 'Town & Housing Data', component: DemographicsHousing },
  { id: 'climate', label: 'School Climate & Safety', component: SchoolClimate },
  { id: 'factcheck', label: 'Fact-Check', component: FactCheck },
  { id: 'submit', label: 'Submit Your Data', component: SubmitData },
];

function App() {
  const [activeTab, setActiveTab] = useState('summary');

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component;

  return (
    <Layout tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab}>
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <p className="text-muted text-lg">Loading...</p>
        </div>
      }>
        {ActiveComponent && <ActiveComponent />}
      </Suspense>
    </Layout>
  );
}

export default App;
