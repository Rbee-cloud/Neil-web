import React from 'react';
import { EDUCATION_ITEMS, SKILL_CATEGORIES } from '../data/portfolioData';

interface EducationProps {
  accentColor: string;
}

export const Education: React.FC<EducationProps> = ({ accentColor }) => {
  return (
    <section id="education" className="border-t border-[#e8e8e8]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8 py-20 sm:py-24 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12">
        {/* Sticky Sidebar */}
        <div className="md:sticky md:top-28 self-start space-y-3">
          <h2
            className="text-xs uppercase tracking-[0.14em] font-bold transition-colors"
            style={{ color: accentColor }}
          >
            Education
          </h2>
        </div>

        {/* Content Column */}
        <div>
          <div className="divide-y divide-[#e8e8e8]">
            {EDUCATION_ITEMS.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-2 sm:gap-6 py-5 group"
              >
                <span className="text-[#6b6b6b] text-[0.9rem] pt-0.5 font-normal">
                  {item.when}
                </span>

                <div>
                  <h5 className="text-[1.08rem] font-semibold leading-[1.4] text-[#141414]">
                    {item.title}
                  </h5>

                  {item.where && (
                    <div className="text-[#6b6b6b] text-[0.92rem] mt-0.5 max-w-[640px] leading-relaxed">
                      {item.where}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Skills & Interests Subsection */}
          <div className="max-w-[640px] mt-10 pt-6 border-t border-[#e8e8e8] space-y-2 text-[0.98rem] text-[#2a2a2a]">
            <h4 className="text-xs uppercase tracking-[0.14em] text-[#6b6b6b] font-semibold mb-3">
              Skills &amp; Interests
            </h4>

            {SKILL_CATEGORIES.map((skill, idx) => (
              <p key={idx} className="leading-relaxed">
                <b className="font-semibold text-[#141414]">{skill.category}:</b> {skill.items}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
