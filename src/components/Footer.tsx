import React from 'react';
import { ExternalLink, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-100 dark:bg-stone-950 text-stone-600 dark:text-stone-400 border-t border-stone-200/80 dark:border-stone-800/80 py-16 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Col 1: Wordmark & Statement */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#"
              className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight"
            >
              Aditya Neil Banerjee
            </a>
            <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-sm">
              Writer, student researcher, and Editor-in-Chief at the OHS Observer. 
              Investigating capabilities theory, distributive justice, and political economy from coastal Portugal.
            </p>
            <p className="font-mono text-[11px] text-stone-400">
              Stanford Online High School · 2026 Archive
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2.5">
            <p className="font-mono uppercase text-[11px] tracking-wider text-stone-900 dark:text-stone-200 font-semibold">
              Sections
            </p>
            <ul className="space-y-1.5 font-light">
              <li>
                <a href="#writings" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Writings &amp; Commentary
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Capabilities Research Paper
                </a>
              </li>
              <li>
                <a href="#capabilities-explorer" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Interactive Simulator
                </a>
              </li>
              <li>
                <a href="#observer" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  OHS Observer Masthead
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Digital Art &amp; Notebook
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  Biography &amp; Record
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: External Publications & Networks */}
          <div className="md:col-span-4 space-y-2.5">
            <p className="font-mono uppercase text-[11px] tracking-wider text-stone-900 dark:text-stone-200 font-semibold">
              Affiliations &amp; Outlets
            </p>
            <ul className="space-y-2 font-light">
              <li>
                <a
                  href="https://ohsobserver.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <span>The OHS Observer (Stanford Online High School)</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholasticahq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <span>Scholastica Academic Publications</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <span>Medium &amp; Personal Notebooks</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Colophon & Bottom Bar */}
        <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-mono">
          <div>
            <span>© {new Date().getFullYear()} Aditya Neil Banerjee. All rights reserved.</span>
            <span className="hidden sm:inline mx-2">·</span>
            <span className="hidden sm:inline">Set in Cormorant Garamond &amp; Plus Jakarta Sans.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
