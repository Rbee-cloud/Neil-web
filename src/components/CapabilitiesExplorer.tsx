import React, { useState } from 'react';
import { Compass, Info, RotateCcw, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  description: string;
  baselineName: string;
  contextName: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'admissions',
    name: 'Higher Education Admissions & Standardized Testing',
    description: 'Compare two applicants with identical raw test scores (commodities) under vastly divergent conversion environments.',
    baselineName: 'High-Conversion Candidate',
    contextName: 'Systemically Constrained Candidate',
  },
  {
    id: 'digital',
    name: 'Algorithmic Attention vs Contemplative Synthesis',
    description: 'Examining how digital access (hardware/internet) converts into intellectual capabilities or algorithmic distraction.',
    baselineName: 'Curated Contemplative Nook',
    contextName: 'Algorithmic Feeds & Fragmented Time',
  },
  {
    id: 'urban',
    name: 'Geographic Migration & Cultural Habitus',
    description: 'Moving between São Paulo metropolitan velocity and coastal Portuguese reflection: cultural capital as an heirloom.',
    baselineName: 'Multigenerational Endowment',
    contextName: 'First-Generation Pioneer',
  },
];

export const CapabilitiesExplorer: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState('admissions');
  const [commodityLevel, setCommodityLevel] = useState(70); // raw resources
  const [personalFactor, setPersonalFactor] = useState(65); // individual conversion
  const [socialFactor, setSocialFactor] = useState(40); // social conversion
  const [environmentalFactor, setEnvironmentalFactor] = useState(45); // environmental conversion
  const [applyAffirmativeCorrection, setApplyAffirmativeCorrection] = useState(true);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId)!;

  // Calculation of Raw Commodity Metric vs Sen's Realized Capability Set
  const conversionMultiplier = (personalFactor * 0.3 + socialFactor * 0.4 + environmentalFactor * 0.3) / 100;
  const rawMetricScore = Math.round(commodityLevel * 1.2); // Rawlsian/orthodox test score
  
  // Realized Capability without correction
  const uncorrectedCapability = Math.round(commodityLevel * conversionMultiplier * 1.1);
  
  // Realized Capability with Sen-style institutional conversion correction (Affirmative Action)
  const affirmativeCorrectionBoost = applyAffirmativeCorrection 
    ? Math.round((1 - (socialFactor * 0.5 + environmentalFactor * 0.5) / 100) * 32)
    : 0;

  const realizedCapability = Math.min(100, uncorrectedCapability + affirmativeCorrectionBoost);
  const conversionPenalty = Math.max(0, rawMetricScore - uncorrectedCapability);

  const handleReset = () => {
    setCommodityLevel(70);
    setPersonalFactor(65);
    setSocialFactor(40);
    setEnvironmentalFactor(45);
    setApplyAffirmativeCorrection(true);
  };

  return (
    <section id="capabilities-explorer" className="py-20 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Interactive Inquiry Desk</span>
            <span aria-hidden="true">/</span>
            <span>Sen’s Capability Matrix</span>
          </div>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            The Capabilities &amp; Conversion Simulator
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light">
            Test how identical commodity inputs produce radically different substantive human freedoms 
            when conversion factors diverge. Discover why affirmative action serves as conversion justice.
          </p>
        </div>

        {/* Scenario Selector (Segmented buttons - clean interactive controls) */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/60 dark:bg-stone-900 rounded-lg border border-stone-300/60 dark:border-stone-800 max-w-2xl mb-8">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScenarioId(s.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedScenarioId === s.id
                  ? 'bg-white dark:bg-stone-800 text-stone-950 dark:text-white shadow-2xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                  Parameter Sandbox
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-light">
                  {scenario.description}
                </p>
              </div>
              <button
                onClick={handleReset}
                title="Reset to default values"
                className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Slider 1: Raw Commodity Endowment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  Raw Commodity Input (Rawlsian Goods / Test Prep / Financial Baseline)
                </span>
                <span className="font-mono text-stone-600 dark:text-stone-400">{commodityLevel}/100</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={commodityLevel}
                onChange={(e) => setCommodityLevel(Number(e.target.value))}
                className="w-full accent-stone-900 dark:accent-stone-100 cursor-pointer h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg"
              />
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Orthodox metrics assume this directly reflects potential or desert.
              </p>
            </div>

            {/* The Three Senian Conversion Factors */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Conversion Factors (The Bridge from Means to Freedoms)
              </h4>

              {/* Personal Conversion Factor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-700 dark:text-stone-300">
                    1. Personal Conversion (Cognitive adaptations, physical health, linguistic agility)
                  </span>
                  <span className="font-mono text-stone-600 dark:text-stone-400">{personalFactor}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={personalFactor}
                  onChange={(e) => setPersonalFactor(Number(e.target.value))}
                  className="w-full accent-stone-700 dark:accent-stone-300 cursor-pointer h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg"
                />
              </div>

              {/* Social Conversion Factor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-700 dark:text-stone-300">
                    2. Social Conversion (Class habitus, racial equity, legacy network capital)
                  </span>
                  <span className="font-mono text-stone-600 dark:text-stone-400">{socialFactor}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={socialFactor}
                  onChange={(e) => setSocialFactor(Number(e.target.value))}
                  className="w-full accent-stone-700 dark:accent-stone-300 cursor-pointer h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg"
                />
              </div>

              {/* Environmental Conversion Factor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-700 dark:text-stone-300">
                    3. Environmental Conversion (Regional school funding, geographic isolation, clean public space)
                  </span>
                  <span className="font-mono text-stone-600 dark:text-stone-400">{environmentalFactor}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={environmentalFactor}
                  onChange={(e) => setEnvironmentalFactor(Number(e.target.value))}
                  className="w-full accent-stone-700 dark:accent-stone-300 cursor-pointer h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg"
                />
              </div>
            </div>

            {/* Toggle: Affirmative Action Calibration */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-stone-900 dark:text-stone-100">
                  Apply Capability-Sensitive Corrective (Affirmative Action)
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Calibrates evaluation based on structural conversion handicaps.
                </p>
              </div>
              <button
                onClick={() => setApplyAffirmativeCorrection(!applyAffirmativeCorrection)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  applyAffirmativeCorrection ? 'bg-amber-600' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    applyAffirmativeCorrection ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Results Analytical Display (5 cols) */}
          <div className="lg:col-span-5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg p-6 sm:p-7 space-y-6">
            
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
                Evaluation Verdict
              </span>
              <h3 className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100 mt-1">
                Substantive Freedom Outcome
              </h3>
            </div>

            {/* Metric Comparison */}
            <div className="space-y-4">
              
              {/* Orthodox Rawlsian Metric */}
              <div className="p-3.5 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span>Standard Commodity Metric</span>
                  <span className="font-mono text-stone-900 dark:text-stone-100 font-semibold">{rawMetricScore} pts</span>
                </div>
                <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-stone-400 dark:bg-stone-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, rawMetricScore)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-stone-500">
                  Assumes equal conversion rate across all backgrounds.
                </p>
              </div>

              {/* Sen's Substantive Capability Score */}
              <div className="p-3.5 rounded bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/60">
                <div className="flex items-center justify-between text-xs text-amber-900 dark:text-amber-200 font-medium">
                  <span>Realized Capability Set (Sen)</span>
                  <span className="font-mono text-base font-bold text-amber-800 dark:text-amber-300">
                    {realizedCapability} / 100
                  </span>
                </div>
                <div className="w-full bg-amber-200/50 dark:bg-amber-900/50 h-2.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-amber-600 dark:bg-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${realizedCapability}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-amber-800/80 dark:text-amber-300/80 font-light">
                  {applyAffirmativeCorrection
                    ? `Includes +${affirmativeCorrectionBoost}pt conversion parity adjustment for structural barriers.`
                    : `Unadjusted for conversion handicaps. Realized agency is severely throttled.`}
                </p>
              </div>

            </div>

            {/* Theoretical Insight from Paper */}
            <div className="text-xs text-stone-600 dark:text-stone-400 border-t border-stone-200 dark:border-stone-800 pt-4 space-y-2">
              <p className="font-serif italic text-stone-800 dark:text-stone-200 text-sm">
                "When institutions measure commodity scores rather than capability sets, they mistake inherited ease for superior character."
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Conversion efficiency index: {Math.round(conversionMultiplier * 100)}%</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
