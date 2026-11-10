import React from 'react';
import { Printer, X, GraduationCap, FolderKanban, FileText, Award } from 'lucide-react';
import {
  EDUCATION_ITEMS,
  PROJECTS,
  RESEARCH_ITEMS,
  ESSAY_ITEMS,
  RECOGNITION_ITEMS,
  SKILL_CATEGORIES,
} from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, accentColor }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#141414]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/80">
          <div>
            <h3 className="text-lg font-bold">Curriculum Vitae</h3>
            <p className="text-xs text-gray-500">Aditya Neil Banerjee · Caldas da Rainha, Portugal</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
              title="Print CV"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-200 transition"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 cv-document">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6 text-center sm:text-left sm:flex sm:justify-between sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Aditya Neil Banerjee
              </h1>
              <p className="text-sm font-medium text-gray-600 mt-1">
                Student Researcher · Environmental Technologist · Writer
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Caldas da Rainha, Portugal · Stanford Online High School
              </p>
            </div>

            <div className="mt-4 sm:mt-0 text-xs text-gray-600 space-y-1 sm:text-right">
              <div>
                Web:{' '}
                <a
                  href="https://www.deleve.eu"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  deleve.eu
                </a>{' '}
                ·{' '}
                <a
                  href="https://www.rowbots.eu"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  rowbots.eu
                </a>
              </div>
              <div>Portfolio: Caldas da Rainha, Portugal</div>
            </div>
          </div>

          {/* Education */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" style={{ color: accentColor }} />
              <span>Education</span>
            </h2>
            <div className="space-y-3">
              {EDUCATION_ITEMS.map((item) => (
                <div key={item.id} className="text-sm">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>{item.title}</span>
                    <span className="text-xs text-gray-500 font-normal">{item.when}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">{item.where}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Initiatives & Projects */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <FolderKanban className="w-4 h-4" style={{ color: accentColor }} />
              <span>Key Initiatives &amp; Projects</span>
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="text-sm">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>
                      {proj.title}{' '}
                      <span className="font-normal text-xs text-gray-500">— {proj.role}</span>
                    </span>
                    <span className="text-xs text-gray-500 font-normal">
                      {proj.meta.replace('Founder · ', '')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">{proj.desc.join(' ')}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Research & Economics Papers */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: accentColor }} />
              <span>Research &amp; Economics Papers</span>
            </h2>
            <div className="space-y-3">
              {RESEARCH_ITEMS.map((item) => (
                <div key={item.id} className="text-sm">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {item.title} ↗
                        </a>
                      ) : (
                        item.title
                      )}
                    </span>
                    <span className="text-xs text-gray-500 font-normal">{item.when}</span>
                  </div>
                  <div className="text-xs text-gray-600 italic mt-0.5">{item.where}</div>
                  {item.desc && <p className="text-xs text-gray-700 mt-1">{item.desc}</p>}
                </div>
              ))}

              {ESSAY_ITEMS.map((item) => (
                <div key={item.id} className="text-sm">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {item.title} ↗
                        </a>
                      ) : (
                        item.title
                      )}
                    </span>
                    <span className="text-xs text-gray-500 font-normal">{item.when}</span>
                  </div>
                  <div className="text-xs text-gray-600 italic mt-0.5">{item.where}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Honors & Recognition */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: accentColor }} />
              <span>Selected Honors &amp; Recognition</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {RECOGNITION_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="p-2 border border-gray-100 rounded bg-gray-50/50 flex justify-between"
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {item.title} ↗
                    </a>
                  ) : (
                    <span className="font-medium text-gray-900">{item.title}</span>
                  )}
                  <span className="text-gray-500 ml-2 whitespace-nowrap">{item.when}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Skills & Proficiencies */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Skills &amp; Proficiencies
            </h2>
            <div className="space-y-1.5 text-xs text-gray-700">
              {SKILL_CATEGORIES.map((skill, idx) => (
                <div key={idx} className="flex">
                  <span className="w-24 font-semibold text-gray-900">{skill.category}:</span>
                  <span>{skill.items}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
          <span>Aditya Neil Banerjee Curriculum Vitae</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-white rounded font-medium transition"
            style={{ backgroundColor: accentColor }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
