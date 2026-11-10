import React from 'react';
import { Edit3, Check } from 'lucide-react';
import { useContent, EditableText } from '../context/ContentContext';

interface AboutProps {
  accentColor: string;
}

export const About: React.FC<AboutProps> = ({ accentColor }) => {
  const { content, isEditMode, toggleEditMode } = useContent();
  const { about } = content;

  return (
    <section id="about" className="relative">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8 py-20 sm:py-24 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12">
        {/* Sticky Sidebar */}
        <div className="md:sticky md:top-28 self-start space-y-2">
          <h2
            className="text-xs uppercase tracking-[0.14em] font-bold transition-colors"
            style={{ color: accentColor }}
          >
            About
          </h2>
          <div>
            <button
              onClick={toggleEditMode}
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded transition ${
                isEditMode
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Toggle inline text editing for this section"
            >
              {isEditMode ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Done Editing</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3 h-3" />
                  <span>Edit About</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Narrative & Cards */}
        <div className="space-y-6 max-w-[660px]">
          <p className="text-2xl sm:text-[1.65rem] leading-[1.4] font-medium tracking-[-0.015em] text-[#141414]">
            <EditableText path="about.p1" value={about.p1} tag="span" />
          </p>
          <p className="text-lg leading-relaxed text-[#2a2a2a]">
            <EditableText path="about.p2" value={about.p2} tag="span" />
          </p>
          <p className="text-lg leading-relaxed text-[#2a2a2a]">
            <EditableText path="about.p3" value={about.p3} tag="span" />
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
            <div className="p-3 rounded-lg border border-gray-100 bg-gray-50/70">
              <span className="font-semibold text-gray-900 block mb-0.5">{about.originsTitle}</span>
              <EditableText path="about.originsDesc" value={about.originsDesc} tag="span" />
            </div>
            <div className="p-3 rounded-lg border border-gray-100 bg-gray-50/70">
              <span className="font-semibold text-gray-900 block mb-0.5">{about.educationTitle}</span>
              <EditableText path="about.educationDesc" value={about.educationDesc} tag="span" />
            </div>
            <div className="p-3 rounded-lg border border-gray-100 bg-gray-50/70">
              <span className="font-semibold text-gray-900 block mb-0.5">{about.interestsTitle}</span>
              <EditableText path="about.interestsDesc" value={about.interestsDesc} tag="span" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
