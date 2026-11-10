import React from 'react';
import { Newspaper, Globe2, ShieldCheck, Feather, ExternalLink } from 'lucide-react';
import { BIO_DATA } from '../data/bio';

export const ObserverLeadership: React.FC = () => {
  const { editorialVision } = BIO_DATA;

  return (
    <section id="observer" className="py-20 md:py-24 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/40 dark:bg-stone-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            <Newspaper className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span>Journalism &amp; Newsroom Leadership</span>
            <span aria-hidden="true">/</span>
            <span>Stanford Online High School</span>
          </div>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
            The OHS Observer Masthead
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
            Leading editorial strategy, investigative standards, and multi-timezone production 
            for Stanford Online High School’s premier student publication.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual Still Life (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xs bg-white dark:bg-stone-900">
              <img
                src="/src/assets/images/observer_editorial_desk_1794328946465.jpg"
                alt="Editor-in-Chief workstation with galley proofs and annotations"
                className="w-full h-auto object-cover aspect-4/3"
              />
              <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
                  <span className="font-serif italic">Galley Proofs &amp; Editing Suite</span>
                  <span className="font-mono text-[11px] text-stone-500">Vol. 2025–2027</span>
                </div>
                <p className="mt-1 text-xs text-stone-500 font-light">
                  Directing section editors across Opinion, Business, Two Cents, and Science &amp; Tech.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Philosophy & Structure (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {editorialVision.roleTitle}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100">
                A Decentralized Newsroom for a Global Campus
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                {editorialVision.mission}
              </p>
            </div>

            {/* The 3 Pillars */}
            <div className="space-y-4 pt-2">
              {editorialVision.pillars.map((pillar, idx) => (
                <div key={pillar.name} className="flex items-start gap-3.5">
                  <span className="font-mono text-xs text-stone-400 dark:text-stone-500 pt-0.5">
                    0{idx + 1}.
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {pillar.name}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed mt-0.5">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Metrics & Links */}
            <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-xs text-stone-500 dark:text-stone-400 font-mono">
                <div>
                  <span className="text-stone-900 dark:text-stone-100 font-bold text-sm">30+</span> Countries Reached
                </div>
                <div>
                  <span className="text-stone-900 dark:text-stone-100 font-bold text-sm">4</span> Key Sections
                </div>
                <div>
                  <span className="text-stone-900 dark:text-stone-100 font-bold text-sm">Weekly</span> Editorial Cycles
                </div>
              </div>

              <a
                href="https://ohsobserver.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
              >
                <span>Visit The OHS Observer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
