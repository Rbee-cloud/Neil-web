import React, { useState } from 'react';
import { BookOpen, Copy, Check, FileText, Share2, Compass, Layers, ExternalLink } from 'lucide-react';
import { ARTICLES } from '../data/articles';

interface ResearchPaperSectionProps {
  onOpenPaperModal: () => void;
  onExploreCapabilities: () => void;
}

export const ResearchPaperSection: React.FC<ResearchPaperSectionProps> = ({
  onOpenPaperModal,
  onExploreCapabilities,
}) => {
  const paper = ARTICLES.find((a) => a.id === 'evaluating-affirmative-action-sen-capabilities')!;
  const [citationFormat, setCitationFormat] = useState<'bibtex' | 'apa' | 'mla' | 'chicago'>('apa');
  const [copied, setCopied] = useState(false);

  const handleCopyCitation = () => {
    if (!paper.citation) return;
    const text = paper.citation[citationFormat];
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="research" className="py-20 md:py-24 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/40 dark:bg-stone-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            <span>Academic Inquiry</span>
            <span aria-hidden="true">/</span>
            <span>Distributive Justice &amp; Public Policy</span>
          </div>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            Featured Research Paper
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-light">
            Applying Nobel laureate Amartya Sen’s capabilities matrix to deconstruct traditional affirmative action metrics 
            and reconceptualize meritocracy through conversion capacity.
          </p>
        </div>

        {/* Paper Feature Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-lg overflow-hidden shadow-xs">
          
          {/* Top Hero Media Banner */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b border-stone-200 dark:border-stone-800">
            <img
              src="/src/assets/images/capabilities_philosophy_hero_1794328944655.jpg"
              alt="Conceptual architectural study of capabilities and human freedom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-medium">
                Scholastica Policy Review · 2026 Paper
              </span>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl lg:text-3xl font-medium leading-tight">
                Evaluating Affirmative Action Through Amartya Sen’s Capabilities Approach
              </h3>
            </div>
          </div>

          {/* Paper Content Body */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Abstract */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                Executive Abstract
              </h4>
              <p className="font-serif italic text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-relaxed bg-stone-50 dark:bg-stone-950/50 p-5 rounded-md border border-stone-200/60 dark:border-stone-800/60">
                "{paper.abstract}"
              </p>
            </div>

            {/* Core Theoretic Pillars (3 columns) */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4">
                Core Theoretical Inventions of the Paper
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-4 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30 space-y-2">
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-400">01 / The Raw Goods Blindspot</div>
                  <h5 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-base">
                    Commodities vs. Substantive Freedoms
                  </h5>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                    John Rawls’s focus on primary goods assumes identical conversion capacity. Sen demonstrates that 
                    identical goods do not yield equal substantive freedom when human circumstances diverge.
                  </p>
                </div>

                <div className="p-4 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30 space-y-2">
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-400">02 / Conversion Factors</div>
                  <h5 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-base">
                    Social, Personal &amp; Environmental
                  </h5>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                    Standardized test scores are not pure innate merit; they are commodities deeply filtered through 
                    unequal school funding, community literacy, and institutional barriers.
                  </p>
                </div>

                <div className="p-4 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30 space-y-2">
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-400">03 / Beyond Admissions</div>
                  <h5 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-base">
                    Institutional Flourishing Duty
                  </h5>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                    Justice requires that universities not merely open doors, but actively build conversion scaffolds 
                    (belonging, research access, mentorship) to turn enrollment into flourishing.
                  </p>
                </div>

              </div>
            </div>

            {/* Interactive Citations & Actions Strip */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              {/* Citation Formats */}
              <div className="space-y-2 w-full lg:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400">Cite this paper:</span>
                  <div className="inline-flex rounded-md border border-stone-200 dark:border-stone-800 p-0.5 bg-stone-100 dark:bg-stone-950">
                    {(['apa', 'bibtex', 'mla', 'chicago'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setCitationFormat(fmt)}
                        className={`px-2.5 py-1 text-[11px] font-mono uppercase rounded transition-colors ${
                          citationFormat === fmt
                            ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-2xs font-semibold'
                            : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleCopyCitation}
                    className="inline-flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white px-2 py-1 rounded border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="text-xs font-mono text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-950 p-2.5 rounded border border-stone-200/80 dark:border-stone-800/80 overflow-x-auto max-w-xl">
                  {paper.citation?.[citationFormat]}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onExploreCapabilities}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-md transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Launch Interactive Simulator</span>
                </button>

                <button
                  onClick={onOpenPaperModal}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Complete Paper (18 min)</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
